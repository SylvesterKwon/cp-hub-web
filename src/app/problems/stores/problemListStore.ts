import { create } from "zustand";
import cpHubClient from "@/clients/cpHub/cpHubClient";

type Pagination = {
  page: number;
  pageSize: number;
};

export type ProblemSearchOptions = {
  keyword?: string;
  contestTypes?: string[];
};

export type ProblemFilter = ProblemSearchOptions & Pagination;

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
  setSearchOption: (filter: ProblemSearchOptions) => Promise<void>;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
};

export const useProblemListStore = create<ProblemListStore>((set, get) => ({
  totalCount: 0,
  problemList: [],
  filter: initialFilter,
  setSearchOption: async (newProblemSearchOptions) => {
    set({
      filter: {
        ...initialFilter,
        ...newProblemSearchOptions,
      },
    });
    const res = await cpHubClient.getProblemList(get().filter);
    set({
      problemList: res.results,
      totalCount: res.totalCount,
    });
  },
  setPagination: async ({ page, pageSize }) => {
    const existingFilter = get().filter;
    const newFilter = { ...existingFilter, page, pageSize };
    set({ filter: newFilter });
    const res = await cpHubClient.getProblemList(newFilter);
    set({
      problemList: res.results,
      totalCount: res.totalCount,
    });
  },
}));
