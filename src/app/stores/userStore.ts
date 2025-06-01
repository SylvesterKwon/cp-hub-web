import { create } from "zustand";
import { SignInForm, SignUpForm } from "../types/user";
import cpHubClient from "@/clients/cpHub/cpHubClient";
import { GetMeResponse, SignInResponse } from "@/clients/cpHub/type";

export type UserStore = {
  userInfo: GetMeResponse | undefined;
  getUserInfo: () => Promise<void>;
  signIn: (dto: SignInForm) => Promise<SignInResponse>;
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
    const signInRes = await cpHubClient.signIn(data);
    const getMeRes = await cpHubClient.getMe();
    set({
      userInfo: getMeRes,
    });
    return signInRes;
  },
  signUp: async (data: SignUpForm) => {
    await cpHubClient.signUp(data);
  },
  signOut: () => {},
}));
