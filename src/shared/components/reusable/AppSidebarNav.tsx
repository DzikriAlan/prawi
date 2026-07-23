import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleUserRound, MessageCircle, Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useExploreStore } from "@/shared/lib/exploreStore";
import ProfileFormModal from "@/features/profile/components/profileFormModal";

const NAV_ITEMS = [{ href: "/", label: "Obrolan", icon: MessageCircle }];

export const AppSidebarNav: React.FC = () => {
  const router = useRouter();

  // 9. Store / Controller
  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const toggleExplore = useExploreStore((state) => state.toggleExplore);

  // 3. State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 5. Methods / Handlers
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleToggleExplore = () => {
    toggleExplore();
  };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col items-center gap-2 border-r bg-background py-4 md:flex">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = router.pathname === href;

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              title={label}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}

        <button
          type="button"
          onClick={handleToggleExplore}
          aria-label="Cari orang"
          title="Cari orang"
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
            isExploreOpen
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Search className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleOpenProfileModal}
          aria-label="Profil"
          title="Profil"
          className="mt-auto flex h-11 w-11 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <CircleUserRound className="h-5 w-5" />
        </button>
      </aside>

      <ProfileFormModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </>
  );
};
