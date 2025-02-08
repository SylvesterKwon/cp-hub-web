import ButtonLink from "@/components/ButtonLink";
import { getUserInfo } from "../stores/userCookieStore";
import SignInButton from "./SignInButton";

export default async function AppBarUserInfo() {
  const userInfo = await getUserInfo();

  return userInfo ? (
    `Welcome ${userInfo.username}`
  ) : (
    <>
      <SignInButton />
      <ButtonLink
        href="/register"
        size="small"
        variant="outlined"
        color="inherit"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        Register
      </ButtonLink>
    </>
  );
}
