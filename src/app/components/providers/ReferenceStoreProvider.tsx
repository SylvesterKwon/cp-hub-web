"use client";

import {
  createReferenceStore,
  ReferenceStore,
  ReferenceStoreContext,
} from "@/app/stores/referenceStore";
import { useRef } from "react";

export default function ReferenceStoreProvider(props: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<ReferenceStore>(null);
  if (!storeRef.current) storeRef.current = createReferenceStore();

  return (
    <ReferenceStoreContext.Provider value={storeRef.current}>
      {props.children}
    </ReferenceStoreContext.Provider>
  );
}
