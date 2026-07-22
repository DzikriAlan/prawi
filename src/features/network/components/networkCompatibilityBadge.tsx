// 4. Import States / Stores
import { useProfileStore } from "@/shared/lib/profileStore";

// Import Shared Lib
import { getWetonFromDate, getPrimbonMatch } from "@/shared/lib/wetonCalculator";

import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  birthDate: string;
  className?: string;
}

export default function NetworkCompatibilityBadge({ birthDate, className }: Props) {
  // 9. Store / Controller
  const myBirthDate = useProfileStore((state) => state.myBirthDate);

  // 11. Methods / Handlers (utilitas rendering, hanya dipakai di komponen ini)
  function getBadgeColorClass(score: number): string {
    if (score >= 90) return "bg-emerald-500";
    if (score >= 70) return "bg-amber-500";
    return "bg-rose-500";
  }

  // 10. Computed / Derived
  const myWeton = getWetonFromDate(myBirthDate);
  const personWeton = getWetonFromDate(birthDate);

  if (!myWeton || !personWeton) return null;

  const match = getPrimbonMatch(myWeton.neptu, personWeton.neptu);

  return (
    <span
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white ring-2 ring-card",
        getBadgeColorClass(match.score),
        className
      )}
    >
      {match.score}
    </span>
  );
}
