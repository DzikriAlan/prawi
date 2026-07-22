// 1. Import External Library
import Image from "next/image";

// 2. Import Types
import type { DataStatusUpdate } from "../types/statusTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  update: DataStatusUpdate;
  onOpenStatus: (statusId: string) => void;
}

export default function StatusUpdateRow({ update, onOpenStatus }: Props) {
  // 11. Methods / Handlers
  const handleOpenStatus = () => {
    onOpenStatus(update.id);
  };

  return (
    <button
      type="button"
      onClick={handleOpenStatus}
      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent/50"
    >
      <div
        className={cn(
          "relative h-12 w-12 shrink-0 rounded-full p-[2px]",
          update.isViewed ? "bg-border" : "bg-primary"
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-background">
          <Image
            src={update.avatarUrl}
            alt={update.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium leading-snug text-foreground">
          {update.name}
        </span>
        <span className="text-xs text-muted-foreground">{update.timeLabel}</span>
      </div>
    </button>
  );
}
