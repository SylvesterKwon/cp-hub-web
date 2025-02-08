import { decodeBase64 } from "./base64";

type JwtPayload = {
  username: string;
  sub: string;
  exp: number;
  iat: number;
};

export function decodeAccessToken(accessToken: string): JwtPayload {
  const base64Url = accessToken.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");

  return JSON.parse(decodeBase64(base64));
}
