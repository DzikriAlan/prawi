// 1. Import External Library
import Image from "next/image";

// 2. Import Types
import type { DataChatFriendSuggestion } from "../types/chatTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  suggestions: DataChatFriendSuggestion[];
  onToggleAddFriend: (suggestionId: string) => void;
  onShowAllSuggestions: () => void;
}

export default function ChatFriendSuggestionPanel({
  suggestions,
  onToggleAddFriend,
  onShowAllSuggestions,
}: Props) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border bg-background p-4">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold text-foreground">
          Mungkin kamu kenal
        </span>

        <button
          type="button"
          onClick={onShowAllSuggestions}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Lihat semua
        </button>
      </div>

      {suggestions.map((suggestion) => (
        <div key={suggestion.id} className="flex items-center gap-3 py-2">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={suggestion.avatarUrl}
              alt={suggestion.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-foreground">
              {suggestion.name}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {suggestion.mutualLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleAddFriend(suggestion.id)}
            className={cn(
              "h-8 shrink-0 rounded-full px-4 text-xs font-semibold transition-colors",
              suggestion.isAdded
                ? "bg-muted text-muted-foreground"
                : "border border-primary/40 text-primary hover:bg-primary/10"
            )}
          >
            {suggestion.isAdded ? "Diminta" : "Tambah"}
          </button>
        </div>
      ))}
    </div>
  );
}
