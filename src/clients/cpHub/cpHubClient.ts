import { CpHubBaseClient } from "./CpHubBase";
import { GetContestDetailResponse } from "./type";

class CpHubClient extends CpHubBaseClient {
  async signIn(dto: {
    email: string;
    password: string;
    rememberMe?: boolean | undefined;
  }) {
    // status code 등 접근할 수 있도록 baseclient 수정 필요. 지금은 body만 접근 가능
    const res = await this.post("/user/sign-in", dto);
    return res as {
      accessToken: string;
      userId: string;
      username: string;
    };
  }

  async signUp(dto: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  }) {
    await this.post("/user/sign-up", dto);
    return;
  }

  async getProblemList(dto: {
    page: number;
    pageSize: number;
    keyword?: string;
    contestTypes?: string[];
  }) {
    const res = await this.get("/problem", dto);
    return res as {
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
  }

  async getContestDetail(contestId: string) {
    const res = await this.get(`/contest/${contestId}`);
    return res as GetContestDetailResponse;
  }
}

const cpHubClient = new CpHubClient();
export default cpHubClient;
