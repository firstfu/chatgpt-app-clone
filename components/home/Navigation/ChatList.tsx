"use client";

import { groupByDate } from "@/common/util";
import { Chat } from "@/types/chat";
import React, { useEffect, useMemo, useRef, useState } from "react";

import { AiOutlineEdit } from "react-icons/ai";
import { MdCheck, MdClose, MdDeleteOutline } from "react-icons/md";
import { PiChatBold, PiTrashBold } from "react-icons/pi";
import ChatItem from "./ChatItem";
import { useEventBusContext } from "@/components/EventBusContext";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatList() {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const pageRef = useRef(1);

  let groupList = useMemo(() => {
    return groupByDate(chatList);
  }, [chatList]);

  //   訂閱事件
  const { subscribe, unsubscribe, publish } = useEventBusContext();
  const {
    state: { selectedChat },
    dispatch,
  } = useAppContext();

  async function getData() {
    const response = await fetch(`/api/chat/list?page=${pageRef.current}&size=20`, {
      method: "GET",
    });
    if (!response.ok) {
      console.error("getData失敗:", response, response.status, response.statusText);
      return;
    }
    const { data } = await response.json();
    if (pageRef.current === 1) {
      setChatList(data.list);
    } else {
      setChatList(list => list.concat(data.list));
    }
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const callback: EventListener = () => {
      console.log("fectchChatList event");
      pageRef.current = 1;
      getData();
    };
    subscribe("fectchChatList", callback);
    return () => {
      unsubscribe("fectchChatList", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-1 mb-[48px] mt-2 flex flex-col overflow-y-auto">
      {/* 分組 */}
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div>
              <div className="sticky top-0 z-10 p-3 text-sm bg-gray-900 text-gray-500">{date}</div>
            </div>
            <ul key={date}>
              {list.map(item => {
                const selected = selectedChat?.id === item.id;
                return (
                  <>
                    <ChatItem
                      key={item.id}
                      item={item}
                      selected={selected}
                      onSelected={chat => {
                        dispatch({ type: ActionType.UPDATE, field: "selectedChat", value: chat });
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
function userRef(arg0: number) {
  throw new Error("Function not implemented.");
}
