import dayjs from "dayjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeAccessToken } from "./utils/decodeAccessToken";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check jwt expiration
  const accessToken = request.cookies.get("accessToken")?.value;
  if (accessToken) {
    const jwtPayload = decodeAccessToken(accessToken);
    if (dayjs.unix(jwtPayload.exp).isBefore(dayjs())) {
      response.cookies.delete("accessToken");
      response.cookies.delete("userId");
      response.cookies.delete("username");
    }
  }
  return response;
}
