"use client";
import ButtonLink from "@/components/ButtonLink";
import { usePathname } from "next/navigation";

export default function SignInButton() {
  const pathname = usePathname();
  return (
    <ButtonLink
      href={`/sign-in/?redirect=${pathname}`}
      size="small"
      variant="outlined"
      color="inherit"
      sx={{ display: { xs: "none", md: "block" } }}
    >
      Sign in
    </ButtonLink>
  );
}
