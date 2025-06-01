"use client";

import { Search } from "@mui/icons-material";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import {
  CheckboxButtonGroup,
  FormContainer,
  TextFieldElement,
} from "react-hook-form-mui";
import { useContestListStore } from "./stores/contestListStore";
import { ContestType } from "@/clients/cpHub/type";

export type ContestFilterForm = {
  types: string[];
  keyword: string;
};

export default function ContestFilter() {
  const { filter, setSearchOption } = useContestListStore();
  const formContext = useForm<ContestFilterForm>();

  async function handleSubmit(data: ContestFilterForm) {
    setSearchOption({
      keyword: data.keyword?.length ? data.keyword : undefined,
      types: data.types.length ? data.types : undefined,
    });
  }

  return (
    <Paper variant="outlined">
      <Stack spacing={2} padding={2}>
        <Typography variant="h6">Filter</Typography>
        <FormContainer<ContestFilterForm>
          formContext={formContext}
          onSuccess={handleSubmit}
        >
          <Stack direction="column" spacing={2} sx={{ marginBottom: 2 }}>
            {/* 공백되면 undefined 로 변경되도록 수정 */}
            <TextFieldElement
              name="keyword"
              label="Contest title"
              placeholder="Search contest title"
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
              name="types"
              label="Contest Types"
            />
            {/* TODO: Add filters: Contest types, OJ */}
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
