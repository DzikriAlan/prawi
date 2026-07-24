// 1. Import External Library
import Image from "next/image";

// 2. Import Types
import type { DataWetonActiveUser } from "../types/wetonTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  users: DataWetonActiveUser[];
  onGreetPerson: (personId: string) => void;
  onShowAllActiveUsers: () => void;
}

export default function WetonActiveUserList({
  users,
  onGreetPerson,
  onShowAllActiveUsers,
}: Props) {
  return (
    <div className="flex flex-col rounded-2xl border bg-background p-3.5">
      <div className="flex items-center justify-between pb-1.5">
        <span className="text-sm font-semibold text-foreground">
          Pengguna Aktif
        </span>

        <button
          type="button"
          onClick={onShowAllActiveUsers}
          className="text-xs font-medium text-primary transition-opacity hover:opacity-70"
        >
          Lihat semua
        </button>
      </div>

      {users.map((user) => (
        <button
          key={user.id}
          type="button"
          onClick={() => onGreetPerson(user.id)}
          className="flex items-center gap-2.5 rounded-xl py-1.5 text-left transition-colors hover:bg-muted/60"
        >
          <div className="relative shrink-0">
            <div className="relative h-9 w-9 overflow-hidden rounded-full">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                fill
                sizes="36px"
                className="object-cover"
              />
            </div>

            <span
              className={cn(
                "absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-background",
                user.isOnline ? "bg-emerald-500" : "bg-muted-foreground/40"
              )}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-foreground">
              {user.name}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">
              {user.statusLabel}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
