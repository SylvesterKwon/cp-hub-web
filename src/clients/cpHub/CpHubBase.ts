import Cookies from "js-cookie";
import { CpHubError } from "./CpHubError";

export type Query = Record<string, string | number | string[] | number[]>;

export class CpHubBaseClient {
  private baseUrl = process.env.NEXT_PUBLIC_CP_HUB_SERVER_HOST;

  private getFullUrl(path: string, query?: Query) {
    let res = `${this.baseUrl}${path}`;
    if (query) {
      const qs = Object.entries(query)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      res += `?${qs}`;
    }
    return res;
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

  protected async get(url: string, query?: Query) {
    const res = await fetch(this.getFullUrl(url, query), {
      method: "GET",
      credentials: "include",
      headers: this.getHeader(),
    });
    const text = await res.text();
    const resBody = text ? JSON.parse(text) : null;
    if (!res.ok) throw new CpHubError(resBody);
    return resBody;
  }

  protected async post(url: string, reqBody?: object) {
    const res = await fetch(this.getFullUrl(url), {
      method: "POST",
      credentials: "include",
      body: reqBody ? JSON.stringify(reqBody) : undefined,
      headers: this.getHeader(),
    });
    const text = await res.text();
    const resBody = text ? JSON.parse(text) : null;
    if (!res.ok) throw new CpHubError(resBody);
    return resBody;
  }
}
