import SignUpForm from "@/components/form/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignUp | Donations Tracking System",
  description: "This is Next.js SignUp Page TailAdmin Dashboard Template",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
