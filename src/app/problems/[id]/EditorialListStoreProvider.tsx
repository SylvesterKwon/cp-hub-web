"use client";

import { useRef } from "react";
import {
  createEditorialStore,
  EditorialStore,
  EditorialStoreContext,
} from "./stores/editorialStore";

export default function EditorialListStoreProvider(props: {
  children: React.ReactNode;
  problemId: string;
}) {
  const storeRef = useRef<EditorialStore>(null);
  if (!storeRef.current)
    storeRef.current = createEditorialStore(props.problemId);

  return (
    <EditorialStoreContext.Provider value={storeRef.current}>
      {props.children}
    </EditorialStoreContext.Provider>
  );
}
