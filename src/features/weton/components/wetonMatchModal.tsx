// 2. Import Types
import type { PayloadMatchWeton } from "../types/wetonTypes";

// Import Components
import WetonMatchForm from "./wetonMatchForm";

// Import Shadcn/UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// 7. Props
interface Props {
  open: boolean;
  loading: boolean;
  onOpenChange: (open: boolean) => void;
  onCalculateMatch: (payload: PayloadMatchWeton) => void;
}

export default function WetonMatchModal({
  open,
  loading,
  onOpenChange,
  onCalculateMatch,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cari Weton Cocok</DialogTitle>
          <DialogDescription>
            Masukkan tanggal lahir dan rentang tahun pencarian.
          </DialogDescription>
        </DialogHeader>

        <WetonMatchForm
          loading={loading}
          onCalculateMatch={onCalculateMatch}
        />
      </DialogContent>
    </Dialog>
  );
}
