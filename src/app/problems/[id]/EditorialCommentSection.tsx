"use client";
import { Button, Card, Stack } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  useForm,
  useFormState,
} from "react-hook-form-mui";
import { AddCommentForm } from "./types/comment";
import EditorialCommentList from "./EditorialComment";
import { useCommentStore } from "@/app/stores/commentStore";
import { useEffect } from "react";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";
import { setFormError } from "@/utils/setFormError";

export default function EditorialCommentSection() {
  const formContext = useForm<AddCommentForm>();
  const { dirtyFields } = useFormState({ control: formContext.control });

  const comments = useCommentStore((state) => state.comments);
  const addComment = useCommentStore((state) => state.addComment);
  const getComments = useCommentStore((state) => state.getComments);

  useEffect(() => {
    getComments();
  }, [getComments]);

  async function handleSubmit(data: AddCommentForm) {
    try {
      await addComment(data);
      formContext.reset();
    } catch (e) {
      if (
        e instanceof CpHubError &&
        e.errorCode === CpHubErrorCode.VALIDATION_FAILED
      )
        setFormError(formContext, e);
    }
  }

  return (
    <Card
      color="secondary"
      variant="outlined"
      sx={{ padding: 1, overflow: "scroll" }}
    >
      <Stack direction="column" spacing={2}>
        <FormContainer<AddCommentForm>
          formContext={formContext}
          onSuccess={handleSubmit}
        >
          <Stack direction="column" spacing={1}>
            <TextFieldElement
              name="content"
              fullWidth
              variant="outlined"
              placeholder="Add a comment..."
              size="small"
              multiline
            />
            {dirtyFields.content && (
              <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button
                  type="submit"
                  size="small"
                  color="primary"
                  variant="contained"
                >
                  Post
                </Button>
              </Stack>
            )}
          </Stack>
        </FormContainer>
        <EditorialCommentList comments={comments} />
      </Stack>
    </Card>
  );
}
