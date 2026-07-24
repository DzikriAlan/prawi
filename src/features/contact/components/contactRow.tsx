// 1. Import External Library
import Image from "next/image";
import { BadgeCheck } from "lucide-react";

// 2. Import Types
import type { DataContact } from "../types/contactTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  contact: DataContact;
  onOpenContact: (contactId: string) => void;
}

export default function ContactRow({ contact, onOpenContact }: Props) {
  // 10. Computed / Derived
  const hasSubtitle = contact.subtitle.trim().length > 0;

  // 11. Methods / Handlers
  const handleOpenContact = () => {
    onOpenContact(contact.id);
  };

  return (
    <button
      type="button"
      onClick={handleOpenContact}
      className="flex w-full items-center gap-3.5 px-4 py-2.5 text-left transition-colors hover:bg-muted/60 active:bg-muted sm:px-5"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={contact.avatarUrl}
          alt={contact.name}
          fill
          sizes="48px"
          className={cn("object-cover", contact.isBusiness && "bg-background p-0.5")}
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-[15px] font-semibold leading-snug text-foreground">
            {contact.name}
          </span>

          {contact.isBusiness && (
            <BadgeCheck className="h-4 w-4 shrink-0 text-primary" />
          )}
        </div>

        {hasSubtitle && (
          <span className="truncate text-[13px] text-muted-foreground">
            {contact.subtitle}
          </span>
        )}
      </div>
    </button>
  );
}
