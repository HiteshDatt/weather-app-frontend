import { deleteServerSentAuthCookies } from "@/actions/auth";
import { ACCESS_TOKEN_KEY } from "./constants";
import { jwtDecode } from "jwt-decode";

export function isTokenValid(token: string | null) {
  if (token) {
    try {
      let decodedToken = jwtDecode(token);
      let currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken?.exp && decodedToken?.exp > currentTime) {
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  return false;
}

export const fetchWithToken = (url: string, options: any = {}) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const validToken = isTokenValid(accessToken);
  if (!validToken && typeof window !== "undefined") {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    deleteServerSentAuthCookies();
    window.location.href = "/login-account";
  }
  options.headers = {
    ...options.headers,
    Authorization: `JWT ${accessToken}`,
  };

  return fetch(url, options);
};
