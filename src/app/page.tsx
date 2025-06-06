import cpHubClient from "@/clients/cpHub/cpHubClient";
import MarkdownText from "@/components/MarkdownText/remarkPlugins/MarkdownText";
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import fs from "fs";

export default async function Home() {
  const getProblemListRes = await cpHubClient.getProblemList({
    page: 1,
    pageSize: 10,
    sortBy: "updatedAtDesc",
  });
  const getContestListRes = await cpHubClient.getContestList({
    page: 1,
    pageSize: 10,
    sortBy: "updatedAtDesc",
  });
  const getEditorialListRes = await cpHubClient.getEditorialList({
    page: 1,
    pageSize: 7,
    sortBy: "updatedAtDesc",
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <MarkdownText
              content={`
# Welcome to CP hub
**CP hub** is a community project that gathers competitive programming (CP) contests and problem information scattered across various platforms into one place,
allowing users to share editorials and opinions. Made by @SylvesterKwon .

Integrated platforms: [Codeforces](https://codeforces.com/), [AtCoder](https://atcoder.jp/)
                  `}
            />
          </Card>
        </Grid>
        <Grid size={12}>
          <Card variant="outlined" sx={{ padding: 2 }}>
            <MarkdownText
              content={`
## Contribute building CP Hub
CP Hub is still under active development. We plan to build a variety of features, including forums, wikis, and group functionalities.
If you’re another CP enthusiastic && interested in contributing, feel free to open a PR on GitHub or reach out via email at sylvesterkwon@gmail.com.

### GitHub repositories:
- [API server (cp-hub-server)](https://github.com/SylvesterKwon/cp-hub-server)
- [Web client (cp-hub-web)](https://github.com/SylvesterKwon/cp-hub-web)
              `}
            />
          </Card>
        </Grid>
        <Grid size={4}>
          <Card variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Recent problems</Typography>
                <Link href="/problems">
                  <Typography variant="body2">View all</Typography>
                </Link>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Total: {getProblemListRes.totalCount.toLocaleString()}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Stack direction="column" spacing={1}>
                {getProblemListRes.results.map((problem) => (
                  <Card
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Link
                      href={`/problems/${problem.id}`}
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography variant="body1">{problem.name}</Typography>
                    </Link>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card variant="outlined">
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Recent contests</Typography>
                <Link href="/contests">
                  <Typography variant="body2">View all</Typography>
                </Link>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Total: {getContestListRes.totalCount.toLocaleString()}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Stack direction="column" spacing={1}>
                {getContestListRes.results.map((contest) => (
                  <Card
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Link
                      href={`/contests/${contest.id}`}
                      sx={{
                        textDecoration: "none",
                      }}
                    >
                      <Typography variant="body1">{contest.name}</Typography>
                    </Link>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={4}>
          <Card variant="outlined" sx={{ height: "100%", overflow: "scroll" }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h6">Recent editorials</Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary">
                Total: {getEditorialListRes.totalCount.toLocaleString()}
              </Typography>
              <Divider sx={{ marginY: 1 }} />
              <Stack direction="column" spacing={1}>
                {getEditorialListRes.results.map((editorial) => (
                  <Card
                    sx={{
                      padding: 1,
                    }}
                  >
                    <Typography variant="body1">
                      <Link
                        href={`/editorials/${editorial.id}`}
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        Editorial
                      </Link>{" "}
                      of{" "}
                      <Link
                        href={`/problems/${editorial.problem.id}`}
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        {`${
                          editorial.problem.name
                            ? editorial.problem.name
                            : "Problem: " + editorial.problem.id
                        }`}
                      </Link>{" "}
                      by{" "}
                      <Link
                        href={`/users/${editorial.author.username}`}
                        sx={{
                          textDecoration: "none",
                        }}
                      >
                        {`@${editorial.author.username}`}
                      </Link>
                    </Typography>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
