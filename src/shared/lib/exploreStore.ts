import { create } from "zustand";

interface ExploreStore {
  isExploreOpen: boolean;
  isImmersive: boolean;
  statusFeedRequestToken: number;
  setExploreOpen: (isExploreOpen: boolean) => void;
  setImmersive: (isImmersive: boolean) => void;
  toggleExplore: () => void;
  requestStatusFeed: () => void;
}

export const useExploreStore = create<ExploreStore>((set) => ({
  isExploreOpen: false,
  isImmersive: false,
  statusFeedRequestToken: 0,

  setExploreOpen: (isExploreOpen) => set({ isExploreOpen }),

  setImmersive: (isImmersive) => set({ isImmersive }),

  toggleExplore: () => set((state) => ({ isExploreOpen: !state.isExploreOpen })),

  requestStatusFeed: () =>
    set((state) => ({ statusFeedRequestToken: state.statusFeedRequestToken + 1 })),
}));
