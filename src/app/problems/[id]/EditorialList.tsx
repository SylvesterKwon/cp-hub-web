"use client";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { useEditorialStore } from "./stores/editorialStore";
import { useEffect } from "react";
import Editorial from "./Editorial";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { CommentContextType, EditorialListSortBy } from "@/clients/cpHub/type";
import CommentStoreProvider from "@/app/components/providers/CommentStoreProvider";
import { useSearchParams } from "next/navigation";

type EditorialListFilterForm = {
  sortBy: EditorialListSortBy;
};

export default function EditorialList() {
  const editorialList = useEditorialStore((state) => state.editorialList);
  const editorialLoading = useEditorialStore((state) => state.isLoading);
  const setFilter = useEditorialStore((state) => state.setFilter);
  const filter = useEditorialStore((state) => state.filter);
  const totalCount = useEditorialStore((state) => state.totalCount);

  const searchParams = useSearchParams();
  const searchParamEditorialSortBy = searchParams.get("editorialSortBy");
  const defaultEditorialSortBy =
    searchParamEditorialSortBy === "recommended" ||
    searchParamEditorialSortBy === "trending" ||
    searchParamEditorialSortBy === "createdAtAsc" ||
    searchParamEditorialSortBy === "updatedAtDesc"
      ? searchParamEditorialSortBy
      : "recommended";

  const formContext = useForm<EditorialListFilterForm>({
    defaultValues: { sortBy: defaultEditorialSortBy },
  });

  // set initial filter by query string
  useEffect(() => {
    setFilter({
      page:
        Number.isInteger(Number(searchParams.get("editorialPage"))) &&
        Number(searchParams.get("editorialPage"))
          ? Number(searchParams.get("editorialPage"))
          : 1,
      pageSize:
        Number.isInteger(Number(searchParams.get("editorialPageSize"))) &&
        Number(searchParams.get("editorialPageSize"))
          ? Number(searchParams.get("editorialPageSize"))
          : 10,
      sortBy: defaultEditorialSortBy,
    });
  }, [defaultEditorialSortBy, searchParams, setFilter]);

  // TODO: add querystring to get define default filter

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
          >
            <Stack>
              <Typography variant="h5">User editorials</Typography>
              <Typography variant="body2" color="text.secondary">
                {totalCount} editorials found
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                Sort by:
              </Typography>
              <FormContainer<EditorialListFilterForm> formContext={formContext}>
                <SelectElement
                  name="sortBy"
                  size="small"
                  options={[
                    {
                      id: "recommended",
                      label: "Recommended",
                    },
                    {
                      id: "trending",
                      label: "Trending",
                    },
                    {
                      id: "updatedAtDesc",
                      label: "Newest first",
                    },
                    {
                      id: "createdAtAsc",
                      label: "Oldest first",
                    },
                  ]}
                  onChange={(value) => {
                    setFilter({
                      ...filter,
                      sortBy: value,
                    });
                  }}
                  sx={{
                    minWidth: 150,
                  }}
                />
              </FormContainer>
            </Stack>
          </Stack>
        }
      />
      <CardContent>
        {/* TODO: Add pagination (or inifnite scroll) */}
        {editorialLoading === false ? (
          editorialList.length ? (
            <Stack spacing={2}>
              {editorialList.map((editorial) => (
                <CommentStoreProvider
                  key={editorial.id}
                  context={{
                    type: CommentContextType.EDITORIAL,
                    id: editorial.id,
                  }}
                >
                  <Editorial editorial={editorial} />
                </CommentStoreProvider>
              ))}
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <TablePagination
                  component="div"
                  count={totalCount}
                  rowsPerPage={filter.pageSize}
                  page={filter.page - 1}
                  onPageChange={(e, value) =>
                    setFilter({ ...filter, page: value + 1 })
                  }
                  onRowsPerPageChange={(e) => {
                    setFilter({
                      ...filter,
                      pageSize: Number(e.target.value),
                      page: 1,
                    });
                  }}
                  rowsPerPageOptions={[1, 5, 10, 25]}
                />
              </Stack>
            </Stack>
          ) : (
            <Alert severity="info">
              No editorial found for this problem. Be the first to write one!
            </Alert>
          )
        ) : (
          <>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
