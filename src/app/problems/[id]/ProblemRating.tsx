"use client";

import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import Grid from "@mui/material/Grid2";
import { HelpOutline } from "@mui/icons-material";

export default function ProblemRating() {
  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h5">Rating</Typography>
            <Tooltip title="WIP - Rating system is not implemented yet">
              <HelpOutline fontSize="small" />
            </Tooltip>
          </Stack>
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <Alert severity="warning">WIP</Alert>
          {/* TODO: if annonymous, show login button */}
          <Stack direction="column" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center"></Stack>
            <Rating size="large" value={2.4} precision={0.1} readOnly />
          </Stack>
          <Grid container>
            <Grid size={8}>
              <BarChart
                title="Rating distribution"
                xAxis={[
                  {
                    id: "barCategories",
                    data: [
                      "0.5",
                      "1.0",
                      "1.5",
                      "2.0",
                      "2.5",
                      "3.0",
                      "3.5",
                      "4.0",
                      "4.5",
                      "5.0",
                    ],
                    scaleType: "band",
                    tickPlacement: "middle",
                  },
                ]}
                series={[
                  {
                    data: [2, 5, 3, 2, 5, 3, 2, 5, 3, 10],
                  },
                ]}
                height={100}
                margin={{
                  left: 20,
                  right: 10,
                  top: 10,
                  bottom: 20,
                }}
              />
            </Grid>
            <Grid size={4}>
              <Stack
                direction="column"
                height="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="body1">2.4 / 5.0</Typography>
                <Typography variant="caption">1,234 voted</Typography>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
