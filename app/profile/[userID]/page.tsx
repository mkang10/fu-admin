/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { LinearProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { ProfileData, UserSetting } from "@/utils/types";
import { getCookie } from "cookies-next";
import sampleAvatar from "@image/sampleImage.png";
import { getMemberInfo } from "@/apis/members";
import Image from "next/image";
import { BranchesOutlined } from "@ant-design/icons";
import { formatDateToMMDDYYYY } from "@/utils/dateFormat";
type pageProps = {
  params: { userID: string };
};
function Profile({ params }: pageProps) {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [userData, setUserData] = useState<ProfileData>();
  const renderHtmlString = (htmlString: string) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>;
  };
  const handleGetUserData = async () => {
    const access_token = getCookie("accessToken");
    try {
      if (access_token && params.userID) {
        const response = await getMemberInfo(params.userID, access_token);
        setUserData(response.data);
        setIsFetching(false);
      }
    } catch (error) {}
  };
  useEffect(() => {
    handleGetUserData();
  }, []);
  console.log(userData);
  return (
    <main
      className={`absolute ${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } flex flex-col gap-[20px] duration-300 right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
    >
      {isFetching ? (
        <LinearProgress></LinearProgress>
      ) : (
        <div className="w-full h-full flex flex-col gap-5">
          <div>
            <h2 className="text-[24px] font-[700]">
              <span className="text-blue-500">
                {userData?.fullName ?? "Unnamed"}
                &apos;s
              </span>{" "}
              Profile
            </h2>
          </div>
          <div className="w-full flex flex-row justify-between">
            <div className="w-[calc(32%-8px)] gap-4">
              <div className="w-[100%] border-2 shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <div className="w-[120px] h-[120px] relative object-cover overflow-hidden rounded-[16px]">
                    <Image
                      src={userData?.image ?? sampleAvatar}
                      alt="avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h1 className="text-[24px] font-[700]">
                    {userData?.fullName ?? "Unamed"}
                  </h1>
                </div>
                <div className="flex flex-col gap-[8px] ">
                  <div className="flex flex-row gap-[12px]">
                    <BranchesOutlined />
                    <span className="font-[400] text-[16px]">
                      {userData?.position ?? "Not set yet"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <span className="font-[400] text-[16px]">
                      Email address:
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <span className="font-[700] text-[16px]">
                      {userData?.email ?? "Not set yet"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[calc(68%-8px)] gap-4">
              <div className="w-[100%] border-2 shadow-primary rounded-[16px] p-[32px] flex flex-col gap-[20px]">
                <div>
                  <h3 className="font-[700] text-[24px]">
                    General information
                  </h3>
                </div>
                <div className="flex flex-col gap-[8px]">
                  <h4 className="font-[600] text-[20px]">About me</h4>
                  <div
                    className="font-[400] text-[16px] text-justify"
                    id="aboutMember"
                  >
                    {userData?.bio
                      ? renderHtmlString(userData.bio)
                      : "Not set bio yet"}
                  </div>
                </div>
                <div className="flex flex-row gap-[80px]">
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Department:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.department === null
                            ? "Not set yet"
                            : userData?.department}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">Position</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.position === null
                            ? "Not set yet"
                            : userData?.position}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[20px]">
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">Major</span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {userData?.major === null
                            ? "Not set yet"
                            : userData?.major}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-row">
                        <span className="font-[400] text-[16px]">
                          Join Date:
                        </span>
                      </div>
                      <div className="flex flex-row">
                        <span className="font-[700] text-[16px]">
                          {formatDateToMMDDYYYY(userData?.created_at!)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Profile;
