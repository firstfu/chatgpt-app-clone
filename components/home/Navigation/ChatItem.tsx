import { Chat } from "@/types/chat";
import React from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";

type Props = {
  item: Chat;
  selected: boolean;
  onSelected: (chat: Chat) => void;
};

export default function ChatItem({ item, selected, onSelected }: Props) {
  return (
    <li
      key={item.id}
      className={`group flex items-center p-3 space-x-3 rounded-md hover:bg-gray-800 cursor-pointer ${selected ? "bg-gray-800" : ""}`}
      onClick={() => {
        onSelected(item);
      }}
    >
      <div>
        <PiChatBold />
      </div>
      <div className="flex-1 relative  whitespace-nowrap overflow-hidden">
        {item.title}
        <span
          className={` group-hover:from-gray-800   absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? "from-gray-800" : ""}`}
        ></span>
      </div>
    </li>
  );
}
