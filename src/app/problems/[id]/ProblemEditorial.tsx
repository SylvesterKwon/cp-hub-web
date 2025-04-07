import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import { EditorialDetail } from "@/clients/cpHub/type";
import {
  ArrowDownward,
  ArrowUpward,
  Comment,
  CommentOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";

export default function ProblemEditorial(props: {
  editorial: EditorialDetail;
}) {
  const { editorial } = props;

  return (
    <Card color="secondary" variant="outlined">
      <Stack direction="column" spacing={2} padding={2}>
        <UserCard username={editorial.author.username} />
        <div>{editorial.content}</div>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ "--mui-shape-borderRadius": "16px" }}
          >
            <ButtonGroup size="small" color="info">
              <Button startIcon={<ArrowUpward />}>32</Button>
              <Button startIcon={<ArrowDownward />}>12</Button>
            </ButtonGroup>
            <Button
              variant="text"
              size="small"
              color="info"
              startIcon={<CommentOutlined />}
            >
              3
            </Button>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {`${dayjs(editorial.createdAt).toString()}`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

function UserCard(props: { username: string }) {
  const { username } = props;
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar
        alt={username}
        src="https://sylvesterkwon.com/static/990203867e2bfc727a5b35979bd7fce8/d4bf4/profile-pic.avif"
      />
      <Stack direction="column">
        <Typography variant="body2" color="text">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          WIP - simple stats
        </Typography>
      </Stack>
    </Stack>
  );
}
