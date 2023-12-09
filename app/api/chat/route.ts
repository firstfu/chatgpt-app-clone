import { sleep } from "@/common/util";
import { MessageRequestBody } from "@/types/chat";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let { messages } = (await request.json()) as MessageRequestBody;
  console.log("🚀 ~ file: route.ts:7 ~ POST ~ messages:", messages);

  let encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      let messageText = messages[messages.length - 1].content;
      for (let i = 0; i < messageText.length; i++) {
        await sleep(100);
        controller.enqueue(encoder.encode(messageText[i]));
      }
      controller.close();
    },
  });
  return new Response(stream);
}
