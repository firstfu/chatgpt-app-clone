"use client";

import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import React, { useMemo, useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import ChatItem from "./ChatItem";

export default function ChatList() {
  let [chatList, setChatList] = useState<Chat[]>([
    {
      id: "1",
      title: "React入門實戰",
      updateTime: Date.now(),
    },
    {
      id: "2",
      title: "React入門實戰2",
      updateTime: Date.now() + 1,
    },
    {
      id: "3",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "4",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "5",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 50,
    },
    {
      id: "6",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "7",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "8",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 50,
    },
    {
      id: "9",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "10",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "11",
      title: "BBBReact入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 4444,
    },
    {
      id: "12",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "13",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "14",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 50,
    },
    {
      id: "15",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "16",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "17",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 50,
    },
    {
      id: "18",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "19",
      title: "React入門實戰4",
      updateTime: Date.now() + 3,
    },
    {
      id: "20",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 50,
    },
    {
      id: "21",
      title: "React入門實戰3",
      updateTime: Date.now() + 2,
    },
    {
      id: "22",
      title: "React入門實戰4",
      updateTime: Date.now() + 3333,
    },
    {
      id: "23",
      title: "React入門實戰5React入門實戰5React入門實戰5React入門實戰5",
      updateTime: Date.now() + 33,
    },
  ]);

  const [selectedChat, setSelectedChat] = useState<Chat>();
  let groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);

  console.log("groupList:", groupList);

  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {/* 分組 */}
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div key={date}>
              <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">{date}</div>
            </div>
            <ul>
              {list.map(item => {
                const selected = selectedChat?.id === item.id;
                return (
                  <>
                    <ChatItem
                      key={item.id}
                      item={item}
                      selected={selected}
                      onSelected={chat => {
                        setSelectedChat(chat);
                      }}
                    ></ChatItem>
                  </>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
