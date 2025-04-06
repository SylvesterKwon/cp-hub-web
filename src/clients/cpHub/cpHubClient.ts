import { CpHubBaseClient } from "./CpHubBase";
import {
  EditorialDetail,
  GetContestDetailResponse,
  GetProblemDetailResponse,
  GetProblemEditorialListQuery,
  GetProblemEditorialListResponse,
  GetProblemListQuery,
  GetProblemListResponse,
  SignInRequestDto,
  SignInResponse,
  SignUpRequestDto,
} from "./type";

class CpHubClient extends CpHubBaseClient {
  async signIn(dto: SignInRequestDto) {
    // TODO: status code 등 접근할 수 있도록 baseclient 수정 필요. 지금은 body만 접근 가능
    const res = await this.post("/user/sign-in", dto);
    return res as SignInResponse;
  }

  async signUp(dto: SignUpRequestDto) {
    await this.post("/user/sign-up", dto);
    return;
  }

  async getProblemList(dto: GetProblemListQuery) {
    const res = await this.get("/problem", dto);
    return res as GetProblemListResponse;
  }

  async getContestDetail(contestId: string) {
    const res = await this.get(`/contest/${contestId}`);
    return res as GetContestDetailResponse;
  }

  async getProblemDetail(problemId: string) {
    const res = await this.get(`/problem/${problemId}`);
    return res as GetProblemDetailResponse;
  }

  async getMyProblemEditorial(problemId: string) {
    const res = await this.get(`/problem/${problemId}/my-editorial`);
    return res as EditorialDetail;
  }

  async getProblemEditorialList(
    problemId: string,
    dto: GetProblemEditorialListQuery
  ) {
    const res = await this.get(`/problem/${problemId}/editorial`, dto);
    return res as GetProblemEditorialListResponse;
  }
}

const cpHubClient = new CpHubClient();
export default cpHubClient;
