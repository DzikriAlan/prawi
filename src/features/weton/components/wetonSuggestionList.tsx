// 1. Import External Library
import Image from "next/image";

// 2. Import Types
import type { DataWetonPerson } from "../types/wetonTypes";

// 7. Props
interface Props {
  people: DataWetonPerson[];
  onGreetPerson: (personId: string) => void;
  onShowAllSuggestions: () => void;
}

export default function WetonSuggestionList({
  people,
  onGreetPerson,
  onShowAllSuggestions,
}: Props) {
  return (
    <div className="flex flex-col rounded-2xl border bg-background p-3.5">
      <div className="flex items-center justify-between pb-1.5">
        <span className="text-sm font-semibold text-foreground">
          Disarankan Untukmu
        </span>

        <button
          type="button"
          onClick={onShowAllSuggestions}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Lihat semua
        </button>
      </div>

      {people.map((person) => (
        <div key={person.id} className="flex items-center gap-2.5 py-1.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src={person.avatarUrl}
              alt={person.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-foreground">
              {person.name}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {person.title}
            </span>
          </div>

          <button
            type="button"
            onClick={() => onGreetPerson(person.id)}
            className="h-7 shrink-0 rounded-full border border-primary/40 px-3 text-[11px] font-semibold text-primary transition-colors hover:bg-primary/10"
          >
            Hubungkan
          </button>
        </div>
      ))}
    </div>
  );
}
