import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_KEY, LOGIN_PAGE_URL } from "../constants";
import {
  deleteServerSentAuthCookies,
  setServerSentCookie,
} from "@/actions/auth";
type setAuthTokensType = {
  accessToken: string;
};

export function useAuth() {
  const router = useRouter();

  const setAuthTokens = async ({ accessToken }: setAuthTokensType) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    await setServerSentCookie({ accessToken: accessToken });
  };
  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    deleteServerSentAuthCookies();
    router.push(`/${LOGIN_PAGE_URL}`);
  };
  const redirectLoggedInUser = () => {
    router.replace("/");
  };
  return { setAuthTokens, logOut, redirectLoggedInUser };
}
