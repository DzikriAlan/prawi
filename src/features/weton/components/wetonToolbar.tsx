// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// 7. Props
interface Props {
  pageSize: number;
  onChangePageSize: (pageSize: number) => void;
  onOpenMatchModal: () => void;
  onOpenSingleModal: () => void;
}

export default function WetonToolbar({
  pageSize,
  onChangePageSize,
  onOpenMatchModal,
  onOpenSingleModal,
}: Props) {
  // 11. Methods / Handlers
  const handleChangePageSize = (value: string) => {
    onChangePageSize(Number(value));
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        variant="outline"
        onClick={onOpenSingleModal}
      >
        Cek Weton
      </Button>

      <Select
        value={String(pageSize)}
        onValueChange={handleChangePageSize}
      >
        <SelectTrigger className="w-[130px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {PAGE_SIZE_OPTIONS.map((option) => (
            <SelectItem
              key={option}
              value={String(option)}
            >
              {option} / halaman
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button onClick={onOpenMatchModal}>Cari Weton Cocok</Button>
    </div>
  );
}
