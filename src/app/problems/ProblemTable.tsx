"use client";
import { Chip, Link, Stack } from "@mui/material";
import { ProblemEntry, useProblemListStore } from "./stores/problemListStore";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_PaginationState,
} from "material-react-table";
import { useEffect, useState } from "react";

const columns: MRT_ColumnDef<ProblemEntry>[] = [
  {
    accessorKey: "name",
    header: "Problem Name",
    size: 300,
    Cell: ({ row }) => (
      <Link href={`/problems/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    accessorKey: "containingContests",
    header: "Containing Contests",
    Cell: ({ row }) => (
      <Stack direction={"row"} spacing={1}>
        {row.original.containingContests.map((contest) => (
          <Link href={`/contests/${contest.id}`} key={contest.id}>
            <Chip label={contest.name} size="small" />
          </Link>
        ))}
      </Stack>
    ),
  },
  // TODO: Add problem type
  // TODO: Add count of registered solution
];

export default function ProblemTable() {
  const { totalCount, problemList, setPagination, filter } =
    useProblemListStore();
  const [paginationState, setPaginationState] = useState<MRT_PaginationState>({
    pageIndex: filter.page - 1,
    pageSize: filter.pageSize,
  });

  useEffect(() => {
    setPagination({
      page: paginationState.pageIndex + 1,
      pageSize: paginationState.pageSize,
    });
  }, [paginationState, setPagination]);

  useEffect(() => {
    setPaginationState({
      pageIndex: filter.page - 1,
      pageSize: filter.pageSize,
    });
  }, [filter.page, filter.pageSize]);

  const table = useMaterialReactTable<ProblemEntry>({
    columns,
    data: problemList,
    rowCount: totalCount,
    manualPagination: true,
    onPaginationChange: setPaginationState,
    state: {
      pagination: paginationState,
    },
    enableSorting: false,
    enableTopToolbar: false,
    enableColumnActions: false,
  });
  return <MaterialReactTable table={table} />;
}
