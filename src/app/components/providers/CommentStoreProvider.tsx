"use client";

import { useRef } from "react";
import { CommentContext } from "@/clients/cpHub/type";
import {
  CommentStore,
  CommentStoreContext,
  createCommentStore,
} from "@/app/stores/commentStore";

export default function CommentStoreProvider(props: {
  children: React.ReactNode;
  context: CommentContext;
}) {
  const { context } = props;
  const storeRef = useRef<CommentStore>(null);
  if (!storeRef.current) storeRef.current = createCommentStore(context);

  return (
    <CommentStoreContext.Provider value={storeRef.current}>
      {props.children}
    </CommentStoreContext.Provider>
  );
}
