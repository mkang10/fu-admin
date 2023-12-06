"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function Home() {
  const isCollapsed = useSelector((state: RootState) => state.app.isCollapsed);
  return (
    <main
      className={` absolute sm:w-full h-full ${
        isCollapsed ? "lg:w-[calc(100%-90px)]" : "lg:w-[calc(100%-200px)]"
      } flex flex-col justify-center duration-300 right-0 top-[64px] bottom-0 `}
    >
      <div className="w-full h-full flex justify-center items-center  ">
        <h1 className="text-4xl font-bold">
          Welcome to FU BLOG Community Admin Page!!
        </h1>
      </div>
    </main>
  );
}

export default Home;
