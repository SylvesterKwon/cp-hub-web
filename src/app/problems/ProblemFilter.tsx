"use client";

import { Search } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  CheckboxButtonGroup,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { useProblemListStore } from "./stores/problemListStore";
import { ContestType } from "@/clients/cpHub/type";

export type ProblemFilterForm = {
  search: string;
  contestTypes: string[];
  keyword: string;
};

export default function ProblemFilter() {
  // WIP
  const { filter, setFilter } = useProblemListStore();
  const formContext = useForm<ProblemFilterForm>();

  async function handleSubmit(data: ProblemFilterForm) {
    console.log(data);
    setFilter({
      ...filter,
      keyword: data.keyword?.length ? data.keyword : undefined,
      contestTypes: data.contestTypes.length ? data.contestTypes : undefined,
    });
  }

  return (
    <Paper>
      <Stack spacing={2} padding={2}>
        <Typography variant="h6">Filter</Typography>
        <FormContainer<ProblemFilterForm>
          formContext={formContext}
          onSuccess={handleSubmit}
        >
          <Stack direction="column" spacing={2} sx={{ marginBottom: 2 }}>
            {/* 공백되면 undefined 로 변경되도록 수정 */}
            <TextFieldElement
              name="keyword"
              label="Problem title"
              placeholder="Search problem title"
              variant="standard"
              type="search"
              size="small"
              fullWidth
            />
            <CheckboxButtonGroup
              options={[
                { label: "Codeforces", id: ContestType.CF },
                { label: "AtCoder", id: ContestType.ATCODER },
                { label: "ICPC", id: ContestType.ICPC },
                { label: "IOI", id: ContestType.IOI },
              ]}
              name="contestTypes"
              label="Contest Types"
            />
            {/* TODO: Add filters: Problem types, OJ */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="small"
              endIcon={<Search />}
            >
              Search
            </Button>
          </Stack>
        </FormContainer>
      </Stack>
    </Paper>
  );
}
