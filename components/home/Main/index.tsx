/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:50
 * @ Description: 主體內容
 */

import React from "react";
import MenuButton from "./MenuButton";
import { useAppContext } from "@/components/AppContext";

type Props = {
  counter: number;
};

export default function Main() {
  const { state } = useAppContext();

  console.log("state:", state);

  return (
    <main
      className={`flex-1  relative bg-white  ${state.themeMode === "dark" ? "dark:" : ""}bg-gray-800 text-gray-900 ${
        state.themeMode === "dark" ? "dark:" : ""
      }text-gray-100   bg-gray-800`}
    >
      <MenuButton />
    </main>
  );
}
