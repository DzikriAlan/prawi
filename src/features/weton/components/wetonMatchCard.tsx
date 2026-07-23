// 1. Import External Library
import { CalendarDays, Sparkle } from "lucide-react";

// 2. Import Types
import type { DataMatchWeton } from "../types/wetonTypes";

// 7. Props
interface Props {
  match: DataMatchWeton;
  onViewDetail: (result: string) => void;
}

export default function WetonMatchCard({ match, onViewDetail }: Props) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-background p-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <CalendarDays className="h-5 w-5" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="truncate text-sm font-semibold text-foreground">
          {match.date}
        </span>

        <span className="truncate text-xs text-muted-foreground">
          {match.weton}
        </span>

        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
            {match.result}
          </span>
          <span className="rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
            Neptu {match.totalNeptu}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[11px] text-muted-foreground">
            <Sparkle className="h-3 w-3" />
            Skor {match.score}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onViewDetail(match.result)}
        className="h-8 shrink-0 rounded-full border border-primary/40 px-4 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
      >
        Detail
      </button>
    </div>
  );
}
