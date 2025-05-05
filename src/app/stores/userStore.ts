import { create } from "zustand";
import { SignInForm, SignUpForm } from "../types/user";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { GetMeResponse } from "@/clients/cpHub/type";

export type UserStore = {
  userInfo: GetMeResponse;
  getUserInfo: () => Promise<void>;
  signIn: (dto: SignInForm) => Promise<void>;
  signUp: (dto: SignUpForm) => Promise<void>;
  signOut: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userInfo: undefined,
  getUserInfo: async () => {
    const res = await cpHubClient.getMe();
    set({
      userInfo: res,
    });
  },
  signIn: async (data: SignInForm) => {
    await cpHubClient.signIn(data);
    const res = await cpHubClient.getMe();
    set({
      userInfo: res,
    });
  },
  signUp: async (data: SignUpForm) => {
    await cpHubClient.signUp(data);
  },
  signOut: () => {},
}));
