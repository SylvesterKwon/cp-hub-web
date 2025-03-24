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
