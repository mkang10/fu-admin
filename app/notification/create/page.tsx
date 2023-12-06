"use client";
import React, { useState } from "react";
import BackIcon from "@icons/page/blog/backIcon.svg";
import "@/app/globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import EditorNotification from "@component/EditorNotification";
import { getCookie } from "cookies-next";
import axios from "axios";
import { toast } from "react-toastify";
import ModifyButton from "@component/ModifyButton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import BrowseImage from "@/components/BrowseMedia";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
function EditBlog() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [notiTitle, setNotiTitle] = useState<string>("");
  const [importedImage, setImportedImage] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | undefined | null>(null);
  const [htmlString, setHtmlStringg] = useState<string>("");
  const router = useRouter();
  const handleCreateNotification = async () => {
    const access_token = getCookie("accessToken");
    const user_id = getCookie("user_id");
    try {
      if (access_token && user_id) {
        const newNotification = {
          user_id: user_id,
          notification_title: notiTitle,
          content: htmlString,
          image: imageURL,
        };
        socket.emit("new-notification", newNotification);
        toast.success("Notification posted! ");
        setTimeout(() => {
          router.push("/notification/list/1");
        }, 500);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log(err);
      }
    }
  };

  return (
    <main
      className={`${isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
        } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
    >
      <div className="w-full flex items-center justify-between">
        <h1 className=" relative md:text-[30px] md:leading-[45px] text-3xl  font-bold select-none">
          Create Notification
        </h1>
        <div
          onClick={() => router.back()}
          className="flex items-center gap-[6px] cursor-pointer hover:gap-[10px] duration-300"
        >
          <Image
            src={BackIcon}
            className="md:h-[20px] md:w-[20px] w-[16px] h-[16px]"
            height={20}
            width={20}
            alt="Back"
          ></Image>
          <div className="text-[#707070] text-base md:text-xl md:leading-[24px] font-medium ">
            Go Back
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <div className="w-full flex flex-col gap-2">
          <h3 className="text-base text-black font-medium">
            Notification&#39;s Title:
          </h3>
          <input
            onChange={(e) => setNotiTitle(e.target.value)}
            type="text"
            placeholder="Write title here"
            className="border-2 px-3 py-3 outline-[#0066B2] border-gray-300 rounded-[12px] w-full"
          />
        </div>
      </div>
      <div>
        <BrowseImage
          formTitle="Your image or video"
          fileStorage={importedImage}
          setFileStorage={setImportedImage}
          setFileURL={setImageURL}
          page="create_blog"
        ></BrowseImage>
      </div>
      <div>
        <EditorNotification
          formTitle="Your content"
          htmlString={htmlString}
          setHtmlString={setHtmlStringg}
          pageName="create_notification"
        ></EditorNotification>
      </div>

      <div className="mt-[12px] flex flex-row justify-between">
        <div>
          <ModifyButton
            textContent={"Publish Notification"}
            icon={"public"}
            iconPosition={"left"}
            backgroundColor={"bg-blue-700"}
            method={() => {
              handleCreateNotification();
            }}
            tailwind={"text-white"}
          ></ModifyButton>
        </div>
      </div>
    </main>
  );
}

export default EditBlog;
