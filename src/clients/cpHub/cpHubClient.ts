import {
  DeleteMyEditorialResponse,
  UpdateMyEditorialRequestDto,
  UpdateMyEditorialResponse,
} from "@/app/problems/[id]/types/editorial";
import { CpHubBaseClient } from "./CpHubBase";
import {
  AddCommentRequestDto,
  AddCommentResponse,
  CommentContext,
  DeleteCommentResponse,
  EditCommentRequestDto,
  EditCommentResponse,
  EditorialDetail,
  EditorialVoteRequestDto,
  EditorialVoteResponse,
  GetCommentResponse,
  GetContestDetailResponse,
  GetMeResponse,
  GetProblemDetailResponse,
  GetEditorialListQuery,
  GetEditorialListResponse,
  GetProblemListQuery,
  GetProblemListResponse,
  SignInRequestDto,
  SignInResponse,
  SignUpRequestDto,
  GetReferenceInfoBulkRequestDto,
  GetReferenceInfoBulkResponse,
  GetEditorialCitationsResponse,
  GetUserDetailResponse,
  GetContestListQuery,
  GetContestListResponse,
} from "./type";

class CpHubClient extends CpHubBaseClient {
  // USER API
  async getUserDetail(username: string) {
    const res = await this.get(`/user/${username}/detail`);
    return res as GetUserDetailResponse;
  }

  async signIn(dto: SignInRequestDto) {
    // TODO: status code 등 접근할 수 있도록 baseclient 수정 필요. 지금은 body만 접근 가능
    const res = await this.post("/user/sign-in", dto);
    return res as SignInResponse;
  }

  async signUp(dto: SignUpRequestDto) {
    await this.post("/user/sign-up", dto);
    return;
  }

  async getMe() {
    const res = await this.get("/user/me");
    return res as GetMeResponse;
  }

  // PROBLEM API
  async getProblemList(dto: GetProblemListQuery) {
    const res = await this.get("/problem", dto);
    return res as GetProblemListResponse;
  }

  async getProblemDetail(problemId: string) {
    const res = await this.get(`/problem/${problemId}`);
    return res as GetProblemDetailResponse;
  }

  async getMyEditorial(problemId: string) {
    const res = await this.get(`/problem/${problemId}/my-editorial`);
    return res as EditorialDetail;
  }

  async getEditorialList(problemId: string, dto: GetEditorialListQuery) {
    const res = await this.get(`/problem/${problemId}/editorial`, dto);
    return res as GetEditorialListResponse;
  }

  async updateMyEditorial(problemId: string, dto: UpdateMyEditorialRequestDto) {
    const res = await this.post(
      `/problem/${problemId}/my-editorial/update`,
      dto
    );
    return res as UpdateMyEditorialResponse;
  }

  async deleteMyEditorial(problemId: string) {
    const res = await this.post(`/problem/${problemId}/my-editorial/delete`);
    return res as DeleteMyEditorialResponse;
  }

  // EDITORIAL API
  async getEditorial(editorialId: string) {
    const res = await this.get(`/editorial/${editorialId}`);
    return res as EditorialDetail;
  }

  async editorialVote(editorialId: string, dto: EditorialVoteRequestDto) {
    const res = await this.post(`/editorial/${editorialId}/vote`, {
      action: dto.action,
    });
    return res as EditorialVoteResponse;
  }

  async getEditorialCitations(editorialId: string) {
    const res = await this.get(`/editorial/${editorialId}/citations`);
    return res as GetEditorialCitationsResponse;
  }

  // CONTEST API
  async getContestList(dto: GetContestListQuery) {
    const res = await this.get("/contest", dto);
    return res as GetContestListResponse;
  }

  async getContestDetail(contestId: string) {
    const res = await this.get(`/contest/${contestId}`);
    return res as GetContestDetailResponse;
  }

  // COMMENT API
  async getComment(commentContext: CommentContext) {
    const res = await this.get(
      `/comment/${commentContext.type}/${commentContext.id}`
    );
    return res as GetCommentResponse;
  }

  async addComment(dto: AddCommentRequestDto) {
    const res = await this.post(`/comment/add`, dto);
    return res as AddCommentResponse;
  }

  async editComment(commentId: string, dto: EditCommentRequestDto) {
    const res = await this.post(`/comment/${commentId}/edit`, dto);
    return res as EditCommentResponse;
  }

  async deleteComment(commentId: string) {
    const res = await this.post(`/comment/${commentId}/delete`);
    return res as DeleteCommentResponse;
  }

  // REFERENCE API
  async getReferenceInfoBulk(dto: GetReferenceInfoBulkRequestDto) {
    const res = await this.post(`/reference/info-bulk`, dto);
    return res as GetReferenceInfoBulkResponse;
  }
}

const cpHubClient = new CpHubClient();
export default cpHubClient;
