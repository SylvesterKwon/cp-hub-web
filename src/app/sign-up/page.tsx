import { Metadata } from "next";
import SignUpPageContent from "./SignUpPageContent";

export const metadata: Metadata = {
  title: "Sign Up - CP hub",
  description: "Sign Up - CP hub",
};

export default function SignUpPage() {
  return <SignUpPageContent />;
}
