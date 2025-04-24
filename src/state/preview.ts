import { File } from "@/types/file";
import { create } from "zustand";

interface PreviewState {
  isOpen: boolean
  setIsOpen: (inOpen: boolean) => void
  file: File | null
  setFile: (file: File | null) => void
}

export const usePreview = create<PreviewState>((set) => ({
  isOpen: false,
  setIsOpen: (inOpen: boolean) => set({ isOpen: inOpen }),
  file: null,
  setFile: (file: File | null) => set({ file }),
}))