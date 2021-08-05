import JwtDecode from "jwt-decode";
export const getCheckIsTokenExpired = (token: string | undefined): boolean => {
  if (token === undefined || token === null) {
    return true;
  } else {
    if (token && JwtDecode(token)) {
      // @ts-ignore
      const expiry = JwtDecode(token).exp;
      const now = new Date();
      return now.getTime() > expiry * 1000;
      // will return true
    }
    return false;
  }
};
