import SignInForm from "@/components/form/SignInForm";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "SignIn | Donations Tracking System",
  description: "This is Next.js Signin Page TailAdmin Dashboard Template",
};

export default async function SignIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  console.log("Inside signin, if token exists, redirect ::: ", token);

  if (token) {
    // Redirect authenticated users to the homepage
    redirect('/');
  }
  return <SignInForm />;
}
