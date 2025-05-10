import { createStore, useStore } from "zustand";
import { createContext, useContext } from "react";
import {
  ContestReferenceInfo,
  EditorialReferenceInfo,
  ProblemReferenceInfo,
  UserReferenceInfo,
} from "@/clients/cpHub/type";
import cpHubClient from "@/clients/cpHub/cpHubClient";

export type ReferenceStoreState = {
  isLoading: boolean;
  problems: ProblemReferenceInfo[];
  contests: ContestReferenceInfo[];
  editorials: EditorialReferenceInfo[];
  users: UserReferenceInfo[];
  setReference: (
    ids: { id: string; type: "problem" | "editorial" | "contest" | "user" }[]
  ) => Promise<void>;
};

export type ReferenceStore = ReturnType<typeof createReferenceStore>;

export const createReferenceStore = () => {
  return createStore<ReferenceStoreState>((set) => ({
    isLoading: true,
    problems: [],
    contests: [],
    editorials: [],
    users: [],
    setReference: async (ids) => {
      set({ isLoading: true });
      try {
        const res = await cpHubClient.getReferenceInfoBulk({ ids });
        set({
          isLoading: false,
          problems: res.problems,
          contests: res.contests,
          editorials: res.editorials,
          users: res.users,
        });
      } catch (error) {
        console.error("Error fetching reference info:", error);
        set({ isLoading: false });
      }
    },
  }));
};

// hooks

export const ReferenceStoreContext = createContext<ReferenceStore | null>(null);

export function useReferenceStore<T>(
  selector: (state: ReferenceStoreState) => T
): T {
  const store = useContext(ReferenceStoreContext);
  if (!store) {
    throw new Error("Missing ReferenceStoreContext.Provider");
  }
  return useStore(store, selector);
}
