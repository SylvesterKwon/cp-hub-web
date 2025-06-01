import { Metadata } from "next";
import SignUpPageContent from "./SignUpPageContent";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sign Up - CP hub",
  description: "Sign Up - CP hub",
};

export default function SignUpPage() {
  return (
    <Suspense>
      <SignUpPageContent />
    </Suspense>
  );
}
