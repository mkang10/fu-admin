"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { getCookie } from "cookies-next";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "@icons/page/admin/deleteIcon.svg";
import EditIcon from "@icons/page/admin/editIcon.svg";
import { deleteUser, getAllMentors } from "@/apis/members";
import { ColumnItem, DataTypeAdmin } from "@/utils/types";
import { Table, Space } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import AdminModalContent from "@/components/AdminModal";
import { capitalizeFirstLetter } from "@/utils/hooks";
import { assignModerator, unassignModerator } from "@/apis/moderator";

function MentorList() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  const [userData, setUserData] = useState<DataTypeAdmin[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<DataTypeAdmin | null>();

  const openDeleteModal = (record: DataTypeAdmin) => {
    setSelectedUser(record);
    setIsOpenDeleteModal(true);
  };

  const [isOpenAssignModal, setIsOpenAssignModal] = useState<boolean>(false);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState<boolean>(false);
  const openEditModal = (record: DataTypeAdmin) => {
    setSelectedUser(record);
    if (record.moderateStatus === "Verified") {
      setIsOpenRemoveModal(true);
    } else {
      setIsOpenAssignModal(true);
    }
  };
  const handleGetAllProfiles = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token) {
        const response = await getAllMentors(access_token);
        const data = response.data;
        const formattedData = data.map((item: ColumnItem) => ({
          key: item.user_id,
          user_id: item.user_id,
          fullName: item.fullName ?? "Not created",
          email: item.email,
          role: capitalizeFirstLetter(item.role),
          department: item.department ?? "Not created",
          major: item.major ?? "Not created",
          isVerified: item.isVerified ? "Active" : "Pending",
          moderateStatus: item.moderateStatus ? "Verified" : "Not Verified",
          description: item.bio ?? "No bio yet!",
        }));
        setUserData(formattedData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    handleGetAllProfiles();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && selectedUser) {
        const response = await deleteUser(selectedUser.user_id, access_token);
        toast.success(`Deleted user ${selectedUser.email} successfully!`);
      }
      handleGetAllProfiles();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Deleting failed!");
      }
    }
    setIsOpenDeleteModal(false);
  };

  const hanldeAssignModerator = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && selectedUser) {
        const response = await assignModerator(
          selectedUser.user_id,
          access_token
        );
        toast.success(
          `Assign user ${selectedUser.email} as moderator successfully!`
        );
      }
      handleGetAllProfiles();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Deleting failed!");
      }
    }
    setIsOpenAssignModal(false);
  };

  const handleUnassignModerator = async () => {
    try {
      const access_token = getCookie("accessToken");
      if (access_token && selectedUser) {
        const response = await unassignModerator(
          selectedUser.user_id,
          access_token
        );
        toast.success(
          `Remove user ${selectedUser.email} as a moderator successfully!`
        );
      }
      handleGetAllProfiles();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        toast.error("Deleting failed!");
      }
    }
    setIsOpenRemoveModal(false);
  };

  const filteredData: DataTypeAdmin[] | undefined = userData?.filter((item) =>
    item.fullName.toLowerCase().includes(searchQuery)
  );

  const onChange: TableProps<DataTypeAdmin>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const columns: ColumnsType<DataTypeAdmin> = [
    Table.EXPAND_COLUMN,
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <div style={{ color: "#1C64F2" }}>{email}</div>,
    },
    {
      title: "Deparment",
      dataIndex: "department",
      key: "department",
      render: (text) => <div style={{ textAlign: "center" }}>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "isVerified",
      key: "isVerified",
      render: (status) => (
        <div style={{ textAlign: "center" }}>
          <span
            className="font-semibold text-sm rounded-lg uppercase py-[2px] px-[10px]"
            style={{
              color: status === "Active" ? "#03543F" : "#723B13",
              backgroundColor: status === "Active" ? "#DEF7EC" : "#FDF6B2",
            }}
          >
            {status}
          </span>
        </div>
      ),
    },
    {
      title: "Moderate Status",
      dataIndex: "moderateStatus",
      key: "moderateStatus",
      render: (_, record) => (
        <div className="flex justify-between items-center">
          {" "}
          <span
            className="font-semibold text-sm rounded-lg uppercase py-[2px] px-[10px]"
            style={{
              color:
                record.moderateStatus === "Verified" ? "#03543F" : "#9B1C1C",
              backgroundColor:
                record.moderateStatus === "Verified" ? "#DEF7EC" : "#FDE8E8",
            }}
          >
            {record.moderateStatus}
          </span>
          <div
            onClick={() => openEditModal(record)}
            className="flex px-[12px] gap-[4px] items-center cursor-pointer hover:opacity-80 rounded-lg py-[8px] bg-[#1A56DB]"
          >
            <Image src={EditIcon} alt="deleteIcon"></Image>
            <div className="text-white text-xs">Edit</div>
          </div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div
            onClick={() => openDeleteModal(record)}
            className="flex px-[12px] gap-[4px] items-center cursor-pointer hover:opacity-80 rounded-lg py-[8px] bg-red-600"
          >
            <Image src={DeleteIcon} alt="deleteIcon"></Image>
            <div className="text-white text-xs">Delete</div>
          </div>
        </Space>
      ),
    },
    {
      title: "Profile",
      key: "profile",
      render: (_, record) => (
        <Space size="middle">
          <a
            className="hover:underline"
            style={{ color: "#1C64F2" }}
            href={`/profile/${record.key}`}
          >
            View Profile
          </a>
        </Space>
      ),
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
          placeholder="User's Full Name"
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[300px] border-[1px] border-black rounded-md px-2 py-2 outline-none"
        ></input>
      </div>

      <AdminModalContent
        isOpen={isOpenDeleteModal}
        setIsOpen={setIsOpenDeleteModal}
        method={handleDeleteUser}
        selectedUser={selectedUser}
        title="Delete user"
        content="Are you sure you want to delete this user?"
        state="Delete"
      ></AdminModalContent>
      <AdminModalContent
        isOpen={isOpenAssignModal}
        setIsOpen={setIsOpenAssignModal}
        method={hanldeAssignModerator}
        selectedUser={selectedUser}
        title="Mark as moderator"
        content="Are you sure you want to assign this user as a moderator?"
        state="Edit"
      ></AdminModalContent>
      <AdminModalContent
        isOpen={isOpenRemoveModal}
        setIsOpen={setIsOpenRemoveModal}
        method={handleUnassignModerator}
        selectedUser={selectedUser}
        title="Remove moderator"
        content="Are you sure you want to remove moderator of this user ?"
        state="Delete"
      ></AdminModalContent>
      <Table
        onChange={onChange}
        bordered={true}
        columns={columns}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              {" "}
              <div
                dangerouslySetInnerHTML={{ __html: record.description }}
              ></div>
            </p>
          ),
        }}
        dataSource={searchQuery && userData ? filteredData : userData}
      ></Table>
    </main>
  );
}

export default MentorList;
