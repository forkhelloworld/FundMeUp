"use server";

import { signIn } from "@/auth";

export async function signInWithGoogle(callbackUrl: string) {
  // signIn will redirect to Google OAuth, then back to callbackUrl
  await signIn("google", {
    redirectTo: callbackUrl,
  });
}

export async function signInWithCredentials(
  email: string,
  password: string,
  callbackUrl: string
) {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return { error: result.error };
  }

  if (result?.ok) {
    return {
      ok: true,
      redirectUrl: result.url || callbackUrl,
    };
  }

  return { error: "Unknown error occurred" };
}
