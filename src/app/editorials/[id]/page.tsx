"use client";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { EditorialDetail } from "@/clients/cpHub/type";
import { Alert, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditorialPage() {
  const params = useParams<{ id: string }>();
  const editorialId = params.id;

  const [editorial, setEditorial] = useState<EditorialDetail | null>(null);
  // const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true);
    cpHubClient.getEditorial(editorialId).then((res) => {
      setEditorial(res);
      // setIsLoading(false);
    });
  }, [editorialId]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            {editorial
              ? `${editorial.author.username}'s Editorial`
              : "Loading..."}
          </Typography>
        </Grid>
        <Grid size={12}></Grid>
        <Alert severity="warning">
          Woring in progress - Full-screen editorial view
        </Alert>
      </Grid>
    </Container>
  );
}
