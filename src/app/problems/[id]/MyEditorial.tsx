"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useMyEditorialStore } from "./stores/myEditorialStore";
import { useEffect, useState } from "react";
import MarkdownText from "@/components/MarkdownText";
import EditorialEditor from "./EditorialEditor";
import {
  ArrowDownward,
  ArrowUpward,
  CommentOutlined,
} from "@mui/icons-material";
import dayjs from "dayjs";
import EditorialCommentSection from "./EditorialCommentSection";
import CommentStoreProvider from "@/app/components/providers/CommentStoreProvider";
import { CommentContextType, EditorialDetail } from "@/clients/cpHub/type";
import { useCommentStore } from "@/app/stores/commentStore";

export default function MyEditorial(props: { problemId: string }) {
  const problemId = props.problemId;
  const editorial = useMyEditorialStore((state) => state.editorial);
  const setEditorial = useMyEditorialStore((state) => state.setEditorial);
  const isLoading = useMyEditorialStore((state) => state.isLoading);

  // const commentTotalCount = useCommentStore((state) => state.totalCount);

  useEffect(() => {
    setEditorial(problemId);
  }, [problemId, setEditorial]);

  return (
    <Card variant="outlined">
      <CardHeader title={<Typography variant="h5">My editorial</Typography>} />
      <CardContent>
        {isLoading === false ? (
          editorial ? (
            <CommentStoreProvider
              context={{
                type: CommentContextType.EDITORIAL,
                id: editorial.id,
              }}
            >
              <MyExistingEditorial editorial={editorial} />
            </CommentStoreProvider>
          ) : (
            <EditorialEditor problemId={problemId} />
          )
        ) : (
          <>
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </>
        )}
      </CardContent>
    </Card>
  );
}

function MyExistingEditorial(props: { editorial: EditorialDetail }) {
  const { editorial } = props;

  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const commentTotalCount = useCommentStore((state) => state.totalCount);

  console.log("commentTotalCount", commentTotalCount);

  return (
    <Stack direction="column" spacing={2}>
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
            <Button variant="outlined" disabled startIcon={<ArrowUpward />}>
              {editorial.upvoteCount}
            </Button>
            <Button
              variant="outlined"
              disabled
              color="red"
              startIcon={<ArrowDownward />}
            >
              {editorial.downvoteCount}
            </Button>
          </ButtonGroup>
          <Button
            variant="text"
            size="small"
            color="info"
            startIcon={<CommentOutlined />}
            onClick={() => {
              setCommentSectionOpen((prev) => !prev);
            }}
          >
            {commentTotalCount !== undefined
              ? commentTotalCount
              : editorial.commentCount}
          </Button>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {`${dayjs(editorial.createdAt).toString()}`}
          {editorial.createdAt !== editorial.updatedAt && (
            <span>
              {" "}
              <Tooltip
                title={`Last update: ${dayjs(editorial.updatedAt).toString()}`}
                placement="top"
              >
                <u>(Edited)</u>
              </Tooltip>
            </span>
          )}
        </Typography>
      </Stack>
      {commentSectionOpen && <EditorialCommentSection />}
    </Stack>
  );
}
