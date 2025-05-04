"use client";
import { Card, Stack } from "@mui/material";
import EditorialCommentList from "./EditorialComment";
import { useCommentStore } from "@/app/stores/commentStore";
import { useEffect } from "react";
import EditorialCommentAddForm from "./EditorialCommentAddForm";

export default function EditorialCommentSection() {
  const comments = useCommentStore((state) => state.comments);
  const getComments = useCommentStore((state) => state.getComments);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Card
      color="secondary"
      variant="outlined"
      sx={{ padding: 1, overflow: "scroll" }}
    >
      <Stack direction="column" spacing={2}>
        <EditorialCommentAddForm open={true} />
        <EditorialCommentList comments={comments} />
      </Stack>
    </Card>
  );
}
