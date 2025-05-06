"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  DeleteOutline,
  EditNoteOutlined,
  EditOutlined,
  PostAdd,
} from "@mui/icons-material";
import dayjs from "dayjs";
import EditorialCommentSection from "./EditorialCommentSection";
import CommentStoreProvider from "@/app/components/providers/CommentStoreProvider";
import { CommentContextType, EditorialDetail } from "@/clients/cpHub/type";
import { useCommentStore } from "@/app/stores/commentStore";
import { useUserStore } from "@/app/stores/userStore";
import { useEditorialStore } from "./stores/editorialStore";

export default function MyEditorial(props: { problemId: string }) {
  const { problemId } = props;
  const editorial = useMyEditorialStore((state) => state.editorial);
  const setEditorial = useMyEditorialStore((state) => state.setEditorial);
  const isLoading = useMyEditorialStore((state) => state.isLoading);
  const deleteEditorial = useMyEditorialStore((state) => state.deleteEditorial);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const refresh = useEditorialStore((state) => state.refresh);
  const userInfo = useUserStore((state) => state.userInfo);

  const [interactionStatus, setInteractionStatus] = useState<"View" | "Edit">(
    "View"
  );

  // const commentTotalCount = useCommentStore((state) => state.totalCount);

  useEffect(() => {
    setEditorial(problemId);
  }, [problemId, setEditorial]);

  async function onDelete() {
    await deleteEditorial(problemId);
    setInteractionStatus("View");
    await refresh();
  }

  return (
    <Card variant="outlined">
      <CardHeader
        title={
          <Stack
            direction="row"
            spacing={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">My editorial</Typography>

            <ButtonGroup>
              {interactionStatus === "View" && editorial && (
                <Button
                  startIcon={<EditOutlined />}
                  variant="outlined"
                  aria-label="edit"
                  size="small"
                  onClick={() => setInteractionStatus("Edit")}
                >
                  Edit
                </Button>
              )}
              {interactionStatus === "Edit" && (
                <Button
                  variant="outlined"
                  aria-label="cancel"
                  size="small"
                  onClick={() => setInteractionStatus("View")}
                >
                  Cancel
                </Button>
              )}
              {interactionStatus === "Edit" && editorial && (
                <Button
                  color="warning"
                  startIcon={<DeleteOutline />}
                  variant="outlined"
                  aria-label="delete"
                  size="small"
                  onClick={() => setDeleteConfirmationOpen(true)}
                >
                  Delete
                </Button>
              )}
            </ButtonGroup>
          </Stack>
        }
      />
      <CardContent>
        {isLoading === false ? (
          editorial ? (
            <CommentStoreProvider
              context={{
                type: CommentContextType.EDITORIAL,
                id: editorial.id,
              }}
            >
              {interactionStatus === "View" ? (
                <MyExistingEditorial editorial={editorial} />
              ) : (
                <EditorialEditor
                  problemId={problemId}
                  setInteractionStatus={setInteractionStatus}
                />
              )}
            </CommentStoreProvider>
          ) : interactionStatus === "Edit" ? (
            <EditorialEditor
              problemId={problemId}
              setInteractionStatus={setInteractionStatus}
            />
          ) : (
            <Stack justifyContent="center">
              <Button
                startIcon={<PostAdd />}
                onClick={() => setInteractionStatus("Edit")}
              >
                Add new editorial
              </Button>
            </Stack>
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
      <EditorialDeleteConfirmationModal
        open={deleteConfirmationOpen}
        setOpen={setDeleteConfirmationOpen}
        onOk={onDelete}
      />
    </Card>
  );
}

function MyExistingEditorial(props: { editorial: EditorialDetail }) {
  const { editorial } = props;

  const [commentSectionOpen, setCommentSectionOpen] = useState(false);
  const commentTotalCount = useCommentStore((state) => state.totalCount);

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

function LoginToAddEditorial() {
  return (
    <Stack justifyContent="center">
      <Button startIcon={<EditNoteOutlined />}>Add new editorial</Button>
    </Stack>
  );
}

function EditorialDeleteConfirmationModal(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onOk: () => void;
}) {
  const { open, setOpen, onOk } = props;
  return (
    <Dialog open={open}>
      <DialogTitle>Deleting editorial</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
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
