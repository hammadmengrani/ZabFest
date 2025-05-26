"use client";
import React, { useEffect, useState } from "react";
import { getChats, deletechat } from "@/graphql/gpt";
import Link from "next/link";
import { useChatContext } from "@/context/Providers";
import { signOut, useSession } from "next-auth/react";
import { useParams } from "next/navigation";




const SideBar = () => {
  const [sideBar, setSideBar] = useState(true);
  const chat = useChatContext();
  const { data: session } = useSession();
  const params = useParams();
  const [chats, setChats] = useState<Array<{
    chatId: string;
    email: string;
    topic: string;
  }>>([]);
  useEffect(() => {
    getChats(String(session?.user?.email)).then((data) =>{
      setChats(data.length > 0 ? data : [])
      chat.setUpdate(false)
    });
  }, [chat.isUpdate]);

  const onDeleteChat = (chatId: string) => {
    deletechat(chatId)
    .then(() => setChats((prevChats) => prevChats.filter((chat) => chat.chatId !== chatId)))
    .catch((error) => console.error("Error deleting chat:", error));
  };

  
  return (
    <div className="sm:flex hidden relative">
      <div
        className={`h-[100vh] bg-blue-950 transition-all  duration-300 flex flex-col ${
          sideBar ? "md:w-[263px] w-[500px]" : "w-0 overflow-hidden"
        }`}
      >
        <div className="flex">
          <div className="flex flex-col items-start gap-4 rounded-r-lg w-[263px] transition-all duration-300">
            <div
              className={`text-white text-xl py-5 w-full flex flex-col gap-5 transition-all duration-300 ${sideBar ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[-10px]"}`}>
              <h3 className="px-2">Recent Chat</h3>
              <Link href={`/gpt/new`} className="bg-blue-900 text-sm py-3 px-5 md:w-full w-[500px] text-left">
                New Chat
              </Link>
            </div>
            <div className="flex flex-col gap-2 w-full h-[65vh] overflow-y-auto scrollbar-hide">
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <div className={`flex gap-2 justify-between items-center w-full text-white text-sm p-2 hover:bg-blue-800 ${chat.chatId == params.id && "bg-blue-800"} transition-all duration-300`} key={chat.chatId}>
                    <Link href={`/gpt/${chat.chatId}`}> {chat.topic}</Link>
                    {/* <button
                      className="cursor-pointer bg-red-500 text-white px-2 font-bold text-md hover:text-red-700 transition-all duration-300"
                      onClick={() => onDeleteChat(chat.chatId)}>
                        X
                      </button> */}
                  </div>
                ))
              ) : (
                <div key={0} className="text-gray-400 text-sm py-3 px-5 w-full">
                  No recent chats found.
                </div>
              )}
              </div>
              <button className="text-white bg-red-800 text-center w-full p-2 rounded-2xl" onClick={() => signOut()}>Logout</button>
          </div>
        </div>

        {/* <div className="py-4  mt-auto">
            <a
              href="/login"
              className=" flex bg-[#1F1F1F] px-5 mx-5 text-center items-center justify-center text-white py-3 rounded-lg hover:bg-[#303030] transition-all duration-300"
            >
              Logout
            </a>
        </div> */}
      </div>

    </div>
  );
};

export default SideBar;
