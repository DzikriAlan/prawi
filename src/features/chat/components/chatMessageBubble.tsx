// 1. Import External Library
import { CheckCheck } from "lucide-react";

// 2. Import Types
import type { DataChatMessage } from "../types/chatTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  message: DataChatMessage;
  isLatestMine: boolean;
}

export default function ChatMessageBubble({ message, isLatestMine }: Props) {
  // 10. Computed / Derived
  const bubbleToneClass = isLatestMine ? "bg-chat-primary" : "bg-chat-bubble";

  return (
    <div
      className={cn(
        "flex w-full",
        message.isMine ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "flex max-w-[78%] items-end gap-2 rounded-2xl px-3.5 py-2.5",
          message.isMine
            ? `rounded-br-md text-white ${bubbleToneClass}`
            : "rounded-bl-md bg-muted text-foreground"
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
          {message.text}
        </p>

        <span
          className={cn(
            "flex shrink-0 items-center gap-1 pb-0.5 text-[10px] leading-none",
            message.isMine ? "text-white/75" : "text-muted-foreground"
          )}
        >
          {message.timeLabel}

          {message.isMine && (
            <CheckCheck
              className={cn(
                "h-3 w-3",
                message.isRead ? "text-white" : "text-white/60"
              )}
            />
          )}
        </span>
      </div>
    </div>
  );
}
