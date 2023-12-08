"use client";

import { Chat } from "@/types/chat";
import React, { useEffect, useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTramBold, PiTrashBold } from "react-icons/pi";

type Props = {
  item: Chat;
  selected: boolean;
  onSelected: (chat: Chat) => void;
};

export default function ChatItem({ item, selected, onSelected }: Props) {
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setEditing(false);
    setDeleting(false);
  }, [selected]);

  return (
    <li
      key={item.id}
      className={`group flex items-center p-3 space-x-3 rounded-md hover:bg-gray-800 cursor-pointer ${selected ? "bg-gray-800 pr-[3.5em]" : ""}`}
      onClick={() => {
        onSelected(item);
      }}
    >
      <div>{deleting ? <PiTrashBold /> : <PiChatBold />}</div>

      {/* 輸入框 */}
      {editing ? (
        <input className="flex-1 min-w-0 bg-transparent outline-none" defaultValue={item.title} autoFocus={true} />
      ) : (
        <div className="relative flex-1 whitespace-nowrap overflow-hidden">
          {item.title}
          <span
            className={` group-hover:from-gray-800 absolute right-0 inset-y-0 w-8 from-gray-900 bg-gradient-to-l ${selected ? "from-gray-800" : ""}`}
          ></span>
        </div>
      )}

      {selected && (
        <div className="absolute right-1 flex">
          {editing || deleting ? (
            <>
              <button
                className="p-1 hover:text-white"
                onClick={e => {
                  if (deleting) {
                    console.log("刪除處理");
                  } else {
                    console.log("編輯處理");
                  }

                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation();
                }}
              >
                <MdCheck />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={e => {
                  setDeleting(false);
                  setEditing(false);
                  e.stopPropagation();
                }}
              >
                <MdClose />
              </button>
            </>
          ) : (
            // 刪除處理
            <>
              <button
                className="p-1 hover:text-white"
                onClick={e => {
                  setEditing(true);
                  e.stopPropagation();
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="p-1 hover:text-white"
                onClick={e => {
                  setDeleting(true);
                  e.stopPropagation();
                }}
              >
                <MdDeleteOutline />
              </button>
            </>
          )}
        </div>
      )}
    </li>
  );
}
