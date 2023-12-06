"use client";
import React, { MouseEventHandler } from "react";
import Image from "next/image";
import Link from "next/link";
import editIcon from "@icons/components/Button/pencil-alt.svg";
import delectIcon from "@icons/components/Button/delect.svg";
import addUserIcon from "@icons/components/Button/user-add.svg";
import arrowLeftIcon from "@icons/components/Button/arrow-narrow-left.svg";
import arrowRightIcon from "@icons/components/Button/arrow-right.svg";
import uploadIcon from "@icons/components/Button/cloud-upload.svg";
import importIcon from "@icons/components/Button/save.svg";
import searchIcon from "@icons/components/Button/search-outline.svg";
import paperAirline from "@icons/components/Button/paper-airplane.svg";

interface buttonProps {
  textContent: string;
  icon:
    | "edit"
    | "delete"
    | "add"
    | "arrowLeft"
    | "arrowRight"
    | "upload"
    | "import"
    | "search"
    | "public"
    | "";
  iconPosition: "left" | "right";
  backgroundColor: string;
  href: string;
  tailwind: string;
}

function Button({
  textContent,
  icon,
  iconPosition,
  backgroundColor,
  href,
  tailwind,
}: buttonProps) {
  return (
    <button
      className={`rounded-[8px] w-fit flex items-center justify-between px-[12px] py-[8px] text-[12px] ${backgroundColor} ${tailwind}`}
    >
      <Link
        href={href}
        className="flex gap-[8px]"
        style={{
          flexDirection: iconPosition === "left" ? "row" : "row-reverse",
        }}
      >
        {icon === "" ? null : (
          <Image
            src={
              icon === "edit"
                ? editIcon
                : icon === "delete"
                ? delectIcon
                : icon === "add"
                ? addUserIcon
                : icon === "arrowLeft"
                ? arrowLeftIcon
                : icon === "arrowRight"
                ? arrowRightIcon
                : icon === "upload"
                ? uploadIcon
                : icon === "import"
                ? importIcon
                : icon === "search"
                ? searchIcon
                : icon === "public"
                ? paperAirline
                : ""
            }
            alt={icon}
            style={{
              width: "20px",
              height: "20px",
            }}
          />
        )}
        <p className="text-white">{textContent}</p>
      </Link>
    </button>
  );
}

export default Button;
