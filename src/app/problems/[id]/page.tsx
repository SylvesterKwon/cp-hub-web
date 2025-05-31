import cpHubClient from "@/clients/cpHub/cpHubClient";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Table,
  TableBody,
  TableCell,
  Link as MUILink,
  TableRow,
  Typography,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Link from "next/link";
import { ReactNode } from "react";
import ProblemRating from "./ProblemRating";
import EditorialList from "./EditorialList";
import EditorialListStoreProvider from "./EditorialListStoreProvider";
import MyEditorial from "./MyEditorial";
import { PageProps } from "../../../../.next/types/app/page";

export default async function ProblemDetailPage(props: PageProps) {
  const params = await props.params;
  const problemId = params.id;
  const problem = await cpHubClient.getProblemDetail(problemId); // TODO: contest 없을때 처리 추가
  const problemInfo: { label: string; value: ReactNode }[] = [
    {
      label: "Online judges",
      value: (
        <div>
          {problem.availableOnlineJudges.map((judge) => (
            <div key={judge.url}>
              <a href={judge.url} target="_blank" rel="noreferrer">
                {judge.url}
              </a>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Containing contests",
      value: (
        <div>
          {problem.containingContests.map((contest) => (
            <div key={contest.id}>
              <Link href={`/contests/${contest.id}`} passHref>
                <MUILink>{contest.name}</MUILink>
              </Link>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4" component="h1">
            {`${problem.name}`}
          </Typography>
        </Grid>
        <Grid size={12}>
          <Card variant="outlined">
            <CardHeader title="Problem information" />
            <CardContent>
              <Table size="small">
                <TableBody>
                  {problemInfo.map((problemInfoRow) => (
                    <TableRow key={problemInfoRow.label}>
                      <TableCell>{problemInfoRow.label}</TableCell>
                      <TableCell>{problemInfoRow.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={8}>
          <EditorialListStoreProvider problemId={problemId}>
            <Stack spacing={2}>
              <MyEditorial problemId={problemId} />
              <EditorialList />
            </Stack>
          </EditorialListStoreProvider>
        </Grid>
        <Grid size={4}>
          <ProblemRating />
        </Grid>
      </Grid>
    </Container>
  );
}
