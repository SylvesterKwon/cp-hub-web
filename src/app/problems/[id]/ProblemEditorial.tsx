import {
  Avatar,
  Button,
  ButtonGroup,
  Card,
  Stack,
  Typography,
} from "@mui/material";
import { EditorialDetail, EditorialVoteAction } from "@/clients/cpHub/type";
import {
  ArrowDownward,
  ArrowUpward,
  CommentOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import MarkdownText from "@/components/MarkdownText";

export default function ProblemEditorial(props: {
  editorial: EditorialDetail;
  onVote: (editorialId: string, action: EditorialVoteAction) => void;
}) {
  const { editorial, onVote } = props;

  return (
    <Card color="secondary" variant="outlined">
      <Stack direction="column" spacing={2} padding={2}>
        <UserCard username={editorial.author.username} />
        <MarkdownText content={editorial.content} />
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
              {editorial.myVote === "upvote" ? (
                <Button
                  variant="contained"
                  color="blue"
                  startIcon={<ArrowUpward />}
                  onClick={() => onVote(editorial.id, "undo")}
                >
                  {editorial.upvoteCount}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                  onClick={() => onVote(editorial.id, "upvote")}
                >
                  {editorial.upvoteCount}
                </Button>
              )}
              {editorial.myVote === "downvote" ? (
                <Button
                  variant="contained"
                  color="red"
                  startIcon={<ArrowDownward />}
                  onClick={() => onVote(editorial.id, "undo")}
                >
                  {editorial.downvoteCount}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<ArrowDownward />}
                  onClick={() => onVote(editorial.id, "downvote")}
                >
                  {editorial.downvoteCount}
                </Button>
              )}
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
