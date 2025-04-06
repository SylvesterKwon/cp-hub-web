"use client";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { useProblemEditorialStore } from "./stores/problemEditorialStore";
import { useEffect } from "react";
import ProblemEditorial from "./ProblemEditorial";

export default function ProblemEditorialList() {
  const editorialList = useProblemEditorialStore(
    (state) => state.editorialList
  );
  // const filter = useProblemEditorialStore((state) => state.filter);
  const setFilter = useProblemEditorialStore((state) => state.setFilter);
  useEffect(() => {
    setFilter({
      page: 1,
      pageSize: 10,
    });
  }, []); // just for test
  console.log("editorialList", editorialList);
  return (
    <Card variant="outlined">
      <CardHeader title="Soutions">asdf</CardHeader>
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
