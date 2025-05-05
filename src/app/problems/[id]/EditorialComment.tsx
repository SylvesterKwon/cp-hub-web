"use client";
import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import EditorialCommentAddForm from "./EditorialCommentAddForm";

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
  const [replyFormOpen, setReplyFormOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const deleteComment = useCommentStore((state) => state.deleteComment);

  if (comment.isDeleted) {
    return <DeletedEditorialComment comment={comment} />;
  }
  return (
    <Stack direction="row" spacing={1} sx={{ minWidth: "300px" }}>
      <Stack direction="column" alignItems="center" spacing={1}>
        <Avatar
          sx={{ width: 36, height: 36 }}
          alt={comment.author?.username}
          src={comment.author?.profilePictureUrl}
        />
        {comment.childComments.length > 0 && (
          <Divider orientation="vertical" sx={{ flex: 1 }} />
        )}
      </Stack>

      <Stack direction="column" sx={{ width: "100%" }}>
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
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => {
                  setDeleteConfirmationOpen(true);
                }}
              >
                <Delete fontSize="inherit" />
              </IconButton>
            )}
            {userInfo && (
              <IconButton
                aria-label="reply"
                size="small"
                onClick={() => {
                  setReplyFormOpen(!replyFormOpen);
                }}
              >
                <Reply fontSize="inherit" />
              </IconButton>
            )}
          </ButtonGroup>
        </Stack>

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
        {replyFormOpen && (
          <EditorialCommentAddForm
            setOpen={setReplyFormOpen}
            parentCommentId={comment.id}
            sx={{ marginBottom: "16px" }}
          />
        )}

        {comment.childComments.length > 0 && (
          <Box
            sx={{
              transform: "translateX(-16px)",
              width: "calc(100% + 16px)",
            }}
          >
            <EditorialCommentList comments={comment.childComments} />
          </Box>
        )}
      </Stack>
      <EditorialCommentDeleteConfirmationModal
        open={deleteConfirmationOpen}
        setOpen={setDeleteConfirmationOpen}
        onOk={() => {
          deleteComment(comment.id);
        }}
      />
    </Stack>
  );
}

function DeletedEditorialComment(props: { comment: Comment }) {
  const { comment } = props;
  return (
    <Stack direction="column" spacing={1} sx={{ minWidth: "300px" }}>
      <Alert severity="warning" variant="outlined">
        Deleted comment
      </Alert>
      <Stack direction="row" spacing={1}>
        <Stack direction="column" alignItems="center">
          <Box sx={{ width: 36 }} />
          {comment.childComments.length > 0 && (
            <Divider orientation="vertical" sx={{ flex: 1 }} />
          )}
        </Stack>
        <Stack direction="column" sx={{ width: "100%" }}>
          {comment.childComments.length > 0 && (
            <Box
              sx={{
                transform: "translateX(-16px)",
                width: "calc(100% + 16px)",
              }}
            >
              <EditorialCommentList comments={comment.childComments} />
            </Box>
          )}
        </Stack>
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

function EditorialCommentDeleteConfirmationModal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOk: () => void;
}) {
  const { open, setOpen, onOk } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>Deleting comment</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            setOpen(false);
            onOk();
          }}
          autoFocus
          color="warning"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
