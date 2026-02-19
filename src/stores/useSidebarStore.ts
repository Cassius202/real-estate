// src/stores/useSidebarStore.ts
import { create } from 'zustand';

interface SidebarStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

export const useSidebarStore = create<SidebarStore>()((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open: boolean) => set({ isOpen: open }),
}));