import React from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRouter } from "next/navigation";

interface PProps {
  totalPages: number;
  currentPage: string;
  route: string;
}

const itemRender: PaginationProps["itemRender"] = (
  _,
  type,
  originalElement
) => {
  if (type === "prev") {
    return <a>Previous</a>;
  }
  if (type === "next") {
    return <a>Next</a>;
  }
  return originalElement;
};

const PagePagination: React.FC<PProps> = ({
  totalPages,
  currentPage,
  route,
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    let newPage = parseInt(currentPage);

    if (page === newPage + 1) {
      newPage++;
    } else if (page === newPage - 1) {
      newPage--;
    }

    router.push(`${route}${newPage}`);
  };

  return (
    <Pagination
      current={parseInt(currentPage)}
      onChange={handlePageChange}
      defaultCurrent={1}
      total={totalPages * 6}
      itemRender={itemRender}
    />
  );
};

export default PagePagination;
