// 1. Import External Library
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

// 2. Import Types
import type { DataWetonPerson } from "../types/wetonTypes";

// 7. Props
interface Props {
  person: DataWetonPerson;
  onGreetPerson: (personId: string) => void;
}

export default function WetonPersonCard({ person, onGreetPerson }: Props) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border bg-background">
      <div className="relative h-14 w-full bg-muted sm:h-16">
        <Image
          src={person.coverUrl}
          alt=""
          fill
          sizes="(max-width: 1280px) 50vw, 280px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col items-center gap-1.5 px-2.5 pb-3 text-center sm:px-3 sm:pb-3.5">
        <div className="relative -mt-6 h-12 w-12 shrink-0 overflow-hidden rounded-full border-4 border-background sm:-mt-7 sm:h-14 sm:w-14">
          <Image
            src={person.avatarUrl}
            alt={person.name}
            fill
            sizes="(max-width: 640px) 48px, 56px"
            className="object-cover"
          />
        </div>

        <div className="flex w-full min-w-0 flex-col items-center gap-0.5">
          <div className="flex max-w-full items-center justify-center gap-1.5">
            <span className="truncate text-xs font-semibold text-foreground sm:text-[13px]">
              {person.name}
            </span>

            {person.verified && (
              <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-primary sm:h-4 sm:w-4" />
            )}
          </div>

          <span className="line-clamp-2 text-[11px] leading-snug text-muted-foreground">
            {person.title}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onGreetPerson(person.id)}
          className="mt-1 h-8 w-full rounded-full border border-primary/40 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
        >
          Hubungkan
        </button>
      </div>
    </div>
  );
}
