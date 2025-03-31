import SignInForm from "@/components/form/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SignIn | Donations Tracking System",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
