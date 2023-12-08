"use client";

import { useAppContext } from "@/components/AppContext";
import Button from "@/components/common/Button";
import React from "react";
import { LuPanelLeft } from "react-icons/lu";

export default function MenuButton() {
  const { setState, state } = useAppContext();

  return (
    <Button
      icon={LuPanelLeft}
      className={`${state.displayNavigation ? "hidden" : ""}  fixed top-2 left-2`}
      variant="outline"
      onClick={() => {
        setState(v => {
          console.log("v:", v);
          return {
            ...v,
            displayNavigation: true,
          };
        });
      }}
    />
  );
}
