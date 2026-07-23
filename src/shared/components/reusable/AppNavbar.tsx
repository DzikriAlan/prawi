import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CircleUserRound, MessageCircle, Search } from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useExploreStore } from "@/shared/lib/exploreStore";
import ProfileFormModal from "@/features/profile/components/profileFormModal";

const NAV_ITEMS = [{ href: "/", label: "Obrolan", icon: MessageCircle }];

const SCROLL_HIDE_THRESHOLD = 8;

export const AppNavbar: React.FC = () => {
  const router = useRouter();

  // 9. Store / Controller
  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const toggleExplore = useExploreStore((state) => state.toggleExplore);

  // 3. State
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const lastScrollY = useRef(0);

  // 5. Methods / Handlers
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleToggleExplore = () => {
    toggleExplore();
  };

  // 6. Effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - lastScrollY.current;

      if (currentScrollY <= 0) {
        setIsVisible(true);
      } else if (scrollDelta > SCROLL_HIDE_THRESHOLD) {
        setIsVisible(false);
      } else if (scrollDelta < -SCROLL_HIDE_THRESHOLD) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3 transition-all duration-300 ease-in-out md:hidden",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex items-center gap-1 rounded-full border bg-background/90 p-1.5 shadow-lg backdrop-blur">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const isActive = router.pathname === href;

            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                title={label}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150 hover:scale-105",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
              </Link>
            );
          })}

          <button
            type="button"
            onClick={handleToggleExplore}
            aria-label="Cari orang"
            title="Cari orang"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150 hover:scale-105",
              isExploreOpen
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Search className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={handleOpenProfileModal}
            aria-label="Profil"
            title="Profil"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-all duration-150 hover:scale-105 hover:bg-accent hover:text-accent-foreground"
          >
            <CircleUserRound className="h-4 w-4" />
          </button>
        </nav>
      </div>

      <ProfileFormModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
      />
    </>
  );
};
