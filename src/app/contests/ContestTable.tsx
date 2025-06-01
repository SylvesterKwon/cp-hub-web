"use client";
import { Chip, Link, Stack } from "@mui/material";
import { useContestListStore } from "./stores/contestListStore";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
  MRT_PaginationState,
} from "material-react-table";
import { useEffect, useState } from "react";
import { ContestEntry } from "@/clients/cpHub/type";
import { durationSecondsToString } from "./contestUtils";
import dayjs from "dayjs";

const columns: MRT_ColumnDef<ContestEntry>[] = [
  {
    accessorKey: "name",
    header: "Name",
    size: 400,
    Cell: ({ row }) => (
      <Link href={`/contests/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 50,
    Cell: ({ row }) => <Chip label={row.original.type} size="small" />,
    muiTableHeadCellProps: {
      align: "center",
    },
    muiTableBodyCellProps: {
      align: "center",
    },
    muiTableFooterCellProps: {
      align: "center",
    },
  },
  {
    accessorKey: "startedAt",
    header: "Started At",
    Cell: ({ row }) =>
      row.original.startedAt
        ? dayjs(row.original.startedAt).format("YYYY-MM-DD HH:mm")
        : "N/A",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    size: 100,
    Cell: ({ row }) => {
      return row.original.durationSeconds
        ? durationSecondsToString(row.original.durationSeconds)
        : "N/A";
    },
  },
];

export default function ContestTable() {
  const { totalCount, contestList, setPagination, filter } =
    useContestListStore();
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

  const table = useMaterialReactTable<ContestEntry>({
    columns,
    data: contestList,
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
