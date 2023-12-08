/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:03
 * @ Description: 工具欄
 */

import React from "react";
import Button from "../../common/Button";
import { MdLightMode, MdDarkMode, MdInfo } from "react-icons/md";
import { useAppContext } from "@/components/AppContext";

export default function Toolbar() {
  const { setState, state } = useAppContext();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 flex p-2 justify-between">
      <Button
        icon={state.themeMode === "dark" ? MdDarkMode : MdLightMode}
        variant="text"
        onClick={() => {
          setState(v => {
            console.log("v:", v);
            return {
              ...v,
              themeMode: v.themeMode === "dark" ? "light" : "dark",
            };
          });
        }}
      />
      <Button icon={MdInfo} variant="text" />
    </div>
  );
}
