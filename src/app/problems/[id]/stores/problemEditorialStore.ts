import { createStore } from "zustand";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { EditorialDetail } from "@/clients/cpHub/type";
import { createContext, useContext } from "react";
import { useStore } from "zustand";

// reference: https://zustand.docs.pmnd.rs/guides/initialize-state-with-props

export type ProblemEditorialFilter = {
  page: number;
  pageSize: number;
  // sortBy?: string;
};

const initialFilter: ProblemEditorialFilter = {
  page: 1,
  pageSize: 10,
  // sortBy
};

export type ProblemEditorialListState = {
  problemId: string;
  totalCount: number;
  editorialList: EditorialDetail[];
  filter: ProblemEditorialFilter;
  setFilter: (filter: ProblemEditorialFilter) => Promise<void>;
};

export type ProblemEditorialStore = ReturnType<
  typeof createProblemEditorialStore
>;

export const createProblemEditorialStore = (problemId: string) => {
  return createStore<ProblemEditorialListState>((set, get) => ({
    problemId,
    totalCount: 0,
    editorialList: [],
    filter: initialFilter,
    setFilter: async (newFilter) => {
      const problemId = get().problemId;
      const res = await cpHubClient.getProblemEditorialList(
        problemId,
        newFilter
      );
      set({
        filter: newFilter,
        editorialList: res.results,
        totalCount: res.totalCount,
      });
    },
  }));
};

// hooks

export const ProblemEditorialStoreContext =
  createContext<ProblemEditorialStore | null>(null);

export function useProblemEditorialStore<T>(
  selector: (state: ProblemEditorialListState) => T
): T {
  const store = useContext(ProblemEditorialStoreContext);
  if (!store)
    throw new Error(
      "Missing ProblemEditorialStoreContext.Provider in the tree"
    );
  return useStore(store, selector);
}
