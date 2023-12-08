/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 02:13:03
 * @ Description: 菜單欄
 */

import React from "react";
import Button from "../../common/Button";
import { HiPlus } from "react-icons/hi";
import { LuPanelLeft } from "react-icons/lu";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function Menubar() {
  const { dispatch } = useAppContext();

  return (
    <div className="flex space-x-3">
      <Button icon={HiPlus} variant="outline" className="flex-1">
        新建對話
      </Button>
      <Button
        icon={LuPanelLeft}
        variant="outline"
        onClick={() => {
          //   setState(v => {
          //     console.log("v:", v);
          //     return {
          //       ...v,
          //       displayNavigation: false,
          //     };
          //   });

          dispatch({
            type: ActionType.UPDATE,
            field: "displayNavigation",
            value: false,
          });
        }}
      />
    </div>
  );
}
