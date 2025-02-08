"use client";
import { Button } from "@mui/material";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

export default function RegisterPage() {
  return (
    <FormContainer
      defaultValues={{ name: "" }}
      onSuccess={(data) => console.log(data)}
    >
      <TextFieldElement
        name="username"
        label="Username"
        autoComplete="username"
        required
      />
      <TextFieldElement
        name="email"
        label="Email"
        autoComplete="email"
        type="email"
        required
      />
      <TextFieldElement
        name="password"
        label="Password"
        autoComplete="new-password"
        type="password"
        required
      />
      <TextFieldElement
        name="confirmPassword"
        label="ConfirmPassword"
        type="password"
        required
        // validation 추가
      />
      <Button type="submit" fullWidth variant="contained">
        Register
      </Button>
    </FormContainer>
  );
}
