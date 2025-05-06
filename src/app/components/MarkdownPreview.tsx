"use client";

import MarkdownText from "@/components/MarkdownText";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

export default function MarkdownPreview(props: {
  content: string;
  open: boolean;
  handleClose: () => void;
}) {
  const { content, open, handleClose } = props;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">Preview</DialogTitle>
      <DialogContent>
        <MarkdownText content={content} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
