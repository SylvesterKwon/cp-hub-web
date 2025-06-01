import { Suspense } from "react";
import { Metadata } from "next";
import SignInPageContent from "./SignInPageContent";

export const metadata: Metadata = {
  title: "Sign In - CP hub",
  description: "Sign In - CP hub",
};

export default function SignInPage() {
  return (
    <Suspense>
      <SignInPageContent />
    </Suspense>
  );
}
