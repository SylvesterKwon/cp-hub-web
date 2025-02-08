"use client";
import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import {
  CheckboxElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { SignInForm } from "../types/user";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useUserStore } from "../stores/userStore";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const userInfo = useUserStore((state) => state.userInfo);
  const signIn = useUserStore((state) => state.signIn);
  if (userInfo) redirect("/");
  const formContext = useForm<SignInForm>();

  async function handleSubmit(data: SignInForm) {
    try {
      await signIn(data);
      const redirectPathname = searchParams.get("redirect") || "/";
      router.push(redirectPathname);
    } catch (e) {
      if (
        e instanceof CpHubError &&
        e.errorCode === CpHubErrorCode.UNAUTHORIZED
      ) {
        formContext.setError("email", {
          message: "Invalid email or password",
        });
        formContext.setError("password", {});
      }
    }
  }
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" gutterBottom>
            Sign in
          </Typography>
          <FormContainer<SignInForm>
            formContext={formContext}
            onSuccess={handleSubmit}
          >
            <Stack direction="column" spacing={2} sx={{ marginBottom: 2 }}>
              <TextFieldElement
                name="email"
                label="Email"
                autoComplete="email"
                type="email"
                fullWidth
                required
              />
              <TextFieldElement
                name="password"
                label="Password"
                autoComplete="password"
                type="password"
                fullWidth
                required
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <CheckboxElement name="rememberMe" label="Remember me" />
                <Link href="/forgot-password">Forgot password?</Link>
              </Stack>

              <Button type="submit" fullWidth variant="contained">
                Sign in
              </Button>
            </Stack>
          </FormContainer>

          <Divider>or</Divider>
          <Button type="submit" fullWidth variant="contained">
            Sign in with Google (WIP)
          </Button>
          <Button type="submit" fullWidth variant="contained">
            Sign in with Github (WIP)
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
