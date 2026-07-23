// 1. Import External Library
import { Plus } from "lucide-react";

// 2. Import Types
import type { ChatFilterId, DataChatLabel } from "../types/chatTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

const CHAT_FILTERS: { id: ChatFilterId; label: string }[] = [
  { id: "all", label: "Semua" },
  { id: "unread", label: "Belum dibaca" },
  { id: "favorite", label: "Favorit" },
  { id: "group", label: "Grup" },
];

// 7. Props
interface Props {
  labels: DataChatLabel[];
  activeFilterId: ChatFilterId;
  activeLabelId: string | null;
  onSelectFilter: (filterId: ChatFilterId) => void;
  onSelectLabel: (labelId: string) => void;
  onCreateLabel: () => void;
}

export default function ChatFilterChips({
  labels,
  activeFilterId,
  activeLabelId,
  onSelectFilter,
  onSelectLabel,
  onCreateLabel,
}: Props) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-4 pb-4 sm:px-5">
      {CHAT_FILTERS.map((filter) => {
        const isActive = !activeLabelId && activeFilterId === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onSelectFilter(filter.id)}
            className={cn(
              "h-8 shrink-0 rounded-full px-3.5 text-[13px] transition-colors",
              isActive
                ? "bg-primary/10 font-semibold text-primary"
                : "border text-muted-foreground hover:bg-muted"
            )}
          >
            {filter.label}
          </button>
        );
      })}

      {labels.map((label) => {
        const isActive = activeLabelId === label.id;

        return (
          <button
            key={label.id}
            type="button"
            onClick={() => onSelectLabel(label.id)}
            className={cn(
              "flex h-8 shrink-0 items-center gap-2 rounded-full px-3.5 text-[13px] transition-colors",
              isActive
                ? "bg-primary/10 font-semibold text-primary"
                : "border text-muted-foreground hover:bg-muted"
            )}
          >
            <span className={cn("h-2 w-2 rounded-full", label.dotClassName)} />
            {label.name}
          </button>
        );
      })}

      <button
        type="button"
        onClick={onCreateLabel}
        aria-label="Buat label"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:bg-muted"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
