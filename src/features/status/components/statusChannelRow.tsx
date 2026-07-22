// 1. Import External Library
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

// 2. Import Types
import type { DataStatusChannel } from "../types/statusTypes";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";

// 7. Props
interface Props {
  channel: DataStatusChannel;
  onToggleFollow: (channelId: string) => void;
}

export default function StatusChannelRow({ channel, onToggleFollow }: Props) {
  // 11. Methods / Handlers
  const handleToggleFollow = () => {
    onToggleFollow(channel.id);
  };

  return (
    <div className="flex w-full items-center gap-3 px-4 py-2.5">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-border">
        <Image
          src={channel.avatarUrl}
          alt={channel.name}
          fill
          sizes="44px"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1">
          <span className="truncate text-sm font-medium leading-snug text-foreground">
            {channel.name}
          </span>

          {channel.verified && (
            <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary" />
          )}
        </div>

        <span className="text-xs text-muted-foreground">
          {channel.followerLabel} pengikut
        </span>
      </div>

      <Button
        type="button"
        variant={channel.isFollowing ? "secondary" : "outline"}
        size="sm"
        className="shrink-0 rounded-full px-4"
        onClick={handleToggleFollow}
      >
        {channel.isFollowing ? "Mengikuti" : "Ikuti"}
      </Button>
    </div>
  );
}
