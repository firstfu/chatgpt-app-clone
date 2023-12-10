"use client";

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
      <Button
        icon={HiPlus}
        variant="outline"
        className="flex-1"
        onClick={() => {
          //   alert("新建對話");
          dispatch({
            type: ActionType.UPDATE,
            field: "selectedChat",
            value: null,
          });
        }}
      >
        新建對話
      </Button>
      <Button
        icon={LuPanelLeft}
        variant="outline"
        onClick={() => {
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
