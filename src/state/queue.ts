import { create } from "zustand";

export enum Status {
  PENDING,
  IN_PROGRESS,
  COMPLETED,
  FAILED
}

export interface QueueItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  file: File;
  parent_id: string | null;
  progress: number;
  status: Status;
  error?: string;
}

interface QueueState {
  queue: QueueItem[];
  add: (item: QueueItem) => void;
  remove: (id: string) => void;
  update: (id: string, update: Partial<QueueItem>) => void;
  clear: () => void;
  isOpenDrawer: boolean;
  setIsOpenDrawer: (open: boolean) => void;
}

const useQueue = create<QueueState>((set) => ({
  queue: [],
  add: (item: QueueItem) => set((state) => ({ queue: [...state.queue, item] })),
  remove: (id: string) => set((state) => ({ queue: state.queue.filter((item) => item.id !== id) })),
  update: (id: string, update: Partial<QueueItem>) => set((state) => ({ queue: state.queue.map((item) => item.id === id ? { ...item, ...update } : item) })),
  clear: () => set({ queue: [] }),
  isOpenDrawer: false,
  setIsOpenDrawer: (open: boolean) => set({ isOpenDrawer: open }),
}));

export { useQueue };