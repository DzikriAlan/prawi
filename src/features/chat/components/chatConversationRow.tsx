// 1. Import External Library
import Image from "next/image";
import { CheckCheck } from "lucide-react";

// 2. Import Types
import type { DataChatConversation } from "../types/chatTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  conversation: DataChatConversation;
  isActive: boolean;
  onOpenConversation: (conversationId: string) => void;
}

export default function ChatConversationRow({
  conversation,
  isActive,
  onOpenConversation,
}: Props) {
  // 10. Computed / Derived
  const lastMessage = conversation.messages.at(-1);
  const lastMessageText = lastMessage?.text ?? "Belum ada pesan";
  const isLastMessageMine = lastMessage?.isMine ?? false;
  const hasUnread = conversation.unreadCount > 0;

  // 11. Methods / Handlers
  const handleOpenConversation = () => {
    onOpenConversation(conversation.id);
  };

  return (
    <button
      type="button"
      onClick={handleOpenConversation}
      className={cn(
        "flex w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors sm:px-5",
        isActive ? "bg-muted/60" : "hover:bg-muted/60"
      )}
    >
      <div className="relative h-12 w-12 shrink-0">
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={conversation.avatarUrl}
            alt={conversation.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>

        {conversation.isOnline && (
          <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-chat-online" />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[15px] font-semibold leading-snug text-foreground">
            {conversation.name}
          </span>

          <span
            className={cn(
              "shrink-0 text-[11px]",
              hasUnread ? "font-medium text-muted-foreground" : "text-muted-foreground"
            )}
          >
            {conversation.timeLabel}
          </span>
        </div>

        <div className="flex min-h-[22px] items-center gap-1.5">
          {isLastMessageMine && (
            <CheckCheck
              className={cn(
                "h-3.5 w-3.5 shrink-0",
                lastMessage?.isRead ? "text-chat-bubble" : "text-muted-foreground"
              )}
            />
          )}

          <span
            className={cn(
              "truncate text-[13px]",
              hasUnread ? "text-muted-foreground" : "text-muted-foreground"
            )}
          >
            {lastMessageText}
          </span>

          {hasUnread && (
            <span className="ml-auto flex h-[22px] min-w-[22px] shrink-0 items-center justify-center rounded-full bg-chat-accent px-1.5 text-[11px] font-semibold text-white">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
