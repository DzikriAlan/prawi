import { create } from "zustand";

interface ExploreStore {
  isExploreOpen: boolean;
  isImmersive: boolean;
  setExploreOpen: (isExploreOpen: boolean) => void;
  setImmersive: (isImmersive: boolean) => void;
  toggleExplore: () => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
  isExploreOpen: false,
  isImmersive: false,

  setExploreOpen: (isExploreOpen) => set({ isExploreOpen }),

  setImmersive: (isImmersive) => set({ isImmersive }),

  toggleExplore: () => set((state) => ({ isExploreOpen: !state.isExploreOpen })),
}));
