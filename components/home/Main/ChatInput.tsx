import Button from "@/components/common/Button";
import React, { useRef, useState } from "react";

import { PiLightningFill, PiStopBold } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import TextareaAutoSize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";
import { useEventBusContext } from "@/components/EventBusContext";

export default function ChatInput() {
  const [messageText, setMessageText] = useState("");
  const stopRef = useRef(false);
  //   維護caht id的狀態，同1個對話的消息應該有相同的chat id
  const chatIdRef = useRef("");

  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();

  let { publish } = useEventBusContext();

  async function createOrUpdateMessage(message: Message) {
    const response = await fetch("/api/message/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
    console.log("🚀 ~ file: ChatInput.tsx:30 ~ createOrUpdateMessage ~ response:", response);
    if (!response.ok) {
      console.error("createOrUpdateMessage失敗:", response, response.status, response.statusText);
      return;
    }
    const { data } = await response.json();
    if (!chatIdRef.current) {
      chatIdRef.current = data.message.chatId;
      publish("fectchChatList");
    }
    return data.message;
  }

  //   刪除消息
  async function deleteMessage(id: string) {
    const response = await fetch(`/api/message/delete?id=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("🚀 ~ file: ChatInput.tsx:43 ~ deleteMessage ~ response:", response);

    if (!response.ok) {
      console.error("deleteMessage失敗:", response, response.status, response.statusText);
      return;
    }
    const { code } = await response.json();
    return code === 0;
  }

  async function send() {
    const message = await createOrUpdateMessage({
      id: "",
      role: "user",
      content: messageText,
      chatId: chatIdRef.current,
    });
    dispatch({ type: ActionType.ADD_MESSAGE, message });
    const messages = messageList.concat([message]);
    doSend(messages);
  }

  async function resend() {
    const messages = [...messageList];
    if (messages.length !== 0 && messages[messages.length - 1].role === "assistant") {
      // 刪除server消息
      const result = await deleteMessage(messages[messages.length - 1].id);
      if (!result) {
        console.log("delete error");
        return;
      }
      dispatch({
        type: ActionType.REMOVE_MESSAGE,
        message: messages[messages.length - 1],
      });
      messages.splice(messages.length - 1, 1);
    }
    doSend(messages);
  }

  async function doSend(messages: Message[]) {
    const body: MessageRequestBody = { messages, model: currentModel };
    setMessageText("");
    const controller = new AbortController();
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      body: JSON.stringify(body),
    });

    console.log("🚀 ~ file: ChatInput.tsx:24 ~ send ~ response:", response);

    if (!response.ok) {
      console.error("發送消息失敗:", response, response.status, response.statusText);
      return;
    }
    if (!response.body) {
      console.log("發送消息失敗: 沒有返回body:", response.status, response.statusText);
      return;
    }

    const responseMessage: Message = await createOrUpdateMessage({
      id: "",
      role: "assistant",
      content: "",
      chatId: chatIdRef.current,
    });

    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    dispatch({ type: ActionType.UPDATE, field: "streamingId", value: responseMessage.id });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      if (stopRef.current) {
        stopRef.current = false;
        // 中止網路請求
        controller.abort();
        break;
      }

      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        message: { ...responseMessage, content },
      });
      //   console.log("🚀 ~ file: ChatInput.tsx:70 ~ send ~ content:", content);
    }
    // 更新server消息內容
    createOrUpdateMessage({
      ...responseMessage,
      content,
    });
    dispatch({ type: ActionType.UPDATE, field: "streamingId", value: "" });
  }

  return (
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          (streamingId !== "" ? (
            <Button
              icon={PiStopBold}
              className="font-medium"
              variant="primary"
              onClick={() => {
                stopRef.current = true;
              }}
            >
              停止生成
            </Button>
          ) : (
            <Button
              icon={MdRefresh}
              className="font-medium"
              variant="primary"
              onClick={() => {
                resend();
              }}
            >
              重新生成
            </Button>
          ))}

        <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
          <div className="mx-3 mb-2.5 text-primary-500">
            <PiLightningFill />
          </div>
          <TextareaAutoSize
            className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
            placeholder="输入消息..."
            rows={1}
            value={messageText}
            onChange={e => {
              setMessageText(e.target.value);
            }}
          />
          <Button icon={FiSend} variant="primary" className="mx-3 !rounded-lg" onClick={send} disabled={messageText.trim() === "" || streamingId !== ""} />
        </div>

        <footer className="text-center text-sm text-gray-700 dark:text-gray-300 px-4 pb-6">
          ©{new Date().getFullYear()}&nbsp;{" "}
          <a
            href="https://www.google.com"
            target="__blank"
            className="font-medium py-[1px] border-dotted border-b
         border-black/60 hover:border-black/0 dark:border-gray-200
         dark:hover:border-gray-200/0"
          >
            GPT Copy
          </a>
          .&nbsp;基於第三方API，僅供學習交流，請勿用於商業用途。
        </footer>
      </div>
    </div>
  );
}
