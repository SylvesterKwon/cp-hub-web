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

export type GetUserDetailResponse = {
  createdAt: string;
  id: string;
  username: string;
  profilePictureUrl?: string;
  externalPlatformIds: {
    codeforces?: string;
    atCoder?: string;
    baekjoonOnlineJudge?: string;
    gitHub?: string;
  };
  biography?: string;
  metrics: {
    hIndex: number;
    gIndex: number;
    authoredCommentCount: number;
    authoredEditorialCount: number;
    editorialVoteCount: number;
  };
};

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

export type GetMeResponse =
  | {
      id: string;
      username: string;
      email: string;
      profilePictureUrl?: string;
      createdAt: string;
      updatedAt: string;
      role?: {
        id: string;
        name: string;
        permissions: {
          id: string;
          name: string;
        }[];
      };
    }
  | undefined;

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

export type GetContestListQuery = {
  page: number;
  pageSize: number;
  keyword?: string;
  types?: string[];
};

export type ContestEntry = {
  id: string;
  name: string;
  type: ContestType;
  detailedType?: DetailedContestType;
  platformContestId: string;
  startedAt?: string;
  durationSeconds?: number;
};

export type GetContestListResponse = {
  results: ContestEntry[];
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
    profilePictureUrl: string;
  };
  commentCount: number;
  upvoteCount: number;
  downvoteCount: number;
  myVote?: EditorialVoteType;
};

export type EditorialListSortBy =
  | "recommended"
  | "trending"
  | "createdAtAsc"
  | "updatedAtDesc";

export type GetEditorialListQuery = {
  page?: number;
  pageSize?: number;
  sortBy?: EditorialListSortBy;
};

export type GetEditorialListResponse = {
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

export enum ReferenceSourceType {
  COMMENT = "comment",
  EDITORIAL = "editorial",
}

export type BaseCitationInformation = {
  sourceType: ReferenceSourceType;
  createdAt: string;
  source: {
    id: string;
    author: {
      id: string;
      username: string;
      profilePictureUrl?: string;
    };
  };
};

export type CommentCitationInformation = {
  sourceType: ReferenceSourceType.COMMENT;
  source: {
    context?:
      | {
          type: CommentContextType.PROBLEM | CommentContextType.CONTEST;
          id: string;
          name: string;
        }
      | {
          type: CommentContextType.EDITORIAL;
          author: {
            id: string;
            username: string;
            profilePictureUrl?: string;
          };
          problem: {
            id: string;
            name: string;
          };
        };
  };
};

export type EditorialCitationInformation = {
  sourceType: ReferenceSourceType.EDITORIAL;
  source: {
    problem: {
      id: string;
      name: string;
    };
  };
};

export type CitationInformation = BaseCitationInformation &
  (CommentCitationInformation | EditorialCitationInformation);

export type GetEditorialCitationsResponse = {
  totalCount: number;
  results: CitationInformation[];
};

// COMMENT API
export enum CommentContextType {
  PROBLEM = "problem",
  EDITORIAL = "editorial",
  CONTEST = "contest",
}

export type CommentContext = {
  type: CommentContextType;
  id: string;
};

export type Comment = {
  id: string;
  isDeleted: boolean;
  content?: string;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
  childComments: Comment[];
};

export type GetCommentResponse = { results: Comment[]; totalCount: number };

export type AddCommentRequestDto = {
  context: CommentContext;
  content: string;
  parentCommentId?: string;
};

export type EditCommentRequestDto = {
  content: string;
};

export type AddCommentResponse = { message: string; commentId: string };
export type EditCommentResponse = { message: string; commentId: string };
export type DeleteCommentResponse = { message: string; commentId: string };

export enum RoleType {
  ADMIN = "ADMIN",
}

export type UpdateMyEditorialRequestDto = {
  content: string;
};

export type UpdateMyEditorialResponse = {
  message: string;
  editorialId: string;
};

// REFERENCE
export type GetReferenceInfoBulkRequestDto = {
  ids: { id: string; type: "problem" | "editorial" | "contest" | "user" }[];
};

export type ProblemReferenceInfo = {
  id: string;
  name: string;
};
export type ContestReferenceInfo = {
  id: string;
  name: string;
};
export type EditorialReferenceInfo = {
  id: string;
  problem: {
    id: string;
    name: string;
  };
  author: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
};
export type UserReferenceInfo = {
  id: string;
  username: string;
  profilePictureUrl?: string;
};

export type GetReferenceInfoBulkResponse = {
  problems: ProblemReferenceInfo[];
  contests: ContestReferenceInfo[];
  editorials: EditorialReferenceInfo[];
  users: UserReferenceInfo[];
};
