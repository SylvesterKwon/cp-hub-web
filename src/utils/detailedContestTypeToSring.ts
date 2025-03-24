import { DetailedContestType } from "@/clients/cpHub/type";

export function detailedContestTypeToString(
  detailedContestType: DetailedContestType
) {
  if (detailedContestType === DetailedContestType.CF_DIV1)
    return "Codeforces Div.1";
  else if (detailedContestType === DetailedContestType.CF_DIV2)
    return "Codeforces Div.2";
  else if (detailedContestType === DetailedContestType.CF_DIV3)
    return "Codeforces Div.3";
  else if (detailedContestType === DetailedContestType.CF_DIV4)
    return "Codeforces Div.4";
  else if (detailedContestType === DetailedContestType.CF_DIV1_DIV2)
    return "Codeforces Div.1/2";
  else if (detailedContestType === DetailedContestType.CF_EDU)
    return "Codeforces Educational";
  else if (detailedContestType === DetailedContestType.CF_GLOBAL)
    return "Codeforces Global";
  else if (detailedContestType === DetailedContestType.CF_KOTLIN_HEROS)
    return "Codeforces Kotlin Heros";
  else if (detailedContestType === DetailedContestType.CF_Q_SHARP)
    return "Codeforces Q#";
  else if (detailedContestType === DetailedContestType.CF_ETC)
    return "Codeforces Etc";
  else if (detailedContestType === DetailedContestType.ATCODER_ABC)
    return "AtCoder ABC";
  else if (detailedContestType === DetailedContestType.ATCODER_ARC)
    return "AtCoder ARC";
  else if (detailedContestType === DetailedContestType.ATCODER_AGC)
    return "AtCoder AGC";
  else if (detailedContestType === DetailedContestType.ATCODER_ETC)
    return "AtCoder Etc";

  return detailedContestType;
}
