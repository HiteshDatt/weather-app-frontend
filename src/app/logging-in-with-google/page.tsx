"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function LoggingInWithGoogle({ searchParams }: any) {
  const { redirectLoggedInUser, setAuthTokens } = useAuth();

  useEffect(() => {
    async function login() {
      const accessToken = searchParams?.token;
      await setAuthTokens({ accessToken: accessToken });
      redirectLoggedInUser();
    }
    if (searchParams?.token) {
      login();
    }
  }, [redirectLoggedInUser, searchParams?.token, setAuthTokens]);

  return <div>Logging in...</div>;
}
