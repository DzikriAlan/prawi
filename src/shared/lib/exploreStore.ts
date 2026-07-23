import { create } from "zustand";

interface ExploreStore {
  isExploreOpen: boolean;
  setExploreOpen: (isExploreOpen: boolean) => void;
  toggleExplore: () => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
  isExploreOpen: false,

  setExploreOpen: (isExploreOpen) => set({ isExploreOpen }),

  toggleExplore: () => set((state) => ({ isExploreOpen: !state.isExploreOpen })),
}));
