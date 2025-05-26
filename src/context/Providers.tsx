"use client"

import { SessionProvider } from "next-auth/react";
import { useState, createContext, useContext } from "react";

const ChatContext = createContext({
    isUpdate: false,
    setUpdate: (flag: boolean) => {}
});

export const useChatContext = () => useContext(ChatContext);
export default function Providers({ children }: { children: React.ReactNode }) {
    const [isUpdate, setUpdate] = useState(false);

    return (
        <SessionProvider>
            <ChatContext.Provider value={{isUpdate, setUpdate}}>
                {children}
            </ChatContext.Provider>
        </SessionProvider>
    )
}