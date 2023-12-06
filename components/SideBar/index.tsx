"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { BellOutlined, UserOutlined, HomeOutlined, AppstoreOutlined, } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { setCurrentPage } from "@/redux/slices/app";

type MenuItem = Required<MenuProps>["items"][number];

function Sidebar(): JSX.Element {
  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  };
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const current = useSelector((state: RootState) => state.app.currentPage);
  console.log(current);
  const router = useRouter();
  const dispatch = useDispatch();
  const items: MenuItem[] = [
    getItem("Home", "/", <HomeOutlined />),

    getItem("Notification", "sub1", <BellOutlined />, [
      getItem("View Notifications", "/notification/list/1"),
      getItem("Create Notification", "/notification/create"),
    ]),
    getItem("Blog", "sub3", <AppstoreOutlined />, [
      getItem("List Blog", `/blog/allblog`),
     

      
    ]),

    getItem("Members", "sub2", <UserOutlined />, [
      getItem("Member List", `/members/list`),
      getItem("Students List", `/members/students`),
      getItem("Mentors List", `/members/mentors`),
    ]),
  ];
  const onClick: MenuProps["onClick"] = (e) => {
    dispatch(setCurrentPage(e.key));
    router.push(e.key);
  };
  return (
    <div
      className={`${
        isCollapsed ? "w-[90px]" : "w-[200px]"
      } fixed top-[56px] left-0 md:top-[64px] bg-white border-t-[1px] hidden lg:flex flex-col py-[20px] items-center z-40  h-screen border-r-[1px] select-none border-[#E8EBED]`}
    >
      <Menu
        onClick={onClick}
        style={{ border: "none" }}
        defaultSelectedKeys={[current]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="light"
        inlineCollapsed={isCollapsed}
        items={items}
      />
    </div>
  );
}

export default Sidebar;
