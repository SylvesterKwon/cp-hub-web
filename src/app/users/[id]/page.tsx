import cpHubClient from "@/clients/cpHub/cpHubClient";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";
import { GetUserDetailResponse } from "@/clients/cpHub/type";
import {
  Alert,
  Avatar,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import UserMetricSection from "./UserMetricSection";
import UserExternalLinkSection from "./UserExternalLinkSection";
import { PageProps } from "../../../../.next/types/app/page";

export default async function UserPage(props: PageProps) {
  const params = await props.params;
  const username = params.id;
  let userDetail: GetUserDetailResponse | null = null;

  try {
    userDetail = await cpHubClient.getUserDetail(username);
  } catch (e) {
    if (
      e instanceof CpHubError &&
      e.errorCode === CpHubErrorCode.USER_NOT_FOUND
    )
      return <UserNotFoundPage username={username} />;
  }
  if (!userDetail) return <UnexpectedErrorPage />;

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={3}>
          <Stack direction="column" spacing={2}>
            <Avatar
              variant="rounded"
              src={userDetail.profilePictureUrl}
              alt={`${userDetail.username}'s avatar`}
              sx={{ width: "100%", height: "100%" }}
            />
            <UserMetricSection userDetail={userDetail} />
            <UserExternalLinkSection userDetail={userDetail} />
          </Stack>
        </Grid>
        <Grid size={9}>
          <Stack direction="column" spacing={2}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h4">{`${userDetail.username}`}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  Member since:{" "}
                  {dayjs(userDetail.createdAt).format("MMMM D, YYYY")}
                </Typography>
                <Divider sx={{ marginBottom: "8px" }} />
                <Typography variant="body1">
                  {userDetail.biography || "No bio available."}
                </Typography>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Authored editorial</Typography>
                <Alert severity="warning">WIP</Alert>
              </CardContent>
            </Card>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h5">Recent activities</Typography>
                <Alert severity="warning">WIP</Alert>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

function UserNotFoundPage(props: { username: string }) {
  const { username } = props;
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Alert severity="error">{`404: User ${username} not found`}</Alert>
        </Grid>
      </Grid>
    </Container>
  );
}

function UnexpectedErrorPage() {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid size={12}>
          <Alert severity="error">An unexpected error occurred.</Alert>
        </Grid>
      </Grid>
    </Container>
  );
}
