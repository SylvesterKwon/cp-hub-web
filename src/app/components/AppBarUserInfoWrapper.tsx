import { getUserInfo } from "../stores/userCookieStore";
import AppBarUserInfo from "./AppBarUserInfo";

export default async function AppBarUserInfoWrapper() {
  // Get user info from server with cookie
  const serverUserInfo = await getUserInfo();

  return <AppBarUserInfo initialUserInfo={serverUserInfo} />;
}
