import cpHubClient from "@/clients/cpHub/cpHubClient";
import { detailedContestTypeToString } from "@/utils/detailedContestTypeToSring";
import {
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link as MUILink,
  Card,
  CardHeader,
  CardContent,
  Chip,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { ReactNode } from "react";

function durationSecondsToString(durationSeconds: number) {
  const hours = Math.floor(durationSeconds / 3600);
  const minutes = String(Math.floor((durationSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  return `${hours}:${minutes}`;
}

export default async function ContestsDetailPage(props: {
  params: { id: string };
}) {
  const { params } = props;
  const contestId = params.id;
  const contest = await cpHubClient.getContestDetail(contestId); // TODO: contest 없을때 처리 추가
  const contestInfo: { label: string; value: ReactNode }[] = [
    {
      label: "Name",
      value: contest.url ? (
        <MUILink href={contest.url} target="_blank" rel="noreferrer">
          {contest.name}
        </MUILink>
      ) : (
        contest.name
      ),
    },
    {
      label: "Contest type",
      value: contest.detailedType ? (
        <Chip
          size="small"
          label={detailedContestTypeToString(contest.detailedType)}
          // TODO: Add URL to contest list page with filter
        />
      ) : (
        <Chip size="small" label={contest.type} />
      ),
    },
    {
      label: "Start time",
      value: contest.startedAt
        ? new Date(contest.startedAt).toLocaleString()
        : "N/A",
    },
    {
      label: "Duration",
      value: contest.durationSeconds
        ? durationSecondsToString(contest.durationSeconds)
        : "N/A",
    },
  ];
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            {`${contest.name}`}
          </Typography>
        </Grid>
        <Grid size={7}>
          <Card variant="outlined">
            <CardHeader title="Problems" />
            <CardContent>
              <Stack spacing={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contest.problems.map((problem) => (
                      <TableRow key={problem.id}>
                        <TableCell>{problem.index}</TableCell>
                        <TableCell>
                          <MUILink
                            href={`/problems/${problem.id}`}
                            component={Link}
                            // color="primary"
                          >
                            {problem.name}
                          </MUILink>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={5}>
          <Card variant="outlined">
            <CardHeader title="Contest information" />
            <CardContent>
              <Typography variant="body1" component="p">
                {/* WIP - 임시로 넣어둔 정보, 스타일링 다시하기 */}
                <Table size="small">
                  <TableBody>
                    {contestInfo.map((contestInfoRow) => (
                      <TableRow key={contestInfoRow.label}>
                        <TableCell>{contestInfoRow.label}</TableCell>
                        <TableCell>{contestInfoRow.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
