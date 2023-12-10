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

  const loadMoreRef = useRef(null);
  const hasMoreRef = useRef(false);
  //   避免重複請求, 用ref來記錄狀態, 避免請求還沒回來就發起下一次請求
  const loadingRef = useRef(false);

  async function getData() {
    if (loadingRef.current) {
      return;
    }
    loadingRef.current = true;
    const response = await fetch(`/api/chat/list?page=${pageRef.current}&size=20`, {
      method: "GET",
    });
    console.log("訂閱事件請求....");
    if (!response.ok) {
      console.error("getData失敗:", response, response.status, response.statusText);
      loadingRef.current = false;
      return;
    }
    const { data } = await response.json();
    hasMoreRef.current = data.hasMore;
    if (pageRef.current === 1) {
      setChatList(data.list);
    } else {
      setChatList(list => list.concat(data.list));
    }
    pageRef.current++;
    loadingRef.current = false;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const callback: EventListener = () => {
      console.log("fetchChatList event");
      pageRef.current = 1;
      getData();
    };
    subscribe("fetchChatList", callback);
    return () => {
      unsubscribe("fetchChatList", callback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let div = loadMoreRef.current;
    if (div) {
      observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreRef.current) {
          console.log("visible.....發起請求");
          //   發起請求
          getData();
        }
      });
      observer.observe(div);
    }
    return () => {
      if (observer && div) {
        observer.unobserve(div);
      }
    };
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
      {/* 加載更多 */}
      <div ref={loadMoreRef}>&nbsp;</div>
    </div>
  );
}
