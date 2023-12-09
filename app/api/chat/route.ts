import { sleep } from "@/common/util";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  let { messageText } = await request.json();
  let encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < messageText.length; i++) {
        await sleep(100);
        controller.enqueue(encoder.encode(messageText[i]));
      }
      controller.close();
    },
  });
  console.log("messageText", messageText);
  return new Response(stream);
}
