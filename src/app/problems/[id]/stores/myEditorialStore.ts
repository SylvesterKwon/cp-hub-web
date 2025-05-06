import { create } from "zustand";
import { EditorialDetail } from "@/clients/cpHub/type";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";

export type MyEditorialStore = {
  isLoading: boolean;
  editorial: EditorialDetail | null;
  setEditorial: (problemId: string) => Promise<void>;
  updateEditorial: (problemId: string, content: string) => Promise<void>;
  deleteEditorial: (problemId: string) => Promise<void>;
};

export const useMyEditorialStore = create<MyEditorialStore>((set) => ({
  isLoading: true,
  editorial: null,
  setEditorial: async (problemId: string) => {
    set({ isLoading: true });
    try {
      const res = await cpHubClient.getMyEditorial(problemId);
      set({
        isLoading: false,
        editorial: res,
      });
    } catch (e) {
      if (
        e instanceof CpHubError &&
        e.errorCode === CpHubErrorCode.EDITORIAL_NOT_FOUND
      ) {
        set({
          isLoading: false,
          editorial: null,
        });
        return;
      } else {
        set({
          isLoading: false,
          editorial: null,
        });
        throw e;
      }
    }
  },
  updateEditorial: async (problemId: string, content: string) => {
    set({ isLoading: true });
    try {
      await cpHubClient.updateMyEditorial(problemId, { content });
      const res = await cpHubClient.getMyEditorial(problemId);
      set({
        isLoading: false,
        editorial: res,
      });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
  deleteEditorial: async (problemId: string) => {
    set({ isLoading: true });
    try {
      await cpHubClient.deleteMyEditorial(problemId);
      set({
        isLoading: false,
        editorial: null,
      });
    } catch (e) {
      set({ isLoading: false });
      throw e;
    }
  },
}));
