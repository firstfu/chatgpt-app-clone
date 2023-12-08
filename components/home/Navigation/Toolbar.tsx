"use client";

import React from "react";
import Button from "../../common/Button";
import { MdLightMode, MdDarkMode, MdInfo } from "react-icons/md";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function Toolbar() {
  const { dispatch, state } = useAppContext();

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-800 flex p-2 justify-between">
      <Button
        icon={state.themeMode === "dark" ? MdDarkMode : MdLightMode}
        variant="text"
        onClick={() => {
          //   setState(v => {
          //     console.log("v:", v);
          //     return {
          //       ...v,
          //       themeMode: v.themeMode === "dark" ? "light" : "dark",
          //     };
          //   });

          dispatch({
            type: ActionType.UPDATE,
            field: "themeMode",
            value: state.themeMode === "dark" ? "light" : "dark",
          });
        }}
      />
      <Button icon={MdInfo} variant="text" />
    </div>
  );
}
