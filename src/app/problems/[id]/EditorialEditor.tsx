"use client";

import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { useMyEditorialStore } from "./stores/myEditorialStore";
import { UpdateMyEditorialRequestDto } from "./types/editorial";
import { Button, Link, Stack } from "@mui/material";
import { useState } from "react";
import MarkdownPreview from "@/app/components/MarkdownPreview";
import { PostAdd } from "@mui/icons-material";
import { useEditorialStore } from "./stores/editorialStore";
import { useSnackbar } from "notistack";

export default function EditorialEditor(props: {
  problemId: string;
  setInteractionStatus: (status: "View" | "Edit") => void;
}) {
  const { problemId, setInteractionStatus } = props;

  const editorial = useMyEditorialStore((state) => state.editorial);
  const updateEditorial = useMyEditorialStore((state) => state.updateEditorial);
  const refresh = useEditorialStore((state) => state.refresh);

  const formContext = useForm<UpdateMyEditorialRequestDto>({
    defaultValues: {
      content: editorial ? editorial.content : "",
    },
  });
  const [previewOpen, setPreviewOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(data: UpdateMyEditorialRequestDto) {
    await updateEditorial(problemId, data.content);
    enqueueSnackbar("Editorial updated successfully", {
      variant: "success",
      autoHideDuration: 2000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
    });
    formContext.reset();
    setInteractionStatus("View");
    await refresh();
  }

  return (
    <FormContainer<UpdateMyEditorialRequestDto>
      formContext={formContext}
      onSuccess={handleSubmit}
    >
      <Stack direction="column" spacing={1}>
        <TextFieldElement name="content" fullWidth size="small" multiline />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link
            href="/docs/text-formatting-guide"
            target="_blank"
            rel="noopener noreferrer"
          >
            Text formatting guide
          </Link>

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
      </Stack>

      <MarkdownPreview
        content={formContext.getValues("content")}
        handleClose={() => setPreviewOpen(false)}
        open={previewOpen}
      />
    </FormContainer>
  );
}
