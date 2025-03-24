"use client";

import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
} from "@mui/material";

export default function ProblemSolution() {
  return (
    <Card variant="outlined">
      <CardHeader title="Soutions" />
      <CardContent>
        <Stack spacing={2}>
          <Alert severity="warning">WIP</Alert>
          <Card color="secondary">
            <CardHeader title="Naive approach #1" />
            <CardContent>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </CardContent>
            <CardActions>
              <Button variant="outlined">Action 1</Button>
              <Button variant="outlined">Action 2</Button>
            </CardActions>
          </Card>
        </Stack>
      </CardContent>
    </Card>
  );
}
