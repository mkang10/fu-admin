"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Table, Space } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import AdminModalContent from "@/components/AdminModal";
import { getAllBlogs } from "@/apis/blog"; 
import { formatDateDetail } from "@/utils/dateFormat";
import { capitalizeFirstLetter } from "@/utils/hooks";
import { BlogColumn, BlogData, ColumnItem } from "@/utils/types";


function AllBlogsPage() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [blogData, setBlogData] = useState<BlogData[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  
  const handleGetAllBlogs = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllBlogs(access_token); 
    
        const formattedData = response.data.map((item: BlogColumn) => ({
          key: item.blog_id,
          blogTitle: item.blog_title,
          author: item.author,
          category: item.category,
          status: item.status,
          created_at: formatDateDetail(item.created_at),
        }));
        console.table(formattedData)
        setBlogData(formattedData);
       
        
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };useEffect(() => {
    handleGetAllBlogs();
    console.log(blogData);

  }, []);



  const columns: ColumnsType<BlogData> = [
    {
      title: "Blog Title",
      dataIndex: "blogTitle",
      key: "blogTitle",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    
  ];

  return (
    <main
      className={`${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } absolute w-full duration-300 flex flex-col gap-[20px] right-0 top-[56px] lg:top-[64px] bottom-0 h-fit p-[20px] lg:p-[40px]`}
    >
      <div className="self-start flex flex-row sm:justify-start justify-center items-center w-full gap-2 mb-[12px]">
        <label>Search:</label>
        <input
          placeholder="Blog Title"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px] border-[1px] border-black rounded-md px-2 py-2 outline-none"
        ></input>
      </div>
      
      <Table
        bordered={true}
        columns={columns}
        dataSource={ blogData}
      ></Table>
    </main>
  );
}

export default AllBlogsPage;
