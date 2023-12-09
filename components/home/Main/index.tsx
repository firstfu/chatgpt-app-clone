/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:50
 * @ Description: 主體內容
 */

import React from "react";
import MenuButton from "./MenuButton";
import { useAppContext } from "@/components/AppContext";
import Welcome from "./Welcome";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

type Props = {
  counter: number;
};

export default function Main() {
  const { state } = useAppContext();

  //   console.log("state:", state);

  return (
    <div className="flex-1 relative">
      <main className="overflow-y-auto w-full h-full bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <MenuButton />
        {/* <Welcome /> */}
        <MessageList />
        <ChatInput />
      </main>
    </div>
  );
}
