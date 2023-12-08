/**
 * @ Author: firstfu
 * @ Create Time: 2023-12-08 03:48:03
 * @ Description: 按鈕組件
 */

import React, { ComponentPropsWithRef } from "react";
import { IconType } from "react-icons";

// &是組合類型
type ButtonProps = {
  icon?: IconType;
  variant?: "default" | "outline" | "text";
} & ComponentPropsWithRef<"button">;

export default function Button({ children, className = "", icon: Icon, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center min-w-[38px] min-h-[38px] rounded px-3 py-1.5
     ${
       variant === "default"
         ? "text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-900"
         : variant === "outline"
         ? "border border-r-gray-300 dark:border-gray-600 text-black dark:text-gray-300 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
         : "text-black dark:text-gray-300 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
     }
     ${className}`}
      {...props}
    >
      {Icon && <Icon className={`text-lg ${children ? "mr-1" : ""}`} />}
      {children}
    </button>
  );
}
