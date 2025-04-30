"use client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { RoleType } from "@/clients/cpHub/type";
import { useCommentStore } from "@/app/stores/commentStore";
import { useState } from "react";
import type { Comment } from "@/clients/cpHub/type";
import MarkdownText from "@/components/MarkdownText";
import styles from "./styles.module.css";
import dayjs from "dayjs";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { EditCommentForm } from "./types/comment";
import { Delete, Edit, Reply } from "@mui/icons-material";
import { useUserStore } from "@/app/stores/userStore";

export default function EditorialCommentList(props: { comments: Comment[] }) {
  const { comments } = props;
  return (
    <Stack direction="column" spacing={0.5}>
      {comments.map((comment) => (
        <EditorialComment key={comment.id} comment={comment} />
      ))}
    </Stack>
  );
}

function EditorialComment(props: { comment: Comment }) {
  const { comment } = props;

  const userInfo = useUserStore((state) => state.userInfo);
  const [interactionStatus, setInteractionStatus] = useState<"View" | "Edit">(
    "View"
  );

  // const deleteComment = useCommentStore((state) => state.deleteComment);

  if (comment.isDeleted)
    return (
      <Alert severity="warning" variant="outlined">
        Deleted comment
        {/* TODO: 삭제 댓글 대댓글은 표현하도록 수정 */}
      </Alert>
    );
  return (
    <Stack direction="row" spacing={1} sx={{ minWidth: "300px" }}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt={comment.author?.username}
          src={comment.author?.profilePictureUrl}
        />
        <Divider orientation="vertical" sx={{ height: "100%" }} />
      </Stack>

      <Stack direction="column">
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography sx={{ fontWeight: "medium" }}>
              {comment.author?.username}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(comment.createdAt).toString()}
              {comment.createdAt !== comment.updatedAt && (
                <span>
                  {" "}
                  <Tooltip
                    title={`Last update: ${dayjs(
                      comment.updatedAt
                    ).toString()}`}
                    placement="top"
                  >
                    <u>(Edited)</u>
                  </Tooltip>
                </span>
              )}
            </Typography>
          </Stack>
          <ButtonGroup
            className={styles["comment-action-section"]}
            size="small"
          >
            {userInfo?.id === comment.author?.id && (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={() =>
                  setInteractionStatus(
                    interactionStatus === "View" ? "Edit" : "View"
                  )
                }
              >
                <Edit fontSize="inherit" />
              </IconButton>
            )}
            {(userInfo?.id === comment.author?.id ||
              userInfo?.role?.name === RoleType.ADMIN) && (
              <IconButton aria-label="delete" size="small">
                <Delete fontSize="inherit" />
              </IconButton>
            )}
            {userInfo && (
              <IconButton aria-label="reply" size="small">
                <Reply fontSize="inherit" />
              </IconButton>
            )}
          </ButtonGroup>
        </Stack>

        <Box sx={{ marginBottom: "16px" }}>
          <div className={styles["comment-markdown-text"]}>
            {interactionStatus === "Edit" ? (
              <EditorialCommentEdit
                comment={comment}
                setInteractionStatus={setInteractionStatus}
              />
            ) : (
              <MarkdownText
                content={comment.content!}
                // disallowedElements={["h1", "h2", "h3", "h4", "h5", "h6"]}
              />
            )}
          </div>
        </Box>

        {comment.childComments.length > 0 && (
          <Box sx={{ marginLeft: -2 }}>
            <EditorialCommentList comments={comment.childComments} />
          </Box>
        )}
      </Stack>
    </Stack>
  );
}

function EditorialCommentEdit(props: {
  comment: Comment;
  setInteractionStatus: (status: "View" | "Edit") => void;
}) {
  const { comment, setInteractionStatus } = props;
  const editComment = useCommentStore((state) => state.editComment);

  const formContext = useForm<EditCommentForm>({
    defaultValues: {
      content: comment.content,
    },
  });

  async function handleEditFormSubmit(data: EditCommentForm) {
    await editComment(comment.id, data);
    setInteractionStatus("View");
  }

  return (
    <FormContainer<EditCommentForm>
      formContext={formContext}
      onSuccess={handleEditFormSubmit}
    >
      <Stack direction="column" spacing={1}>
        <TextFieldElement name="content" fullWidth size="small" multiline />
        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <ButtonGroup size="small">
            <Button
              size="small"
              onClick={() => {
                formContext.reset();
                setInteractionStatus("View");
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="small"
              color="primary"
              variant="contained"
            >
              Post
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </FormContainer>
  );
}
