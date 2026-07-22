// 1. Import External Library
import Image from "next/image";
import { MapPin, Sparkles, Calendar } from "lucide-react";

// 2. Import Types
import type { DataNetworkPerson } from "../types/networkTypes";

// Import Shared Lib
import { getWetonFromDate } from "@/shared/lib/wetonCalculator";

// Import Components
import NetworkCompatibilityBadge from "./networkCompatibilityBadge";

// Import Shadcn/UI Components
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

// 7. Props
interface Props {
  person: DataNetworkPerson;
  children: React.ReactNode;
}

export default function NetworkProfileHoverCard({ person, children }: Props) {
  // 10. Computed / Derived
  const personWeton = getWetonFromDate(person.birthDate);

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent>
        <div className="relative h-16 w-full bg-muted">
          <Image
            src={person.coverUrl}
            alt=""
            fill
            sizes="288px"
            className="object-cover"
          />

          <div className="absolute -bottom-6 left-4 h-14 w-14">
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-popover bg-popover">
              <Image
                src={person.avatarUrl}
                alt={person.name}
                fill
                sizes="56px"
                className="rounded-full object-cover"
              />
            </div>

            <NetworkCompatibilityBadge
              birthDate={person.birthDate}
              className="absolute -bottom-1 -right-1"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 px-4 pb-4 pt-8">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1">
              <span className="text-[15px] font-semibold leading-snug tracking-tight">
                {person.name}
              </span>
            </div>

            <p className="text-xs leading-snug text-muted-foreground">
              {person.title}
            </p>
          </div>

          <p className="text-xs leading-relaxed text-foreground">
            {person.bio}
          </p>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            {personWeton && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {personWeton.weton} &bull; Neptu {personWeton.neptu}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>{person.interests}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span>{person.location}</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
