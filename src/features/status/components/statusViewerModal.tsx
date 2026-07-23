// 1. Import External Library
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Heart, MoreVertical, Repeat2 } from "lucide-react";

// 2. Import Types
import type { DataStatusUpdate } from "../types/statusTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

const QUICK_REACTIONS = ["😍", "😂", "😮"];
const TRANSITION_DURATION_MS = 220;
const SWIPE_THRESHOLD_PX = 40;
const WHEEL_GESTURE_IDLE_MS = 90;

// 7. Props
interface Props {
  statuses: DataStatusUpdate[];
  activeStatusId: string | null;
  open: boolean;
  onClose: () => void;
  onViewStatus: (statusId: string) => void;
  onToggleLikeStatus: (statusId: string) => void;
  onReactToStatus: (statusId: string, emoji: string) => void;
  onRepostStatus: (statusId: string) => void;
}

export default function StatusViewerModal({
  statuses,
  activeStatusId,
  open,
  onClose,
  onViewStatus,
  onToggleLikeStatus,
  onReactToStatus,
  onRepostStatus,
}: Props) {
  // 8. State
  const [currentIndex, setCurrentIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const wheelGestureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 10. Computed / Derived
  const getTrackTransform = (index: number, offsetPx = 0) =>
    `translateY(calc(-${index * 100}vh + ${offsetPx}px))`;

  // 11. Methods / Handlers
  const handleToggleLike = (statusId: string) => {
    onToggleLikeStatus(statusId);
  };

  const handleReact = (statusId: string, emoji: string) => {
    onReactToStatus(statusId, emoji);
  };

  const handleRepost = (statusId: string) => {
    onRepostStatus(statusId);
  };

  const handleStepTo = (nextIndex: number) => {
    const clampedIndex = Math.max(0, Math.min(nextIndex, statuses.length - 1));

    if (trackRef.current) {
      trackRef.current.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease-out`;
    }

    if (clampedIndex === currentIndexRef.current || isAnimatingRef.current) {
      if (trackRef.current) {
        trackRef.current.style.transform = getTrackTransform(currentIndexRef.current);
      }
      return;
    }

    isAnimatingRef.current = true;
    currentIndexRef.current = clampedIndex;
    setCurrentIndex(clampedIndex);

    setTimeout(() => {
      isAnimatingRef.current = false;
    }, TRANSITION_DURATION_MS);
  };

  const handleResolveDrag = (netDeltaPx: number) => {
    dragOffsetRef.current = 0;

    const direction = netDeltaPx > 0 ? 1 : -1;
    const hasPassedThreshold = Math.abs(netDeltaPx) >= SWIPE_THRESHOLD_PX;

    handleStepTo(currentIndexRef.current + (hasPassedThreshold ? direction : 0));
  };

  // 12. Effects
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !activeStatusId) return;

    const initialIndex = statuses.findIndex((status) => status.id === activeStatusId);
    const resolvedIndex = initialIndex === -1 ? 0 : initialIndex;

    currentIndexRef.current = resolvedIndex;
    setCurrentIndex(resolvedIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const status = statuses[currentIndex];
    if (status) onViewStatus(status.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentIndex]);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (!isDraggingRef.current) {
        if (isAnimatingRef.current) return;

        isDraggingRef.current = true;
        dragOffsetRef.current = 0;
        if (trackRef.current) trackRef.current.style.transition = "none";
      }

      const maxOffsetPx = window.innerHeight;
      dragOffsetRef.current = Math.max(
        -maxOffsetPx,
        Math.min(maxOffsetPx, dragOffsetRef.current - event.deltaY)
      );

      if (trackRef.current) {
        trackRef.current.style.transform = getTrackTransform(
          currentIndexRef.current,
          dragOffsetRef.current
        );
      }

      if (wheelGestureTimeoutRef.current) {
        clearTimeout(wheelGestureTimeoutRef.current);
      }

      wheelGestureTimeoutRef.current = setTimeout(() => {
        isDraggingRef.current = false;
        wheelGestureTimeoutRef.current = null;
        handleResolveDrag(-dragOffsetRef.current);
      }, WHEEL_GESTURE_IDLE_MS);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target instanceof Element && event.target.closest("button")) return;
      if (isAnimatingRef.current) return;

      isDraggingRef.current = true;
      dragStartYRef.current = event.clientY;
      dragOffsetRef.current = 0;

      if (trackRef.current) trackRef.current.style.transition = "none";
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      event.preventDefault();

      dragOffsetRef.current = event.clientY - dragStartYRef.current;

      if (trackRef.current) {
        trackRef.current.style.transform = getTrackTransform(
          currentIndexRef.current,
          dragOffsetRef.current
        );
      }
    };

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      handleResolveDrag(-dragOffsetRef.current);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove, { passive: false });
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);

      if (wheelGestureTimeoutRef.current) {
        clearTimeout(wheelGestureTimeoutRef.current);
        wheelGestureTimeoutRef.current = null;
      }
    };
  }, [open, statuses.length]);

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden bg-black md:border-x md:border-border/20">
      <div
        ref={containerRef}
        className="h-full touch-none"
      >
        <div
          ref={trackRef}
          className="flex flex-col"
          style={{
            transform: getTrackTransform(currentIndex),
            transition: `transform ${TRANSITION_DURATION_MS}ms ease-out`,
          }}
        >
          {statuses.map((status) => (
            <div
              key={status.id}
              className="relative flex h-screen w-full shrink-0 flex-col"
            >
              <Image
                src={status.imageUrl}
                alt=""
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />

              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="relative z-10 flex flex-col gap-1 px-3 pt-3">
                <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/30">
                  <div className="h-full w-full bg-white" />
                </div>

                <div className="flex items-center gap-3 py-2">
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup"
                    className="text-white"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>

                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={status.avatarUrl}
                      alt={status.name}
                      fill
                      sizes="36px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col">
                    <span className="truncate text-sm font-semibold text-white">
                      {status.name}
                    </span>
                    <span className="text-xs text-white/70">{status.timeLabel}</span>
                  </div>

                  <button
                    type="button"
                    aria-label="Opsi lainnya"
                    className="text-white"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 mt-auto flex flex-col gap-3 px-4 pb-6">
                {status.caption && (
                  <p className="text-sm leading-relaxed text-white">{status.caption}</p>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex-1 rounded-full border border-white/40 px-4 py-2 text-sm text-white/70">
                    Balas
                  </div>

                  {QUICK_REACTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      aria-label={`Reaksi ${emoji}`}
                      onClick={() => handleReact(status.id, emoji)}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-white/20"
                    >
                      {emoji}
                    </button>
                  ))}

                  <button
                    type="button"
                    aria-label="Posting ulang"
                    onClick={() => handleRepost(status.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Repeat2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    aria-label={status.isLiked ? "Batalkan suka" : "Suka"}
                    onClick={() => handleToggleLike(status.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <Heart
                      className={cn(
                        "h-4 w-4",
                        status.isLiked && "fill-rose-500 text-rose-500"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
