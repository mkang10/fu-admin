"use client";
import { getAllNotification } from "@/apis/notification";
import { RootState } from "@/redux/store";
import { NotificationItem } from "@/utils/types";
import { LinearProgress } from "@mui/material";
import { getCookie } from "cookies-next";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PagePagination from "@/components/PagePagination";
import NotificationCard from "@/components/NotificationCard";

interface PageProps {
  params: { listID: string };
}
function NotificationList({ params }: PageProps) {
  const pageNumber = params.listID;
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [notiList, setNotiList] = useState<NotificationItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const handleGetNotification = async (page: number) => {
    const access_token = getCookie("accessToken");
    try {
      if (access_token) {
        const response = await getAllNotification(access_token, page);
        setNotiList(response.data.data);
        setTotalPages(response.data.total_pages);
        setIsFetchData(false);
      }
    } catch (error) {}
  };

  const removeCheckedNoti = (notification_id: string) => {
    setNotiList((prevData: NotificationItem[]) =>
      prevData.filter(
        (blog: NotificationItem) => blog.notification_id !== notification_id
      )
    );
  };
  useEffect(() => {
    handleGetNotification(Number(pageNumber));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <main
      className={`${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
    >
      {isFetchData ? (
        <LinearProgress></LinearProgress>
      ) : (
        <div className="w-full h-full">
          <div className="mb-[40px] flex flex-col gap-5 w-full">
            <div className="w-full  ">
              <h1 className="text-black font-bold md:text-[30px] md:leading-[45px] text-2xl">
                Notification
              </h1>
            </div>
            <div className="w-full mb-5 flex flex-row justify-between gap-y-5 flex-wrap">
              {notiList.map((data) => (
                <NotificationCard
                  removeCheckedNoti={removeCheckedNoti}
                  key={data.notification_id}
                  value={data}
                ></NotificationCard>
              ))}
            </div>
            <div className="w-full flex justify-end">
              <PagePagination
                currentPage={pageNumber}
                totalPages={totalPages}
                route={"/notification/list/"}
              ></PagePagination>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default NotificationList;
