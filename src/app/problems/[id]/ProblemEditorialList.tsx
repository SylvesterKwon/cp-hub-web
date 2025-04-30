"use client";
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";
import { useProblemEditorialStore } from "./stores/problemEditorialStore";
import { useEffect } from "react";
import ProblemEditorial from "./ProblemEditorial";
import { FormContainer, SelectElement, useForm } from "react-hook-form-mui";
import { EditorialListSortBy } from "@/clients/cpHub/type";

type ProblemEditorialListFilterForm = {
  sortBy: EditorialListSortBy;
};

export default function ProblemEditorialList() {
  const formContext = useForm<ProblemEditorialListFilterForm>({
    defaultValues: { sortBy: "recommended" },
  });
  const editorialList = useProblemEditorialStore(
    (state) => state.editorialList
  );
  const setFilter = useProblemEditorialStore((state) => state.setFilter);
  const filter = useProblemEditorialStore((state) => state.filter);
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
              <FormContainer<ProblemEditorialListFilterForm>
                formContext={formContext}
              >
                <SelectElement
                  name="sortBy"
                  size="small"
                  // variant="standard"
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
        {/* TODO: Add case for no editorial */}
        {/* TODO: Add comment */}
        <Stack spacing={2}>
          {editorialList.map((editorial) => (
            <ProblemEditorial key={editorial.id} editorial={editorial} />
          ))}
        </Stack>
        {/* TODO: Add pagination (or inifnite scroll) */}
      </CardContent>
    </Card>
  );
}
