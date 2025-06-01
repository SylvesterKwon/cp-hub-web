import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Metadata } from "next";
import ContestFilter from "./ContestFilter";
import ContestTable from "./ContestTable";

export const metadata: Metadata = {
  title: "Contests - CP hub",
  description: "Contests - CP hub",
};

export default function ContestsPage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            Contests
          </Typography>
        </Grid>
        <Grid size={3}>
          <ContestFilter />
        </Grid>
        <Grid size={9}>
          <ContestTable />
        </Grid>
      </Grid>
    </Container>
  );
}
