"use client";
import React, { useState } from "react";
import Image from "next/image";

const SideBar = () => {
  const [sideBar, setSideBar] = useState(true);

  return (
    <div className="sm:flex hidden relative">
      <div
        className={`h-[100vh] bg-blue-950 transition-all  duration-300 flex flex-col ${
          sideBar ? "md:w-[263px] w-[500px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex-1">
          <div className="flex flex-col items-start gap-4 rounded-r-lg w-[263px] transition-all duration-300">
            <div
              className={`text-white text-xl py-5 w-full flex flex-col gap-5 transition-all duration-300 ${
                sideBar
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-[-10px]"
              }`}
            >
              <h3 className="px-2">Recent Chat</h3>
              <button className="bg-blue-900 text-sm py-3 px-5 md:w-full w-[500px] text-left">
                New Chat
              </button>
            </div>
          </div>
        </div>

        <div className="py-4  mt-auto">
            <a
              href="/login"
              className=" flex bg-[#1F1F1F] px-5 mx-5 text-center items-center justify-center text-white py-3 rounded-lg hover:bg-[#303030] transition-all duration-300"
            >
              Login
            </a>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
