"use client";

import { useRef } from "react";
import {
  createProblemEditorialStore,
  ProblemEditorialStore,
  ProblemEditorialStoreContext,
} from "./stores/problemEditorialStore";

export default function EditorialListStoreProvider(props: {
  children: React.ReactNode;
  problemId: string;
}) {
  const storeRef = useRef<ProblemEditorialStore>(null);
  if (!storeRef.current)
    storeRef.current = createProblemEditorialStore(props.problemId);

  return (
    <ProblemEditorialStoreContext.Provider value={storeRef.current}>
      {props.children}
    </ProblemEditorialStoreContext.Provider>
  );
}
