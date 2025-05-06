import { createStore } from "zustand";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { EditorialDetail, EditorialVoteAction } from "@/clients/cpHub/type";
import { createContext, useContext } from "react";
import { useStore } from "zustand";

// reference: https://zustand.docs.pmnd.rs/guides/initialize-state-with-props

export type EditorialFilter = {
  page: number;
  pageSize: number;
  sortBy?: "recommended" | "trending" | "createdAtAsc" | "updatedAtDesc";
};

const initialFilter: EditorialFilter = {
  page: 1,
  pageSize: 10,
  // sortBy
};

export type EditorialListState = {
  isLoading: boolean;
  problemId: string;
  totalCount: number;
  editorialList: EditorialDetail[];
  filter: EditorialFilter;
  setFilter: (filter: EditorialFilter) => Promise<void>;
  refresh: () => Promise<void>;
  vote: (editorialId: string, action: EditorialVoteAction) => Promise<void>;
};

export type EditorialStore = ReturnType<typeof createEditorialStore>;

export const createEditorialStore = (problemId: string) => {
  return createStore<EditorialListState>((set, get) => ({
    isLoading: true,
    problemId,
    totalCount: 0,
    myEditorial: null,
    editorialList: [],
    filter: initialFilter,
    setFilter: async (newFilter) => {
      set({ isLoading: true });
      const problemId = get().problemId;
      const res = await cpHubClient.getEditorialList(problemId, newFilter);
      set({
        isLoading: false,
        filter: newFilter,
        editorialList: res.results,
        totalCount: res.totalCount,
      });
    },
    refresh: async () => {
      set({ isLoading: true });
      const problemId = get().problemId;
      const res = await cpHubClient.getEditorialList(problemId, get().filter);
      set({
        isLoading: false,
        editorialList: res.results,
        totalCount: res.totalCount,
      });
    },
    vote: async (editorialId: string, action: EditorialVoteAction) => {
      const res = await cpHubClient.editorialVote(editorialId, { action });
      const editorialList = get().editorialList.map((editorial) => {
        if (editorial.id === editorialId) {
          return {
            ...editorial,
            upvoteCount: res.data.upvoteCount,
            downvoteCount: res.data.downvoteCount,
            myVote: res.data.myVote,
          };
        }
        // TODO: add complete snackbar
        return editorial;
      });
      set({ editorialList });
    },
  }));
};

// hooks

export const EditorialStoreContext = createContext<EditorialStore | null>(null);

export function useEditorialStore<T>(
  selector: (state: EditorialListState) => T
): T {
  const store = useContext(EditorialStoreContext);
  if (!store)
    throw new Error("Missing EditorialStoreContext.Provider in the tree");
  return useStore(store, selector);
}
