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
const WHEEL_GESTURE_IDLE_MS = 180;

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
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentIndexRef = useRef(0);
  const viewportHeightRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const pendingStepDirectionRef = useRef<number | null>(null);
  const wheelGestureTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appliedStatusIdRef = useRef<string | null>(null);

  // 10. Computed / Derived
  const currentStatus = statuses[currentIndex] ?? null;
  const currentItemCount = currentStatus?.items.length ?? 0;

  const getTrackTransform = (index: number, offsetPx = 0) =>
    `translateY(${-index * viewportHeightRef.current + offsetPx}px)`;

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

    if (isAnimatingRef.current) {
      if (clampedIndex !== currentIndexRef.current) {
        pendingStepDirectionRef.current = clampedIndex > currentIndexRef.current ? 1 : -1;
      }

      if (trackRef.current) {
        trackRef.current.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease-out`;
        trackRef.current.style.transform = getTrackTransform(currentIndexRef.current);
      }

      return;
    }

    if (trackRef.current) {
      trackRef.current.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease-out`;
      trackRef.current.style.transform = getTrackTransform(clampedIndex);
    }

    if (clampedIndex === currentIndexRef.current) return;

    isAnimatingRef.current = true;
    currentIndexRef.current = clampedIndex;
    setCurrentIndex(clampedIndex);
    setCurrentItemIndex(0);

    setTimeout(() => {
      isAnimatingRef.current = false;

      const pendingDirection = pendingStepDirectionRef.current;
      pendingStepDirectionRef.current = null;

      if (pendingDirection !== null) {
        handleStepTo(currentIndexRef.current + pendingDirection);
      }
    }, TRANSITION_DURATION_MS);
  };

  const handleResolveDrag = (netDeltaPx: number) => {
    dragOffsetRef.current = 0;

    const direction = netDeltaPx > 0 ? 1 : -1;
    const hasMoreThanHalfVisible =
      Math.abs(netDeltaPx) > viewportHeightRef.current / 2;

    handleStepTo(currentIndexRef.current + (hasMoreThanHalfVisible ? direction : 0));
  };

  const handleNextItem = () => {
    if (currentItemIndex < currentItemCount - 1) {
      setCurrentItemIndex((state) => state + 1);
      return;
    }

    handleStepTo(currentIndexRef.current + 1);
  };

  const handlePreviousItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex((state) => state - 1);
      return;
    }

    handleStepTo(currentIndexRef.current - 1);
  };

  // 12. Effects
  useEffect(() => {
    if (!open) {
      appliedStatusIdRef.current = null;
      return;
    }

    if (!activeStatusId || appliedStatusIdRef.current === activeStatusId) return;

    const initialIndex = statuses.findIndex((status) => status.id === activeStatusId);
    const resolvedIndex = initialIndex === -1 ? 0 : initialIndex;

    appliedStatusIdRef.current = activeStatusId;
    currentIndexRef.current = resolvedIndex;
    setCurrentIndex(resolvedIndex);
    setCurrentItemIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, activeStatusId]);

  useEffect(() => {
    if (!open || !trackRef.current) return;

    trackRef.current.style.transition = `transform ${TRANSITION_DURATION_MS}ms ease-out`;
    trackRef.current.style.transform = getTrackTransform(currentIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, currentIndex, viewportHeight]);

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

    const applyViewportHeight = () => {
      const nextHeight = container.clientHeight;

      viewportHeightRef.current = nextHeight;
      setViewportHeight(nextHeight);

      if (trackRef.current) {
        trackRef.current.style.transition = "none";
        trackRef.current.style.transform = getTrackTransform(currentIndexRef.current);
      }
    };

    applyViewportHeight();

    const observer = new ResizeObserver(applyViewportHeight);
    observer.observe(container);

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();

      if (!isDraggingRef.current) {
        isDraggingRef.current = true;
        dragOffsetRef.current = 0;
        if (trackRef.current) trackRef.current.style.transition = "none";
      }

      const maxOffsetPx = viewportHeightRef.current;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, statuses.length]);

  if (!open) return null;

  return (
    <div className="h-full w-full overflow-hidden bg-black">
      <div ref={containerRef} className="h-full touch-none">
        <div ref={trackRef} className="flex flex-col">
          {statuses.map((status, statusIndex) => {
            const isCurrentStatus = statusIndex === currentIndex;
            const itemIndex = isCurrentStatus ? currentItemIndex : 0;
            const item = status.items[itemIndex] ?? status.items[0];

            return (
              <div
                key={status.id}
                style={{ height: viewportHeight || undefined }}
                className="relative flex w-full shrink-0 flex-col"
              >
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 560px"
                  priority
                  className="object-cover"
                />

                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
                <div
                  className="absolute inset-x-0 bottom-0 h-64 backdrop-blur-md"
                  style={{
                    maskImage:
                      "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/85 via-black/55 to-transparent" />

                <button
                  type="button"
                  onClick={handlePreviousItem}
                  aria-label="Status sebelumnya"
                  className="absolute inset-y-20 left-0 z-[5] w-1/3 cursor-default"
                />
                <button
                  type="button"
                  onClick={handleNextItem}
                  aria-label="Status berikutnya"
                  className="absolute inset-y-20 right-0 z-[5] w-2/3 cursor-default"
                />

                <div className="relative z-10 flex flex-col gap-1 px-3 pt-3">
                  <div className="flex items-center gap-1">
                    {status.items.map((statusItem, itemPosition) => (
                      <div
                        key={statusItem.id}
                        className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/30"
                      >
                        <div
                          className={cn(
                            "h-full rounded-full bg-white transition-all duration-200",
                            itemPosition <= itemIndex ? "w-full" : "w-0"
                          )}
                        />
                      </div>
                    ))}
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
                  {item.caption && (
                    <p className="text-sm leading-relaxed text-white">{item.caption}</p>
                  )}

                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="min-w-0 flex-1 truncate rounded-full border border-white/40 px-4 py-2 text-sm text-white/70">
                      Balas
                    </div>

                    {QUICK_REACTIONS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        aria-label={`Reaksi ${emoji}`}
                        onClick={() => handleReact(status.id, emoji)}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg transition-colors hover:bg-white/20"
                      >
                        {emoji}
                      </button>
                    ))}

                    <button
                      type="button"
                      aria-label="Posting ulang"
                      onClick={() => handleRepost(status.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Repeat2 className="h-4 w-4" />
                    </button>

                    <button
                      type="button"
                      aria-label={status.isLiked ? "Batalkan suka" : "Suka"}
                      onClick={() => handleToggleLike(status.id)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                    >
                      <Heart
                        className={cn(
                          "h-4 w-4",
                          status.isLiked && "fill-chat-accent text-chat-accent"
                        )}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
