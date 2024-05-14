import { cookies } from "next/headers";
import { ACCESS_TOKEN_KEY, LOGIN_PAGE_URL } from "../constants";
import { RedirectType, redirect } from "next/navigation";
import { isTokenValid } from "../utils";

const ProtectedRoute = async ({ children }: any) => {
  const accessTokenCookie = cookies().get(ACCESS_TOKEN_KEY);
  const accessToken = accessTokenCookie?.value;

  if (accessToken) {
    const validToken = isTokenValid(accessToken);
    if (validToken) {
    } else {
      redirect(`/${LOGIN_PAGE_URL}`, RedirectType.replace);
    }
  } else {
    redirect(`/${LOGIN_PAGE_URL}`, RedirectType.replace);
  }

  return <>{children}</>;
};

export default ProtectedRoute;
