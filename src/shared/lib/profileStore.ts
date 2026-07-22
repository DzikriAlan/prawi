import { create } from "zustand";

interface ProfileStore {
  myBirthDate: string;
  setMyBirthDate: (myBirthDate: string) => void;
}

// Default profil "kamu" — dipakai sebagai basis kecocokan sebelum user mengisi form profil
const DEFAULT_MY_BIRTH_DATE = "14/03/2023";

export const useProfileStore = create<ProfileStore>((set) => ({
  myBirthDate: DEFAULT_MY_BIRTH_DATE,
  setMyBirthDate: (myBirthDate) => set({ myBirthDate }),
}));
