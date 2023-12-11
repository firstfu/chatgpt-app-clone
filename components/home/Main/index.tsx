"use client";

import React, { Suspense } from "react";
import MenuButton from "./MenuButton";
import { useAppContext } from "@/components/AppContext";
import Welcome from "./Welcome";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

type Props = {
  counter: number;
};

export default function Main() {
  const {
    state: { selectedChat },
  } = useAppContext();
  return (
    <div className="flex-1 relative">
      <main className="overflow-y-auto w-full h-full bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
        <Suspense fallback={<div className="bg-white text-xl">loading</div>}>
          <MenuButton />
          {!selectedChat && <Welcome />}
          <MessageList />
          <ChatInput />
        </Suspense>
      </main>
    </div>
  );
}
