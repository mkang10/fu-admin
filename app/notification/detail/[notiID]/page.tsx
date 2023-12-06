"use client";
import React, { useState, useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { NotificationItem } from "@/utils/types";
import Image from "next/image";
import { ClockCircleOutlined } from "@ant-design/icons";
import sampleImage from "@image/blogSample.png";
import { formatDateDetail } from "@/utils/dateFormat";
import BackIcon from "@icons/page/blog/backIcon.svg";
import { LinearProgress } from "@mui/material";
import { getCookie } from "cookies-next";
import { getNotificationDetail } from "@/apis/notification";
function NotificationDetail() {
  const [notificationData, setNotificationData] = useState<NotificationItem>();
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const params = useParams();
  const notification_id = params.notiID as string;
  const router = useRouter();
  const handleGetDetail = async () => {
    const access_token = getCookie("accessToken");
    try {
      if (access_token) {
        console.log(notification_id);
        const response = await getNotificationDetail(
          notification_id,
          access_token
        );
        setNotificationData(response.data);
        setIsFetching(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main
      className={`absolute ${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } flex flex-col gap-[20px] duration-300 right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
    >
      {isFetching ? (
        <LinearProgress></LinearProgress>
      ) : (
        <div className="w-full">
          <div className="w-full mb-10 flex items-center justify-between">
            <h1 className=" w-4/5 text-3xl font-bold select-none">Preview</h1>
            <div
              onClick={() => router.back()}
              className=" w-1/5 flex justify-end items-center gap-[6px] cursor-pointer hover:gap-[10px] duration-300"
            >
              <Image
                src={BackIcon}
                className="md:h-[20px] md:w-[20px] w-[16px] h-[16px]"
                height={18}
                width={18}
                style={{
                  width: "auto",
                  height: "auto",
                }}
                alt="Back"
              ></Image>
              <div className="text-gray-500 text-base md:text-lg font-medium ">
                Go back
              </div>
            </div>
          </div>
          <div className="w-full h-full p-5 flex flex-col gap-4 rounded-[10px]  border-[2px]">
            <h1 className="w-full font-bold  text-3xl">
              {notificationData?.title}
            </h1>
            <div className="w-full  flex items-center  gap-[10px]">
              <ClockCircleOutlined />
              <div className="text-gray-500 cursor-default text-base font-normal">
                {notificationData?.created_at &&
                  formatDateDetail(notificationData?.created_at)}
              </div>
            </div>
            {/* Content */}
            <div className="w-full flex items-center object-cover flex-col gap-4">
              <div className=" relative max-w-[1200px] w-full h-[500px] ">
                <Image
                  className="object-contain"
                  fill
                  priority
                  src={notificationData?.image ?? sampleImage}
                  alt="image of notification"
                ></Image>
              </div>
              <div
                className="w-full text-justify"
                dangerouslySetInnerHTML={{
                  __html: notificationData?.content as string,
                }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default NotificationDetail;
