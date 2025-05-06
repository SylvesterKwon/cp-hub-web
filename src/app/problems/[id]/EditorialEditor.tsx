"use client";

import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useMyEditorialStore } from "./stores/myEditorialStore";
import { UpdateMyEditorialRequestDto } from "./types/editorial";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useState } from "react";
import MarkdownPreview from "@/app/components/MarkdownPreview";
import { PostAdd } from "@mui/icons-material";

export default function EditorialEditor(props: {
  problemId: string;
  setInteractionStatus: (status: "View" | "Edit") => void;
}) {
  const { problemId, setInteractionStatus } = props;

  const editorial = useMyEditorialStore((state) => state.editorial);
  const updateEditorial = useMyEditorialStore((state) => state.updateEditorial);
  const formContext = useForm<UpdateMyEditorialRequestDto>({
    defaultValues: {
      content: editorial ? editorial.content : "",
    },
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  async function handleSubmit(data: UpdateMyEditorialRequestDto) {
    await updateEditorial(problemId, data.content);
    formContext.reset();
    setInteractionStatus("View");
  }

  return (
    <FormContainer<UpdateMyEditorialRequestDto>
      formContext={formContext}
      onSuccess={handleSubmit}
    >
      <Stack direction="column" spacing={1}>
        <TextFieldElement name="content" fullWidth size="small" multiline />

        <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <Button size="small" onClick={() => setPreviewOpen(true)}>
            Preview
          </Button>
          <Button
            startIcon={<PostAdd />}
            type="submit"
            size="small"
            color="primary"
            variant="contained"
          >
            Post
          </Button>
        </Stack>
      </Stack>
      <MarkdownPreview
        content={formContext.getValues("content")}
        handleClose={() => setPreviewOpen(false)}
        open={previewOpen}
      />
    </FormContainer>
  );
}
