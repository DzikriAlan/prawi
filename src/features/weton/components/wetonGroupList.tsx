// 1. Import External Library
import { Users } from "lucide-react";

// 2. Import Types
import type { DataWetonGroup } from "../types/wetonTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  groups: DataWetonGroup[];
  onToggleJoinGroup: (groupId: string) => void;
  onShowAllGroups: () => void;
}

export default function WetonGroupList({
  groups,
  onToggleJoinGroup,
  onShowAllGroups,
}: Props) {
  return (
    <div className="flex flex-col rounded-2xl border bg-background p-3.5">
      <div className="flex items-center justify-between pb-1.5">
        <span className="text-sm font-semibold text-foreground">Grup Populer</span>

        <button
          type="button"
          onClick={onShowAllGroups}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Lihat semua
        </button>
      </div>

      {groups.map((group) => (
        <div key={group.id} className="flex items-center gap-2.5 py-1.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
          </span>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-foreground">
              {group.name}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {group.memberLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onToggleJoinGroup(group.id)}
            className={cn(
              "h-7 shrink-0 rounded-full px-3 text-[11px] font-semibold transition-colors",
              group.isJoined
                ? "bg-muted text-muted-foreground"
                : "border border-primary/40 text-primary hover:bg-primary/10"
            )}
          >
            {group.isJoined ? "Bergabung" : "Gabung"}
          </button>
        </div>
      ))}
    </div>
  );
}
