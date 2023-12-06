import { getCookie } from "cookies-next";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { refreshUserInfoFromStorage } from "@/redux/slices/user";

type EncodeType = {
  email: string;
  UserRole: number;
  sub: string;
  firstName: string;
};

function AppProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const getUserFromCookies = () => {
    const access_token = getCookie("accessToken");
    if (access_token) {
      const decoded: EncodeType = jwtDecode(access_token);
      const user = {
        email: decoded.email,
        UserRole: decoded.UserRole,
        sub: decoded.sub,
        firstName: decoded.firstName,
      };
      return user;
    }
    return null;
  };
  useEffect(() => {
    const userFromCookies = getUserFromCookies();
    if (userFromCookies) {
      dispatch(refreshUserInfoFromStorage(userFromCookies));
    }
  }, [dispatch]);

  return <>{children}</>;
}

export default AppProvider;
