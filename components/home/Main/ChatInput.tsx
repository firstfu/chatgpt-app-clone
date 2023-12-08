import Button from "@/components/common/Button";
import React from "react";

import { PiLightningFill } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";

export default function ChatInput() {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl bg-green-600 mx-auto flex flex-col items-center px-4 space-y-4">
        <Button icon={MdRefresh} className="font-medium" variant="primary">
          重新生成
        </Button>
      </div>
    </div>
  );
}
