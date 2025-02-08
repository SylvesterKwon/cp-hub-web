import { create } from "zustand";
import { SignInForm, SignUpForm } from "../types/user";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import Cookies from "js-cookie";

export type UserStore = {
  userInfo?: {
    id: string;
    username: string;
  };
  signIn: (dto: SignInForm) => Promise<void>;
  signUp: (dto: SignUpForm) => Promise<void>;
  signOut: () => void;
};

const getUserInfo = () => {
  if (!Cookies.get("accessToken")) return;
  return {
    id: Cookies.get("userId") as string,
    username: Cookies.get("username") as string,
  };
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: getUserInfo(),
  signIn: async (data: SignInForm) => {
    await cpHubClient.signIn(data);
    set({ userInfo: getUserInfo() });
  },
  signUp: async (data: SignUpForm) => {
    await cpHubClient.signUp(data);
    set({ userInfo: getUserInfo() });
  },
  signOut: () => {},
}));
