// 1. Import External Library
import Image from "next/image";
import { Plus } from "lucide-react";

// 2. Import Types
import type { DataChatStory } from "../types/chatTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  stories: DataChatStory[];
  onCreateStory: () => void;
  onOpenStory: (storyId: string) => void;
}

export default function ChatStoryRail({
  stories,
  onCreateStory,
  onOpenStory,
}: Props) {
  return (
    <div className="no-scrollbar flex shrink-0 items-start gap-4 overflow-x-auto px-4 pb-5 pt-1 sm:gap-5 sm:px-5">
      <button
        type="button"
        onClick={onCreateStory}
        className="flex w-14 shrink-0 flex-col items-center gap-2"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors hover:bg-primary/20">
          <Plus className="h-5 w-5" />
        </span>

        <span className="w-full truncate text-center text-[11px] text-muted-foreground">
          Buat Story
        </span>
      </button>

      {stories.map((story) => (
        <button
          key={story.id}
          type="button"
          onClick={() => onOpenStory(story.id)}
          className="flex w-14 shrink-0 flex-col items-center gap-2"
        >
          <span className="relative block h-14 w-14">
            <span
              className={cn(
                "block h-full w-full rounded-full p-[2.5px]",
                story.hasUnseenStory
                  ? "bg-gradient-to-br from-primary to-[#EC4899]"
                  : "bg-muted"
              )}
            >
              <span className="relative block h-full w-full overflow-hidden rounded-full border-2 border-background">
                <Image
                  src={story.avatarUrl}
                  alt={story.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </span>
            </span>

            {story.isOnline && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-background bg-chat-online" />
            )}
          </span>

          <span className="w-full truncate text-center text-[11px] font-medium text-foreground">
            {story.name}
          </span>
        </button>
      ))}
    </div>
  );
}
