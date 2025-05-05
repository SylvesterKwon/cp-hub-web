"use client";
import ButtonLink from "@/components/ButtonLink";
import SignInButton from "./SignInButton";
import { useUserStore } from "../stores/userStore";
import { Avatar, Stack } from "@mui/material";

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
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar
        sx={{ width: 36, height: 36 }}
        alt={userInfo.username}
        src={clientUserInfo?.profilePictureUrl}
      />
      <div>{userInfo.username}</div>
    </Stack>
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
