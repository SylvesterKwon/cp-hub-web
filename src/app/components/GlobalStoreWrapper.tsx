"use client";

import { useEffect } from "react";
import { useUserStore } from "../stores/userStore";

export default function GlobalStoreWrapper() {
  const getUserInfo = useUserStore((state) => state.getUserInfo);
  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
  return <></>;
}
