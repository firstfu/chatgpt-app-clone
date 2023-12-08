/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:03
 * @ Description: 導航欄
 */

import React from "react";
import Button from "../../common/Button";
import Menubar from "./Menubar";

export default function Navigation() {
  return (
    <nav className="h-full w-[260px] bg-gray-900 text-green-300 p-2">
      <Menubar />
    </nav>
  );
}
