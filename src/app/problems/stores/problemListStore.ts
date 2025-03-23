import { create } from "zustand";
import cpHubClient from "@/clients/cpHub/cpHubClient";

export type ProblemFilter = {
  page: number;
  pageSize: number;
  keyword?: string;
  contestTypes?: string[];
};

const initialFilter: ProblemFilter = {
  page: 1,
  pageSize: 20,
};

export type ProblemEntry = {
  id: string;
  name: string;
  containingContests: {
    id: string;
    name: string;
    type: string;
  }[];
};

export type ProblemListStore = {
  totalCount: number;
  problemList: ProblemEntry[];
  filter: ProblemFilter;
  setFilter: (filter: ProblemFilter) => Promise<void>;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
};

export const useProblemListStore = create<ProblemListStore>((set) => ({
  totalCount: 0,
  problemList: [],
  filter: initialFilter,
  setFilter: async (newFilter) => {
    set({ filter: newFilter });
    const res = await cpHubClient.getProblemList(newFilter);
    set({
      problemList: res.results,
      totalCount: res.totalCount,
    });
  },
  setPagination: async ({ page, pageSize }) => {
    const newFilter = { ...initialFilter, page, pageSize };
    set({ filter: newFilter });
    const res = await cpHubClient.getProblemList(newFilter);
    set({
      problemList: res.results,
      totalCount: res.totalCount,
    });
  },
}));
