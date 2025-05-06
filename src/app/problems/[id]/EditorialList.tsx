"use client";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEditorialStore } from "./stores/editorialStore";
import { useEffect } from "react";
import Editorial from "./Editorial";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { CommentContextType, EditorialListSortBy } from "@/clients/cpHub/type";
import CommentStoreProvider from "@/app/components/providers/CommentStoreProvider";

type EditorialListFilterForm = {
  sortBy: EditorialListSortBy;
};

export default function EditorialList() {
  const formContext = useForm<EditorialListFilterForm>({
    defaultValues: { sortBy: "recommended" },
  });
  const editorialList = useEditorialStore((state) => state.editorialList);
  const editorialLoading = useEditorialStore((state) => state.isLoading);
  const setFilter = useEditorialStore((state) => state.setFilter);
  const filter = useEditorialStore((state) => state.filter);
  useEffect(() => {
    setFilter({
      page: 1,
      pageSize: 10,
      sortBy: "recommended",
    });
  }, []); // TODO: just for test, Add inifinite scroll later

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
            <Typography variant="h5">User editorials</Typography>
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
        {/* TODO: Add my editorial */}
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
