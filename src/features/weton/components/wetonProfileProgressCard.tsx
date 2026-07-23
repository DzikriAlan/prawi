// 1. Import External Library
import { UserRoundCheck } from "lucide-react";

// 7. Props
interface Props {
  completedStep: number;
  totalStep: number;
  onCompleteProfile: () => void;
}

export default function WetonProfileProgressCard({
  completedStep,
  totalStep,
  onCompleteProfile,
}: Props) {
  // 10. Computed / Derived
  const progressLabel = `${completedStep}/${totalStep} selesai`;
  const progressPercent = Math.round((completedStep / totalStep) * 100);

  return (
    <div className="relative flex flex-col gap-2.5 overflow-hidden rounded-2xl bg-primary p-3.5 text-primary-foreground">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold">Lengkapi Profilmu</span>

        <span className="shrink-0 rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold">
          {progressLabel}
        </span>
      </div>

      <p className="max-w-[80%] text-[11px] leading-relaxed text-primary-foreground/80">
        Tingkatkan peluang terhubung dengan orang yang tepat.
      </p>

      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/25">
        <div
          style={{ width: `${progressPercent}%` }}
          className="h-full rounded-full bg-white transition-all"
        />
      </div>

      <button
        type="button"
        onClick={onCompleteProfile}
        className="w-fit rounded-lg bg-background px-3 py-1.5 text-[11px] font-semibold text-primary transition-opacity hover:opacity-90"
      >
        Lengkapi Sekarang
      </button>

      <UserRoundCheck className="pointer-events-none absolute -bottom-4 -right-3 h-24 w-24 text-white/15" />
    </div>
  );
}
