"use client";
import { Card, Stack } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { NewCommentForm } from "./types/comment";
import EditorialCommentList from "./EditorialComment";
import { useCommentStore } from "@/app/stores/commentStore";
import { useEffect } from "react";

export default function EditorialCommentSection() {
  const formContext = useForm<NewCommentForm>();
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
        <FormContainer<NewCommentForm>
          formContext={formContext}
          // onSuccess={handleSubmit}
        >
          <TextFieldElement
            name="username"
            fullWidth
            variant="outlined"
            placeholder="Add a comment... (WIP)"
            size="small"
            multiline
          />
        </FormContainer>
        <EditorialCommentList comments={comments} />
      </Stack>
    </Card>
  );
}
