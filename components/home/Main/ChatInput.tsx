import Button from "@/components/common/Button";
import React, { useState } from "react";

import { PiLightningFill, PiStopBold } from "react-icons/pi";
import { FiSend } from "react-icons/fi";
import { MdRefresh } from "react-icons/md";
import TextareaAutosize from "react-textarea-autosize";
import { v4 as uuidv4 } from "uuid";
import { Message, MessageRequestBody } from "@/types/chat";
import { useAppContext } from "@/components/AppContext";
import { ActionType } from "@/reducers/AppReducer";

export default function ChatInput() {
  const [messageText, setMessageText] = useState("");
  const {
    state: { messageList, currentModel, streamingId },
    dispatch,
  } = useAppContext();

  async function send() {
    const message: Message = {
      id: uuidv4(),
      role: "user",
      content: messageText,
    };

    const messages = messageList.concat([message]);
    const body: MessageRequestBody = { messages, model: currentModel };
    dispatch({ type: ActionType.ADD_MESSAGE, message });
    setMessageText(v => "");

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    const responseMessage: Message = {
      id: uuidv4(),
      role: "assistant",
      content: "",
    };
    dispatch({ type: ActionType.ADD_MESSAGE, message: responseMessage });
    dispatch({ type: ActionType.UPDATE, field: "streamingId", value: responseMessage.id });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let content = "";
    while (!done) {
      const result = await reader.read();
      done = result.done;
      const chunk = decoder.decode(result.value);
      content += chunk;
      dispatch({
        type: ActionType.UPDATE_MESSAGE,
        message: { ...responseMessage, content },
      });
      console.log("🚀 ~ file: ChatInput.tsx:70 ~ send ~ content:", content);
    }
    dispatch({ type: ActionType.UPDATE, field: "streamingId", value: "" });
  }

  return (
    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-b from-[rgba(255,255,255,0)] from-[13.94%] to-[#fff] to-[54.73%] pt-10 dark:from-[rgba(53,55,64,0)] dark:to-[#353740] dark:to-[58.85%]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center px-4 space-y-4">
        {messageList.length !== 0 &&
          (streamingId !== "" ? (
            <Button icon={PiStopBold} className="font-medium" variant="primary">
              停止生成
            </Button>
          ) : (
            <Button icon={MdRefresh} className="font-medium" variant="primary">
              重新生成
            </Button>
          ))}
      </div>

      <div className="flex items-end w-full border border-black/10 dark:border-gray-800/50 bg-white dark:bg-gray-700 rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)] py-4">
        <div className="mx-3 mb-2.5 text-primary-500">
          <PiLightningFill />
        </div>
        <TextareaAutosize
          className="outline-none flex-1 max-h-64 mb-1.5 bg-transparent text-black dark:text-white resize-none border-0"
          placeholder="輸入一條消息.."
          value={messageText}
          rows={10}
          onChange={e => {
            console.log("輸入消息:", e.target.value);
            setMessageText(v => e.target.value);
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
  );
}
