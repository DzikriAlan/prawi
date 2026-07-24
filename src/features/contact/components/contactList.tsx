// 1. Import External Library
import Image from "next/image";
import {
  ArrowLeft,
  LayoutGrid,
  Search,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";

// 2. Import Types
import type { DataContact } from "../types/contactTypes";

// Import Components
import ContactRow from "./contactRow";

// 7. Props
interface Props {
  self: DataContact;
  contacts: DataContact[];
  searchKeyword: string;
  onChangeSearchKeyword: (keyword: string) => void;
  onCloseNewChat: () => void;
  onOpenContact: (contactId: string) => void;
  onCreateGroup: () => void;
  onCreateContact: () => void;
  onCreateCommunity: () => void;
  onOpenMoreOptions: () => void;
}

export default function ContactList({
  self,
  contacts,
  searchKeyword,
  onChangeSearchKeyword,
  onCloseNewChat,
  onOpenContact,
  onCreateGroup,
  onCreateContact,
  onCreateCommunity,
  onOpenMoreOptions,
}: Props) {
  // 10. Computed / Derived
  const groupedContacts = getGroupedContacts();
  const isEmptyContact = groupedContacts.length === 0;
  const contactCountLabel = `${contacts.length} kontak`;

  const quickActions = [
    { id: "group", label: "Grup baru", icon: Users, onClick: onCreateGroup },
    { id: "contact", label: "Kontak baru", icon: UserPlus, onClick: onCreateContact },
    {
      id: "community",
      label: "Komunitas baru",
      icon: UsersRound,
      onClick: onCreateCommunity,
    },
  ];

  // 11. Methods / Handlers
  function getGroupedContacts() {
    const keyword = searchKeyword.trim().toLowerCase();

    const matchedContacts = keyword
      ? contacts.filter((contact) =>
          `${contact.name} ${contact.username}`.toLowerCase().includes(keyword)
        )
      : contacts;

    const sortedContacts = [...matchedContacts].sort((a, b) =>
      a.name.localeCompare(b.name, "id")
    );

    const sections: { letter: string; contacts: DataContact[] }[] = [];

    sortedContacts.forEach((contact) => {
      const letter = contact.name.charAt(0).toUpperCase();
      const lastSection = sections.at(-1);

      if (lastSection && lastSection.letter === letter) {
        lastSection.contacts.push(contact);
      } else {
        sections.push({ letter, contacts: [contact] });
      }
    });

    return sections;
  }

  return (
    <div className="no-scrollbar flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-background">
      <div className="flex shrink-0 items-center gap-2 px-4 pb-4 pt-[calc(1.5rem+env(safe-area-inset-top))] sm:gap-3 sm:px-5 md:pt-6">
        <button
          type="button"
          onClick={onCloseNewChat}
          aria-label="Kembali ke obrolan"
          className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:-ml-1 sm:h-9 sm:w-9"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 flex-1 flex-col">
          <h1 className="truncate text-[17px] font-bold leading-tight tracking-tight text-foreground sm:text-[19px]">
            Obrolan baru
          </h1>
          <p className="text-xs text-muted-foreground">{contactCountLabel}</p>
        </div>

        <button
          type="button"
          onClick={onOpenMoreOptions}
          aria-label="Opsi lainnya"
          className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted sm:mr-0 sm:h-9 sm:w-9"
        >
          <LayoutGrid className="h-5 w-5" />
        </button>
      </div>

      <div className="shrink-0 px-4 pb-5 sm:px-5">
        <div className="flex h-11 items-center gap-2.5 rounded-full border border-primary/60 bg-background px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

          <input
            type="text"
            value={searchKeyword}
            placeholder="Cari nama atau nomor"
            onChange={(event) => onChangeSearchKeyword(event.target.value)}
            className="h-full min-w-0 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground md:text-sm"
          />
        </div>
      </div>

      <div className="flex shrink-0 flex-col pb-2">
        {quickActions.map((action) => (
          <button
            key={action.id}
            type="button"
            onClick={action.onClick}
            className="flex w-full items-center gap-3.5 px-4 py-2.5 text-left transition-colors hover:bg-muted/60 active:bg-muted sm:px-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <action.icon className="h-5 w-5" />
            </span>

            <span className="truncate text-[15px] font-semibold text-foreground">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      <div className="shrink-0 border-b pb-2">
        <button
          type="button"
          onClick={() => onOpenContact(self.id)}
          className="flex w-full items-center gap-3.5 px-4 py-2.5 text-left transition-colors hover:bg-muted/60 active:bg-muted sm:px-5"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
            <Image
              src={self.avatarUrl}
              alt={self.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[15px] font-semibold text-foreground">
              {self.name} (Anda)
            </span>
            <span className="truncate text-[13px] text-muted-foreground">
              {self.subtitle}
            </span>
          </div>
        </button>
      </div>

      <div className="flex shrink-0 flex-col pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        {groupedContacts.map((section) => (
          <div key={section.letter} className="flex flex-col">
            <span className="px-4 pb-1 pt-4 text-[13px] font-semibold text-muted-foreground sm:px-5">
              {section.letter}
            </span>

            {section.contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onOpenContact={onOpenContact}
              />
            ))}
          </div>
        ))}

        {isEmptyContact && (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            Tidak ada kontak yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </div>
  );
}
