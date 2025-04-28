export enum ContestType {
  CF = "CF",
  IOI = "IOI",
  KOI = "KOI",
  JOI = "JOI",
  ICPC = "ICPC",
  BOJ = "BOJ",
  USACO = "USACO",
  ATCODER = "ATCODER",
  // TOPCODER
  UNKNOWN = "UNKNOWN",
}
export enum DetailedContestType {
  // CF
  CF_DIV1 = "CF_DIV1",
  CF_DIV2 = "CF_DIV2",
  CF_DIV3 = "CF_DIV3",
  CF_DIV4 = "CF_DIV4",
  CF_DIV1_DIV2 = "CF_DIV1_DIV2",
  CF_EDU = "CF_EDU",
  CF_GLOBAL = "CF_GLOBAL",
  CF_KOTLIN_HEROS = "CF_KOTLIN_HEROS",
  CF_Q_SHARP = "CF_Q_SHARP",
  CF_ETC = "CF_ETC",

  // ATCODER
  ATCODER_ABC = "ATCODER_ABC",
  ATCODER_ARC = "ATCODER_ARC",
  ATCODER_AGC = "ATCODER_AGC",
  // ATCODER_ABC_LIKE = 'ATCODER_ABC_LIKE',
  // ATCODER_ARC_LIKE = 'ATCODER_ARC_LIKE',
  // ATCODER_AGC_LIKE = 'ATCODER_AGC_LIKE',
  ATCODER_ETC = "ATCODER_ETC",

  // ...
}

export type SignInRequestDto = {
  email: string;
  password: string;
  rememberMe?: boolean | undefined;
};

export type SignInResponse = {
  accessToken: string;
  userId: string;
  username: string;
};

export type SignUpRequestDto = {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type GetProblemListQuery = {
  page: number;
  pageSize: number;
  keyword?: string;
  contestTypes?: string[];
};

export type GetProblemListResponse = {
  results: {
    id: string;
    name: string;
    containingContests: {
      id: string;
      name: string;
      type: string;
    }[];
  }[];
  totalCount: number;
};

export type GetContestDetailResponse = {
  id: string;
  name: string;
  type: ContestType;
  detailedType?: DetailedContestType;
  platformContestId: string;
  startedAt?: string;
  durationSeconds?: number;
  url?: string;
  problems: {
    id: string;
    index?: string;
    name: string;
  }[];
};

export type GetProblemDetailResponse = {
  id: string;
  name: string;
  tags: string[]; // TODO: make it fancy
  containingContests: {
    id: string;
    name: string;
    type: ContestType;
    detailedType?: DetailedContestType;
  }[];
  availableOnlineJudges: {
    url: string;
  }[];
};

export type EditorialDetail = {
  id: string;
  createdAt: string;
  updatedAt: string;
  content: string;
  author: {
    username: string;
  };
  upvoteCount: number;
  downvoteCount: number;
  myVote?: EditorialVoteType;
};

export type EditorialListSortBy =
  | "recommended"
  | "trending"
  | "createdAtAsc"
  | "updatedAtDesc";

export type GetProblemEditorialListQuery = {
  page?: number;
  pageSize?: number;
  sortBy?: EditorialListSortBy;
};

export type GetProblemEditorialListResponse = {
  results: EditorialDetail[];
  totalCount: number;
};

export type EditorialVoteType = "upvote" | "downvote" | null;
export type EditorialVoteAction = "upvote" | "downvote" | "undo";

export type EditorialVoteRequestDto = {
  action: EditorialVoteAction;
};

export type EditorialVoteResponse = {
  message: string;
  data: {
    editorialId: string;
    upvoteCount: number;
    downvoteCount: number;
    myVote: EditorialVoteType;
  };
};
