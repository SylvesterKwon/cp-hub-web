"use client";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { EditorialDetail } from "@/clients/cpHub/type";
import {
  ArrowDownward,
  ArrowUpward,
  CommentOutlined,
  FormatQuote,
} from "@mui/icons-material";
import dayjs from "dayjs";
import MarkdownText from "@/components/MarkdownText/remarkPlugins/MarkdownText";
import { useEditorialStore } from "./stores/editorialStore";
import { useState } from "react";
import EditorialCommentSection from "./EditorialCommentSection";
import { useCommentStore } from "@/app/stores/commentStore";
import { useUserStore } from "@/app/stores/userStore";
import CitedBySecion from "./CitedBySection";
import Link from "next/link";

export default function Editorial(props: { editorial: EditorialDetail }) {
  const { editorial } = props;

  const vote = useEditorialStore((state) => state.vote);
  const [viewMode, setViewMode] = useState<"folded" | "comment" | "citedBy">(
    "folded"
  );

  const commentTotalCount = useCommentStore((state) => state.totalCount);

  return (
    <Card color="secondary" variant="outlined">
      <Stack direction="column" spacing={2} padding={2}>
        <UserCard
          username={editorial.author.username}
          profilePictureUrl={editorial.author.profilePictureUrl}
        />

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
                  onClick={() => vote(editorial.id, "undo")}
                >
                  {editorial.upvoteCount}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                  onClick={() => vote(editorial.id, "upvote")}
                >
                  {editorial.upvoteCount}
                </Button>
              )}
              {editorial.myVote === "downvote" ? (
                <Button
                  variant="contained"
                  color="red"
                  startIcon={<ArrowDownward />}
                  onClick={() => vote(editorial.id, "undo")}
                >
                  {editorial.downvoteCount}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  startIcon={<ArrowDownward />}
                  onClick={() => vote(editorial.id, "downvote")}
                >
                  {editorial.downvoteCount}
                </Button>
              )}
            </ButtonGroup>
            <div>
              <Button
                variant="text"
                size="small"
                color="info"
                startIcon={<CommentOutlined />}
                onClick={() => {
                  setViewMode((prev) =>
                    prev === "comment" ? "folded" : "comment"
                  );
                }}
              >
                {commentTotalCount !== undefined
                  ? commentTotalCount
                  : editorial.commentCount}
              </Button>
              <Tooltip title="View cited by" placement="top">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => {
                    setViewMode((prev) =>
                      prev === "citedBy" ? "folded" : "citedBy"
                    );
                  }}
                >
                  <FormatQuote />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
          <Typography variant="body2" color="text.secondary">
            {`${dayjs(editorial.createdAt).toString()}`}
            {editorial.createdAt !== editorial.updatedAt && (
              <span>
                {" "}
                <Tooltip
                  title={`Last update: ${dayjs(
                    editorial.updatedAt
                  ).toString()}`}
                  placement="top"
                >
                  <u>(Edited)</u>
                </Tooltip>
              </span>
            )}
          </Typography>
        </Stack>
        {viewMode === "comment" && <EditorialCommentSection />}
        {viewMode === "citedBy" && <CitedBySecion editorialId={editorial.id} />}
      </Stack>
    </Card>
  );
}

function UserCard(props: { username: string; profilePictureUrl?: string }) {
  const { username, profilePictureUrl } = props;
  const userInfo = useUserStore((state) => state.userInfo);
  return (
    <Box
      sx={{
        width: "fit-content",
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Avatar alt={username} src={profilePictureUrl} />
        <Stack direction="column">
          <Link
            href={`/users/${username}`}
            style={{ color: "inherit", textDecoration: "inherit" }}
          >
            <Typography sx={{ fontWeight: "medium" }}>
              {`${username}${userInfo?.username === username ? " (me)" : ""}`}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary">
            citations 1,342 | h-index 118
            {/* TODO: H-index 연동 */}
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}
