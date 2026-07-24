// 1. Import External Library
import { useEffect, useRef, useState } from "react";
import { Notyf } from "notyf";

// 2. Import Types
import type { PayloadStoreProfile } from "../types/profileTypes";

// 4. Import States / Stores
import { useProfileStore } from "@/shared/lib/profileStore";

// Import Components
import ProfileForm from "./profileForm";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
} from "@/components/ui/modal";

const INITIAL_PAYLOAD: PayloadStoreProfile = {
  bannerImageUrl: "",
  avatarImageUrl: "",
  birthDate: "",
  purpose: "",
  interests: "",
  location: "",
  bio: "",
  activityLevel: "",
};

// 7. Props
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileFormModal({ open, onOpenChange }: Props) {
  // 9. Store / Controller
  const myBirthDate = useProfileStore((state) => state.myBirthDate);
  const setMyBirthDate = useProfileStore((state) => state.setMyBirthDate);

  // 8. State
  const [payload, setPayload] = useState<PayloadStoreProfile>({
    ...INITIAL_PAYLOAD,
    birthDate: myBirthDate,
  });
  const [loading, setLoading] = useState(false);

  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const isSubmitDisabled =
    !payload.birthDate ||
    !payload.purpose ||
    !payload.location ||
    !payload.activityLevel ||
    loading;

  // 11. Methods / Handlers
  const handleChangePayload = (partialPayload: Partial<PayloadStoreProfile>) => {
    setPayload((state) => ({ ...state, ...partialPayload }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMyBirthDate(payload.birthDate);
      notyfRef.current?.success("Profil berhasil disimpan.");
      onOpenChange(false);
    }, 600);
  };

  // 12. Effects
  useEffect(() => {
    notyfRef.current = new Notyf({
      duration: 3000,
      position: { x: "right", y: "top" },
    });
  }, []);

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="left-0 top-0 h-[100dvh] max-h-[100dvh] w-full max-w-none translate-x-0 translate-y-0 rounded-none border-0 pt-[env(safe-area-inset-top)] sm:pt-0 data-[state=closed]:animate-none data-[state=open]:animate-none sm:left-[50%] sm:top-[50%] sm:h-auto sm:max-h-[85vh] sm:w-[calc(100%-2rem)] sm:max-w-lg sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-lg sm:border sm:data-[state=closed]:animate-out sm:data-[state=open]:animate-in"
    >
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={handleSubmit}
      >
        <ModalHeader className="px-4 sm:px-6">
          <ModalTitle>Lengkapi Profil</ModalTitle>
        </ModalHeader>

        <ModalContent className="px-4 sm:px-6">
          <ProfileForm
            payload={payload}
            onChangePayload={handleChangePayload}
          />
        </ModalContent>

        <ModalFooter className="px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 sm:pb-4">
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="h-11 w-full sm:h-9"
          >
            {loading ? "Menyimpan..." : "Simpan Profil"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
