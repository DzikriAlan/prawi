// 1. Import External Library
import Image from "next/image";
import { X } from "lucide-react";
import { FaInstagram, FaTiktok, FaFacebook, FaLinkedin } from "react-icons/fa";

// 2. Import Types
import type { DataNetworkPerson } from "../types/networkTypes";

// Import Components
import { Card } from "@/components/ui/card";
import NetworkProfileHoverCard from "./networkProfileHoverCard";
import NetworkCompatibilityBadge from "./networkCompatibilityBadge";

const SOCIAL_ICONS = [
  { name: "Instagram", icon: FaInstagram },
  { name: "TikTok", icon: FaTiktok },
  { name: "Facebook", icon: FaFacebook },
  { name: "LinkedIn", icon: FaLinkedin },
];

// 7. Props
interface Props {
  person: DataNetworkPerson;
  onDismissPerson: (id: string) => void;
}

export default function NetworkCard({ person, onDismissPerson }: Props) {
  // 11. Methods / Handlers
  const handleDismiss = () => {
    onDismissPerson(person.id);
  };

  return (
    <Card className="flex flex-col overflow-hidden shadow-none">
      <div className="relative h-20 w-full bg-muted">
        <Image
          src={person.coverUrl}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover"
        />

        <button
          type="button"
          onClick={handleDismiss}
          aria-label={`Sembunyikan ${person.name}`}
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="absolute -bottom-8 left-4 h-16 w-16">
          <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-card bg-card">
            <Image
              src={person.avatarUrl}
              alt={person.name}
              fill
              sizes="64px"
              className="rounded-full object-cover"
            />
          </div>

          <NetworkCompatibilityBadge
            birthDate={person.birthDate}
            className="absolute -bottom-1 -right-1"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-4 pb-4 pt-10">
        <div className="flex flex-col gap-1">
          <div className="flex min-h-[2.5rem] items-start gap-1">
            <NetworkProfileHoverCard person={person}>
              <span className="line-clamp-2 cursor-default text-[15px] font-semibold leading-snug tracking-tight hover:underline">
                {person.name}
              </span>
            </NetworkProfileHoverCard>
          </div>

          <p className="line-clamp-2 min-h-[2rem] text-xs leading-snug text-muted-foreground">
            {person.title}
          </p>
        </div>

        <div className="mt-auto flex items-center gap-1.5">
          {SOCIAL_ICONS.map(({ name, icon: Icon }) => (
            <button
              key={name}
              type="button"
              aria-label={`${name} ${person.name}`}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-input text-muted-foreground transition-all duration-150 hover:scale-105 hover:border-foreground/20 hover:bg-accent hover:text-accent-foreground"
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
