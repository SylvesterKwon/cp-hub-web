import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ProblemFilter from "./ProblemFilter";
import ProblemTable from "./ProblemTable";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Problems - CP hub",
  description: "Problems - CP hub",
};

export default function ProblemsPage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            Problems
          </Typography>
        </Grid>
        <Grid size={3}>
          <ProblemFilter />
        </Grid>
        <Grid size={9}>
          <ProblemTable />
        </Grid>
      </Grid>
    </Container>
  );
}
