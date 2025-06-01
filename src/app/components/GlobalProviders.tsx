"use client";

import { SnackbarProvider } from "notistack";

// This component wraps the application with global providers only works in client components
export default function GlobalProviders(props: { children: React.ReactNode }) {
  return (
    <>
      <SnackbarProvider>{props.children}</SnackbarProvider>
    </>
  );
}
