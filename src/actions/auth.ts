"use server";

import { ACCESS_TOKEN_KEY } from "@/constants";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function setServerSentCookie({
  accessToken,
}: {
  accessToken: string;
}) {
  const decodedToken: any = jwtDecode(accessToken);
  const expiresAt = new Date(decodedToken?.exp * 1000);
  cookies().set(ACCESS_TOKEN_KEY, accessToken, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteServerSentAuthCookies() {
  cookies().delete(ACCESS_TOKEN_KEY);
}
