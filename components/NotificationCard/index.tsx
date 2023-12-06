"use client";
import React, { useState } from "react";
import Image from "next/image";
import sampleImage from "@image/blogSample.png";
import { ClockCircleOutlined } from "@ant-design/icons";
import Button from "@/components/Button";
import { NotificationItem } from "@/utils/types";
import { formatDateDetail } from "@/utils/dateFormat";
import { MoreOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";
import { hideNotification } from "@/apis/notification";
interface IProps {
  value: NotificationItem;
  removeCheckedNoti: (notification_id: string) => void;
}
function NotificationCard({ value, removeCheckedNoti }: IProps) {
  const maxContentLength = 150;
  const parser = new DOMParser();
  const doc = parser.parseFromString(value.content, "text/html");
  const content = doc.body.textContent || "";
  const truncatedText =
    content.length > maxContentLength
      ? content.substring(0, maxContentLength)
      : content;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleDeleteNoti = async () => {
    const access_token = getCookie("accessToken");
    try {
      if (access_token) {
        const response = await hideNotification(
          value.notification_id,
          access_token
        );
        removeCheckedNoti(value.notification_id);
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const items: MenuProps["items"] = [
    {
      label: "Delete notification",
      key: "0",
      danger: true,
      onClick: () => {
        handleDeleteNoti();
      },
    },
  ];
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-[calc(50%-10px)] rounded-[16px] overflow-hidden "
    >
      <div className="relative w-full h-[200px]">
        <Image
          loading="lazy"
          fill
          src={value.image ?? sampleImage}
          alt="notification image"
          className="object-cover"
        ></Image>
      </div>
      <div className="p-5 w-full border-[2px] border-t-0 rounded-[16px] rounded-t-none flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold">{value.title}</div>
          <div className="text-base font-normal h-[80px] overflow-hidden text-justify text-gray-500">
            {truncatedText + "...."}
          </div>
          <div className="flex gap-2">
            <ClockCircleOutlined />
            <div className="text-base font-normal text-gray-500">
              {formatDateDetail(value.created_at)}
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <Button
            textContent="Read more"
            icon="arrowRight"
            iconPosition="right"
            backgroundColor="bg-[#0066B2]"
            href={`/notification/detail/${value.notification_id}`}
            tailwind="hover:opacity-80"
          ></Button>
          {isHovered && (
            <Dropdown
              className="cursor-pointer"
              menu={{ items }}
              trigger={["click"]}
            >
              <div>
                <div className="rotate-90 p-1 bg-[#F5F5F5] rounded-[50%] flex justify-center items-center">
                  <MoreOutlined style={{ fontSize: "16px" }} />
                </div>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
