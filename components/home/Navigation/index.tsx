"use client";

/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:03
 * @ Description: 導航欄
 */

import React from "react";
import Button from "../../common/Button";
import Menubar from "./Menubar";
import { useAppContext } from "@/components/AppContext";
import Toolbar from "./Toolbar";
import ChatList from "./ChatList";

export default function Navigation() {
  const {
    state: { displayNavigation },
  } = useAppContext();
  console.log("Navigation rendered");

  return (
    <nav className={`${displayNavigation ? "" : "hidden"}  flex flex-col dark relative  h-full w-[260px] bg-gray-900 text-green-300 p-2`}>
      <Menubar />
      <ChatList />
      <Toolbar />
    </nav>
  );
}
