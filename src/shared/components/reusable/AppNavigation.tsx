import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleUserRound, MessageCircle, Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useExploreStore } from "@/shared/lib/exploreStore";
import ProfileFormModal from "@/features/profile/components/profileFormModal";

const NAV_ITEMS = [{ href: "/", label: "Obrolan", icon: MessageCircle }];

export const AppNavigation: React.FC = () => {
  const router = useRouter();

  // 9. Store / Controller
  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const toggleExplore = useExploreStore((state) => state.toggleExplore);
  const isImmersive = useExploreStore((state) => state.isImmersive);

  // 3. State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // 5. Methods / Handlers
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleToggleExplore = () => {
    toggleExplore();
  };

  const renderRailItems = () =>
    NAV_ITEMS.map(({ href, label, icon: Icon }) => {
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
    });

  const renderBottomItems = () =>
    NAV_ITEMS.map(({ href, label, icon: Icon }) => {
      const isActive = router.pathname === href;

      return (
        <Link
          key={href}
          href={href}
          aria-label={label}
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[10px] font-medium transition-colors",
            isActive ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Icon className="h-[22px] w-[22px]" />
          {label}
        </Link>
      );
    });

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-16 flex-col items-center gap-2 border-r bg-background py-4 md:flex">
        {renderRailItems()}

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

      <nav
        className={cn(
          "fixed inset-x-0 bottom-0 z-40 items-stretch border-t bg-background pb-[env(safe-area-inset-bottom)] md:hidden",
          isImmersive ? "hidden" : "flex"
        )}
      >
        {renderBottomItems()}

        <button
          type="button"
          onClick={handleToggleExplore}
          aria-label="Cari orang"
          className={cn(
            "flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[10px] font-medium transition-colors",
            isExploreOpen ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Search className="h-[22px] w-[22px]" />
          Cari
        </button>

        <button
          type="button"
          onClick={handleOpenProfileModal}
          aria-label="Profil"
          className="flex flex-1 flex-col items-center justify-center gap-1 py-1.5 text-[10px] font-medium text-muted-foreground transition-colors"
        >
          <CircleUserRound className="h-[22px] w-[22px]" />
          Profil
        </button>
      </nav>

      <ProfileFormModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </>
  );
};
