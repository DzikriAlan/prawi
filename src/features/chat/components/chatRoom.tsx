// 1. Import External Library
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, Camera, Mic, Phone, SendHorizontal, Smile, Video } from "lucide-react";

// 2. Import Types
import type { DataChatConversation, DataChatMessage } from "../types/chatTypes";

// Import Components
import ChatMessageBubble from "./chatMessageBubble";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  conversation: DataChatConversation;
  isReplying: boolean;
  onCloseConversation: () => void;
  onSendMessage: (conversationId: string, text: string) => void;
}

const TYPING_DOTS = ["0ms", "150ms", "300ms"];

export default function ChatRoom({
  conversation,
  isReplying,
  onCloseConversation,
  onSendMessage,
}: Props) {
  // 8. State
  const [draftMessage, setDraftMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 10. Computed / Derived
  const presenceLabel = getPresenceLabel();
  const messageGroups = getMessageGroups();
  const latestMineMessageId = conversation.messages.filter((message) => message.isMine).at(-1)?.id;
  const isSendDisabled = !draftMessage.trim();

  // 11. Methods / Handlers
  function getPresenceLabel() {
    if (isReplying) return "Sedang mengetik...";
    return conversation.isOnline ? "Online" : "Terakhir dilihat baru saja";
  }

  function getMessageGroups() {
    const groups: { dayLabel: string; messages: DataChatMessage[] }[] = [];

    conversation.messages.forEach((message) => {
      const lastGroup = groups.at(-1);

      if (lastGroup && lastGroup.dayLabel === message.dayLabel) {
        lastGroup.messages.push(message);
        return;
      }

      groups.push({ dayLabel: message.dayLabel, messages: [message] });
    });

    return groups;
  }

  const handleSendMessage = () => {
    const trimmedMessage = draftMessage.trim();
    if (!trimmedMessage) return;

    onSendMessage(conversation.id, trimmedMessage);
    setDraftMessage("");
  };

  const handleDraftKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;

    event.preventDefault();
    handleSendMessage();
  };

  // 12. Effects
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages.length, isReplying]);

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
        <button
          type="button"
          onClick={onCloseConversation}
          aria-label="Kembali"
          className="flex h-9 w-9 items-center justify-center rounded-full md:hidden text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="relative h-10 w-10 shrink-0">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image
              src={conversation.avatarUrl}
              alt={conversation.name}
              fill
              sizes="40px"
              className="object-cover"
            />
          </div>

          {conversation.isOnline && (
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-chat-online" />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[15px] font-semibold text-foreground">
            {conversation.name}
          </span>
          <span className="text-[11px] text-muted-foreground">{presenceLabel}</span>
        </div>

        <button
          type="button"
          aria-label="Panggilan suara"
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
        >
          <Phone className="h-5 w-5" />
        </button>

        <button
          type="button"
          aria-label="Panggilan video"
          className="flex h-9 w-9 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary/10"
        >
          <Video className="h-5 w-5" />
        </button>
      </div>

      <div className="no-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5">
        {messageGroups.map((group) => (
          <div key={group.dayLabel} className="flex flex-col gap-2">
            <div className="flex justify-center">
              <span className="rounded-full bg-muted px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {group.dayLabel}
              </span>
            </div>

            {group.messages.map((message) => (
              <ChatMessageBubble
                key={message.id}
                message={message}
                isLatestMine={message.id === latestMineMessageId}
              />
            ))}
          </div>
        ))}

        {isReplying && (
          <div className="flex justify-start">
            <span className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
              {TYPING_DOTS.map((delay) => (
                <span
                  key={delay}
                  style={{ animationDelay: delay }}
                  className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary"
                />
              ))}
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center gap-2.5 border-t border-border bg-background px-4 pb-24 pt-3.5 md:pb-4">
        <button
          type="button"
          aria-label="Kirim foto"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90"
        >
          <Camera className="h-5 w-5" />
        </button>

        <div className="flex h-11 flex-1 items-center gap-2 rounded-full border border-border bg-background px-4">
          <input
            type="text"
            value={draftMessage}
            placeholder="Ketik pesan..."
            onChange={(event) => setDraftMessage(event.target.value)}
            onKeyDown={handleDraftKeyDown}
            className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />

          <button
            type="button"
            aria-label="Emoji"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
          >
            <Smile className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label="Pesan suara"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-primary"
          >
            <Mic className="h-5 w-5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={isSendDisabled}
          aria-label="Kirim pesan"
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-all",
            isSendDisabled
              ? "bg-primary/30"
              : "bg-primary shadow-lg shadow-primary/25 hover:opacity-90"
          )}
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
