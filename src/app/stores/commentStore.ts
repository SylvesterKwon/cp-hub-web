import { CommentContext } from "@/clients/cpHub/type";
import { createStore, useStore } from "zustand";
import { Comment } from "@/clients/cpHub/type";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import {
  AddCommentForm,
  EditCommentForm,
} from "../problems/[id]/types/comment";
import { createContext, useContext } from "react";

export type CommentStoreState = {
  context: CommentContext;
  totalCount?: number; // undefined when not initialized yet
  comments: Comment[];
  getComments: () => Promise<void>;
  addComment: (data: AddCommentForm) => Promise<void>;
  editComment: (commentId: string, data: EditCommentForm) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
};

export type CommentStore = ReturnType<typeof createCommentStore>;

export const createCommentStore = (context: CommentContext) => {
  return createStore<CommentStoreState>((set, get) => ({
    context,
    totalCount: undefined,
    comments: [],
    getComments: async () => {
      const res = await cpHubClient.getComment(get().context);
      set({ totalCount: res.totalCount, comments: res.results });
    },
    addComment: async (data: AddCommentForm) => {
      await cpHubClient.addComment({
        context: get().context,
        content: data.content,
        parentCommentId: data.parentCommentId,
      });
      const res = await cpHubClient.getComment(get().context);
      set({ totalCount: res.totalCount, comments: res.results });
    },
    editComment: async (commentId: string, data: EditCommentForm) => {
      await cpHubClient.editComment(commentId, data);
      const res = await cpHubClient.getComment(get().context);
      set({ totalCount: res.totalCount, comments: res.results });
    },
    deleteComment: async (commentId: string) => {
      await cpHubClient.deleteComment(commentId);
      const res = await cpHubClient.getComment(get().context);
      set({ totalCount: res.totalCount, comments: res.results });
      // 삭제
    },
  }));
};

// hooks

export const CommentStoreContext = createContext<CommentStore | null>(null);

export function useCommentStore<T>(
  selector: (state: CommentStoreState) => T
): T {
  const store = useContext(CommentStoreContext);
  if (!store) {
    throw new Error("Missing CommentStoreContext.Provider");
  }
  return useStore(store, selector);
}
