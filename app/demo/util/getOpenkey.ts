"use server";

export async function getOpenAIKey() {
  console.log("process.env.OPENAI_KEY: ", process.env.OPENAI_KEY);
  return process.env.OPENAI_KEY;
}
