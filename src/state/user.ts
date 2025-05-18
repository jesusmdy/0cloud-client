import { create } from "zustand";
import { User } from "@/types/user";

export enum Status {
  LOADING,
  NOT_AUTHENTICATED,
  AUTHENTICATED,
  ERROR
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  status: Status;
  setStatus: (status: Status) => void;
}

const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user: User | null) => set({ user }),
  status: Status.LOADING,
  setStatus: (status: Status) => set({ status })
}));


export default useUser;
