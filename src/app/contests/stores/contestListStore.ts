import { create } from "zustand";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { ContestEntry } from "@/clients/cpHub/type";

type Pagination = {
  page: number;
  pageSize: number;
};

export type ContestSearchOptions = {
  keyword?: string;
  types?: string[];
};

export type ContestFilter = ContestSearchOptions & Pagination;

const initialFilter: ContestFilter = {
  page: 1,
  pageSize: 20,
};

export type ContestListStore = {
  totalCount: number;
  contestList: ContestEntry[];
  filter: ContestFilter;
  setSearchOption: (filter: ContestSearchOptions) => Promise<void>;
  setPagination: (pagination: { page: number; pageSize: number }) => void;
};

export const useContestListStore = create<ContestListStore>((set, get) => ({
  totalCount: 0,
  contestList: [],
  filter: initialFilter,
  setSearchOption: async (newContestSearchOptions) => {
    set({
      filter: {
        ...initialFilter,
        ...newContestSearchOptions,
      },
    });
    const res = await cpHubClient.getContestList(get().filter);
    set({
      contestList: res.results,
      totalCount: res.totalCount,
    });
  },
  setPagination: async ({ page, pageSize }) => {
    const existingFilter = get().filter;
    const newFilter = { ...existingFilter, page, pageSize };
    set({ filter: newFilter });
    const res = await cpHubClient.getContestList(newFilter);
    set({
      contestList: res.results,
      totalCount: res.totalCount,
    });
  },
}));
