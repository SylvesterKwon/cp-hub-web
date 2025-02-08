"use client";
import ButtonLink from "@/components/ButtonLink";
import SignInButton from "./SignInButton";
import { useUserStore } from "../stores/userStore";

type AppBarUserInfoProps = {
  initialUserInfo?: {
    id?: string;
    username?: string;
  };
};
export default function AppBarUserInfo(props: AppBarUserInfoProps) {
  const clientUserInfo = useUserStore((state) => state.userInfo);
  // Use client info if available else use server info
  const userInfo = clientUserInfo || props.initialUserInfo;

  return userInfo ? (
    `Welcome ${userInfo.username}`
  ) : (
    <>
      <SignInButton />
      <ButtonLink
        href="/sign-up"
        size="small"
        variant="outlined"
        color="inherit"
        sx={{ display: { xs: "none", md: "block" } }}
      >
        Sign up
      </ButtonLink>
    </>
  );
}
