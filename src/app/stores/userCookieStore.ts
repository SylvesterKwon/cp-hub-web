"use server";
import { cookies } from "next/headers";

export async function getUserInfo() {
  const cookieStore = await cookies();
  if (!cookieStore.has("accessToken")) return;
  return {
    id: cookieStore.get("userId")?.value,
    username: cookieStore.get("username")?.value,
  };
}
