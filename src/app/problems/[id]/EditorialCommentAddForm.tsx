"use client";
import { Button, Stack, SxProps, Theme } from "@mui/material";
import {
  FormContainer,
  TextFieldElement,
  useForm,
  useFormState,
} from "react-hook-form-mui";
import { AddCommentForm } from "./types/comment";
import { useCommentStore } from "@/app/stores/commentStore";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";
import { setFormError } from "@/utils/setFormError";
import { useEffect } from "react";

export default function EditorialCommentAddForm(props: {
  open: boolean;
  parentCommentId?: string;
  sx?: SxProps<Theme>;
}) {
  const { open, parentCommentId, sx } = props;
  const formContext = useForm<AddCommentForm>();

  useEffect(() => {
    formContext.setValue("parentCommentId", parentCommentId);
  }, [formContext, parentCommentId]);

  const { dirtyFields } = useFormState({ control: formContext.control });

  const addComment = useCommentStore((state) => state.addComment);

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
  if (!open) return <></>;
  return (
    <FormContainer<AddCommentForm>
      formContext={formContext}
      onSuccess={handleSubmit}
    >
      <Stack direction="column" spacing={1} sx={sx}>
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
  );
}
