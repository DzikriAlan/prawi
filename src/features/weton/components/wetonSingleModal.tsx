// 2. Import Types
import type { PayloadSingleWeton, SingleWeton } from "../types/wetonTypes";

// Import Components
import WetonSingleForm from "./wetonSingleForm";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// 7. Props
interface Props {
  open: boolean;
  loading: boolean;
  singleWeton: SingleWeton;
  onOpenChange: (open: boolean) => void;
  onCalculateWeton: (payload: PayloadSingleWeton) => void;
}

export default function WetonSingleModal({
  open,
  loading,
  singleWeton,
  onOpenChange,
  onCalculateWeton,
}: Props) {
  // 10. Computed / Derived
  const hasResult = singleWeton.status === "success" && Boolean(singleWeton.data);

  // 11. Methods / Handlers
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cek Weton</DialogTitle>
          <DialogDescription>
            {hasResult
              ? "Berikut hasil perhitungan weton."
              : "Masukkan tanggal untuk mengetahui weton-nya."}
          </DialogDescription>
        </DialogHeader>

        {hasResult ? (
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">{singleWeton.data?.weton}</p>

            <DialogFooter>
              <Button
                className="w-full"
                onClick={handleClose}
              >
                Tutup
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <WetonSingleForm
            loading={loading}
            onCalculateWeton={onCalculateWeton}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
