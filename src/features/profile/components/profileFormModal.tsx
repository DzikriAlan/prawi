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
    >
      <form
        className="flex min-h-0 flex-1 flex-col"
        onSubmit={handleSubmit}
      >
        <ModalHeader>
          <ModalTitle>Lengkapi Profil</ModalTitle>
        </ModalHeader>

        <ModalContent>
          <ProfileForm
            payload={payload}
            onChangePayload={handleChangePayload}
          />
        </ModalContent>

        <ModalFooter>
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full"
          >
            {loading ? "Menyimpan..." : "Simpan Profil"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
