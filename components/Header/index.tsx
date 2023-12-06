"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Logo from "@/assets/icons/logo/logo.svg";
import DefaultAvatar from "@/assets/icons/header/defaultAvatar.svg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { UserInfo } from "@/utils/types";
import { toogleIsCollapsed } from "@/redux/slices/app";
import { getCookie } from "cookies-next";
import { getMemberInfo } from "@/apis/profile";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { Button } from "antd";
import { logout } from "@/redux/slices/user";
import { useRouter } from "next/navigation";
function Header(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userData, setUserData] = useState<UserInfo>();
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const handleOpenMenu = (): void => {
    dispatch(toogleIsCollapsed());
  };
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/sign-in");
  };

  const handleGetUserProfile = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const userId = getCookie("user_id");
        if (userId) {
          const response = await getMemberInfo(userId, access_token);
          const data = response.data;
          setUserData(data);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetUserProfile();
  }, []);
  const userName = userData?.email?.split("@")[0];
  const fullName =
    userData?.last_name && userData?.first_name
      ? `${userData.last_name} ${userData.first_name}`
      : userName;

  return (
    <div className="top-0 left-0 right-0 w-full fixed z-[1] bg-[#ffffff] backdrop-blur-sm border-b-[1px] border-b-[#E8EBED]">
      <div className="w-full mx-auto h-[56px] lg:h-[64px] px-[20px]  flex justify-between items-center">
        <div className="flex flex-row gap-5 items-center">
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            type="default"
            onClick={handleOpenMenu}
          >
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Link href="/">
            <Image
              priority={true}
              src={Logo}
              width={100}
              height={100}
              className="h-[28px] w-auto hidden lg:block"
              alt="Logo of author"
            />
          </Link>
        </div>
        <div className="flex items-center h-[46px] gap-[16px] cursor-pointer">
          <div className="relative items-center hidden lg:flex hover:bg-[#F5F5F5] shadow-md gap-[10px] px-[12px] py-[4px] lg:px-[20px] lg:py-[8px] border-[1px] border-[#E8EBED] rounded-[40px]">
            {isLoading ? (
              <div className="w-[150px]">
                <Skeleton
                  sx={{ bgcolor: "grey.100" }}
                  variant="rectangular"
                  height={20}
                ></Skeleton>
              </div>
            ) : (
              <div className="text-[#14375F] h-[19px] leading-[19px] text-base font-medium">
                {fullName}
              </div>
            )}
            <div className="flex items-center gap-[5px]">
              {isLoading ? (
                <div className="rounded-[50%] overflow-hidden">
                  <Skeleton
                    height={30}
                    width={30}
                    variant="rounded"
                    sx={{ bgcolor: "grey.100" }}
                  ></Skeleton>
                </div>
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={
                    userData?.image == null ? DefaultAvatar : userData?.image
                  }
                  alt="Profile Image"
                  className="w-[30px] rounded-[50%] h-[30px] object-cover"
                />
              )}
            </div>
          </div>
          <div
            onClick={handleLogout}
            className="px-2 hover:opacity-80 font-medium text-black"
          >
            Log out
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
