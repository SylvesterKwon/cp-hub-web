"use client";
import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";
import { SignUpForm } from "../types/user";
import { useUserStore } from "../stores/userStore";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CpHubError, CpHubErrorCode } from "@/clients/cpHub/CpHubError";
import { setFormError } from "@/utils/setFormError";

export default function SignUpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const formContext = useForm<SignUpForm>();
  const userInfo = useUserStore((state) => state.userInfo);
  const signUp = useUserStore((state) => state.signUp);

  if (userInfo) redirect("/");
  async function handleSubmit(data: SignUpForm) {
    try {
      await signUp(data);
      const redirectPathname = searchParams.get("redirect") || "/";
      router.push(redirectPathname);
    } catch (e) {
      if (
        e instanceof CpHubError &&
        e.errorCode === CpHubErrorCode.VALIDATION_FAILED
      )
        setFormError(formContext, e);
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Stack direction="column" spacing={2}>
          <Typography variant="h4" sx={{ margin: 20 }}>
            Sign up
          </Typography>
          <FormContainer<SignUpForm>
            formContext={formContext}
            onSuccess={handleSubmit}
          >
            <Stack direction="column" spacing={2} sx={{ marginBottom: 2 }}>
              <TextFieldElement
                name="username"
                label="Username"
                autoComplete="username"
                fullWidth
                required
              />
              <TextFieldElement
                name="email"
                label="Email"
                autoComplete="email"
                type="email"
                fullWidth
                required
              />
              <Stack direction="row" spacing={2}>
                <TextFieldElement
                  name="password"
                  label="Password"
                  autoComplete="new-password"
                  type="password"
                  helperText="Use 8 or more characters with a mix of lower/uppercase letters, numbers & symbols"
                  fullWidth
                  required
                />
                <TextFieldElement
                  name="passwordConfirmation"
                  label="Confirm"
                  type="password"
                  helperText="Confirm your password"
                  fullWidth
                  required
                />
              </Stack>
              <Button type="submit" fullWidth variant="contained">
                Sign up
              </Button>
              <Typography variant="body2">
                Already have an account? <Link href="/sign-in">Sign in</Link>
              </Typography>
            </Stack>
          </FormContainer>
        </Stack>
      </Paper>
    </Container>
  );
}
