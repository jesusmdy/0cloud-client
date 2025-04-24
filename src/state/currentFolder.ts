import { create } from "zustand";
import { Folder } from "@/types/folder";

interface CurrentFolderState {
  folder: Folder | null;
  setFolder: (folder: Folder | null) => void;
}

const useCurrentFolder = create<CurrentFolderState>((set) => ({
  folder: null,
  setFolder: (folder: Folder | null) => set({ folder }),
}));

export default useCurrentFolder;