import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, ...data } = body;
  if (data.chatId) {
    const chat = await prisma.chat.create({
      data: {
        title: "新對話",
      },
    });
    data.chatId = chat.id;
  }
  //   let message;
  //   if (id) {
  //     message = await prisma.chat.update({
  //       data,
  //       where: {
  //         id,
  //       },
  //     });
  //   } else {
  //     message = await prisma.message.create({
  //       data,
  //     });
  //   }

  //   合併create 、update
  const message = await prisma.message.upsert({
    create: data,
    update: data,
    where: {
      id,
    },
  });
  return NextResponse.json({
    code: 0,
    data: {
      message,
    },
  });
}
