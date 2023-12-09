import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let { url } = request;
  return NextResponse.json({
    code: 200,
    statusCode: 2001,
    message: "success",
    data: {
      url,
    },
  });
}
