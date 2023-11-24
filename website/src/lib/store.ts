import { User } from "@prisma/client";
import { create } from "zustand";

type State = {
  user: User | null;
};

type Action = {
  setUser: (newUser: User | null) => void;
};

export type Store = State & Action;

export const useStore = create<Store>()((set) => ({
  user: null,
  setUser: (newUser) => set({ user: newUser }),
}));
