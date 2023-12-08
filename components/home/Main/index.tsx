/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:50
 * @ Description: 主體內容
 */

import React from "react";
import MenuButton from "./MenuButton";
import { useAppContext } from "@/components/AppContext";
import Welcome from "./Welcome";

type Props = {
  counter: number;
};

export default function Main() {
  const { state } = useAppContext();

  console.log("state:", state);

  return (
    <main className="overflow-y-auto relative flex-1 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100">
      <MenuButton />
      <Welcome />
    </main>
  );
}
