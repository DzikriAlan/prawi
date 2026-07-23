// 1. Import External Library
import Image from "next/image";

// 2. Import Types
import type { DataChatConversation } from "../types/chatTypes";

// 7. Props
interface Props {
  friends: DataChatConversation[];
  onOpenConversation: (conversationId: string) => void;
}

export default function ChatFriendActivityPanel({
  friends,
  onOpenConversation,
}: Props) {
  // 10. Computed / Derived
  const onlineCountLabel = `${friends.length} online`;

  return (
    <div className="flex w-full flex-col gap-1 rounded-2xl border bg-background p-4">
      <div className="flex items-center justify-between pb-2">
        <span className="text-sm font-semibold text-foreground">
          Aktivitas teman
        </span>

        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-chat-online" />
          {onlineCountLabel}
        </span>
      </div>

      {friends.map((friend) => (
        <button
          key={friend.id}
          type="button"
          onClick={() => onOpenConversation(friend.id)}
          className="flex items-center gap-3 rounded-xl px-1 py-2 text-left transition-colors hover:bg-muted"
        >
          <div className="relative h-10 w-10 shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={friend.avatarUrl}
                alt={friend.name}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>

            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-chat-online" />
          </div>

          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[13px] font-semibold text-foreground">
              {friend.name}
            </span>
            <span className="text-[11px] text-muted-foreground">Online</span>
          </div>
        </button>
      ))}
    </div>
  );
}
