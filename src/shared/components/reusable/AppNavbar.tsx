import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Notyf } from "notyf";
import {
  Home,
  Calculator,
  CircleDot,
  CircleUserRound,
  Search,
  Loader2,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import { useSearchStore } from "@/shared/lib/searchStore";
import { Input } from "@/components/ui/input";
import ProfileFormModal from "@/features/profile/components/profileFormModal";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/status", label: "Pembaruan", icon: CircleDot },
  { href: "/weton", label: "Kalkulator Weton", icon: Calculator },
];

const SCROLL_HIDE_THRESHOLD = 8;
const SEARCH_SIMULATION_DELAY_MS = 700;

export const AppNavbar: React.FC = () => {
  const router = useRouter();

  // 9. Store / Controller
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);

  // 3. State
  const [isVisible, setIsVisible] = useState(true);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");

  const lastScrollY = useRef(0);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const isHomePage = router.pathname === "/";

  // 5. Methods / Handlers
  const handleOpenProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((state) => {
      const nextState = !state;

      if (!nextState) {
        setSearchInputValue("");
        setSearchQuery("");
      }

      return nextState;
    });
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" || isSearching) return;

    const trimmedQuery = searchInputValue.trim();

    if (!trimmedQuery) {
      setSearchQuery("");
      notyfRef.current?.success("Menampilkan semua hasil.");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      setSearchQuery(trimmedQuery);
      notyfRef.current?.success(`Menampilkan hasil untuk "${trimmedQuery}".`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, SEARCH_SIMULATION_DELAY_MS);
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

  useEffect(() => {
    if (isSearchOpen) searchInputRef.current?.focus();
  }, [isSearchOpen]);

  useEffect(() => {
    if (isHomePage) return;

    setIsSearchOpen(false);
    setSearchInputValue("");
    setSearchQuery("");
  }, [isHomePage, setSearchQuery]);

  useEffect(() => {
    notyfRef.current = new Notyf({
      duration: 3000,
      position: { x: "right", y: "top" },
    });
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3 transition-all duration-300 ease-in-out",
          isVisible
            ? "translate-y-0 opacity-100"
            : "translate-y-24 opacity-0 pointer-events-none"
        )}
      >
        {isHomePage && isSearchOpen && (
          <div className="flex w-96 max-w-[calc(100vw-3rem)] items-center gap-2 rounded-full border bg-background/90 px-4 py-2.5 shadow-lg backdrop-blur">
            {isSearching ? (
              <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
            ) : (
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            )}

            <Input
              ref={searchInputRef}
              type="text"
              placeholder="Cari lalu tekan Enter..."
              value={searchInputValue}
              disabled={isSearching}
              onChange={(event) => setSearchInputValue(event.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-7 border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
          </div>
        )}

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

          {isHomePage && (
            <>
              <span className="mx-0.5 h-5 w-px shrink-0 bg-border" />

              <button
                type="button"
                onClick={handleToggleSearch}
                aria-label={isSearchOpen ? "Tutup pencarian" : "Pencarian"}
                title={isSearchOpen ? "Tutup pencarian" : "Pencarian"}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full transition-all duration-150 hover:scale-105",
                  isSearchOpen
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Search className="h-4 w-4" />
              </button>
            </>
          )}

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
