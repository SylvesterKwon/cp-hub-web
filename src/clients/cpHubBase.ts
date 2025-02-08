import {
  EmailAlreadyExistsError,
  UnauthenticatedError,
  UsernameAlreadyExistsError,
} from "@/app/errors/user.error";
import Cookies from "js-cookie";

export class CpHubBaseClient {
  private baseUrl = "http://localhost:3000"; // TODO: Move to env

  private getFullUrl(path: string) {
    return `${this.baseUrl}${path}`;
  }

  private getAccessToken() {
    // TODO: server action 인 경우 js-cookie 대신 next/headers 사용하도록 수정
    const accessToken = Cookies.get("accessToken");
    return accessToken;
  }

  // TODO: Request that do not use default header should be able to specify header
  private getHeader() {
    const header: HeadersInit = {
      "Content-Type": "application/json",
    };
    const accessToken = this.getAccessToken();
    if (accessToken) {
      header.Authorization = `bearer ${accessToken}`;
    }
    return header;
  }

  private handleError(resBody: { errorCode?: string }) {
    if (resBody?.errorCode === "RECRIT:USER:UNAUTHENTICATED")
      throw new UnauthenticatedError();
    else if (resBody?.errorCode === "RECRIT:USER:USERNAME_ALREADY_EXISTS")
      throw new UsernameAlreadyExistsError();
    else if (resBody?.errorCode === "RECRIT:USER:EMAIL_ALREADY_EXISTS")
      throw new EmailAlreadyExistsError();
  }

  protected async get(url: string) {
    const res = await fetch(this.getFullUrl(url), {
      method: "GET",
      credentials: "include",
      headers: this.getHeader(),
    });
    const resBody = await res.json();
    this.handleError(resBody);
    return resBody;
  }

  protected async post(url: string, reqBody?: object) {
    const res = await fetch(this.getFullUrl(url), {
      method: "POST",
      credentials: "include",
      body: reqBody ? JSON.stringify(reqBody) : undefined,
      headers: this.getHeader(),
    });
    const resBody = await res.json();
    this.handleError(resBody);
    return resBody;
  }
}
