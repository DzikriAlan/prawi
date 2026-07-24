// 1. Import External Library
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Copy,
  Grid3x3,
  MoreHorizontal,
  UserSquare,
} from "lucide-react";

// 2. Import Types
import type { DataContactPost, DataContactProfile } from "../types/contactTypes";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";

// 7. Props
interface Props {
  profile: DataContactProfile;
  onBack: () => void;
  onMessageContact: (contactId: string) => void;
  onOpenMoreOptions: () => void;
  onOpenPost: (postId: string) => void;
}

type ContactProfileTab = "posts" | "tagged";

export default function ContactProfile({
  profile,
  onBack,
  onMessageContact,
  onOpenMoreOptions,
  onOpenPost,
}: Props) {
  // 8. State
  const [isFollowing, setIsFollowing] = useState(true);
  const [activeTab, setActiveTab] = useState<ContactProfileTab>("posts");

  // 10. Computed / Derived
  const stats = [
    { id: "posts", value: formatCount(profile.postCount), label: "postingan" },
    { id: "followers", value: formatCount(profile.followerCount), label: "pengikut" },
    { id: "following", value: formatCount(profile.followingCount), label: "diikuti" },
  ];
  const tabs = [
    { id: "posts" as const, icon: Grid3x3 },
    { id: "tagged" as const, icon: UserSquare },
  ];
  const isPostsTab = activeTab === "posts";
  const isEmptyPosts = profile.posts.length === 0;

  // 11. Methods / Handlers
  function formatCount(count: number) {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)} jt`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)} rb`;
    return String(count);
  }

  const handleToggleFollow = () => {
    setIsFollowing((state) => !state);
  };

  const handleMessageContact = () => {
    onMessageContact(profile.id);
  };

  const renderPost = (post: DataContactPost) => (
    <button
      key={post.id}
      type="button"
      onClick={() => onOpenPost(post.id)}
      aria-label="Buka postingan"
      className="relative aspect-square bg-muted transition-opacity hover:opacity-90 active:opacity-75"
    >
      <Image
        src={post.imageUrl}
        alt=""
        fill
        sizes="(max-width: 640px) 33vw, 200px"
        className="object-cover"
      />

      {post.isMultiple && (
        <Copy className="absolute right-1.5 top-1.5 h-4 w-4 text-white drop-shadow" />
      )}
    </button>
  );

  return (
    <div className="no-scrollbar flex h-full w-full flex-col overflow-y-auto overscroll-contain bg-background">
      <div className="sticky top-0 z-20 flex h-[calc(3.5rem+env(safe-area-inset-top))] shrink-0 items-center gap-2 border-b bg-background/95 px-4 pt-[env(safe-area-inset-top)] backdrop-blur sm:h-16 sm:gap-3 sm:px-5 sm:pt-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke daftar kontak"
          className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:-ml-1 sm:h-9 sm:w-9"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-foreground sm:text-[17px]">
          {profile.username}
        </span>

        <button
          type="button"
          onClick={onOpenMoreOptions}
          aria-label="Opsi lainnya"
          className="-mr-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted sm:mr-0 sm:h-9 sm:w-9"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center gap-4 px-4 pt-5 sm:gap-8 sm:px-6">
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              sizes="(max-width: 640px) 72px, 96px"
              className="object-cover"
            />
          </div>

          <div className="grid min-w-0 flex-1 grid-cols-3 gap-1">
            {stats.map((stat) => (
              <div key={stat.id} className="flex min-w-0 flex-col items-center text-center">
                <span className="text-base font-bold leading-tight text-foreground sm:text-lg">
                  {stat.value}
                </span>
                <span className="truncate text-[11px] text-muted-foreground sm:text-[13px]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-0.5 px-4 pt-4 sm:px-6">
          <span className="text-[15px] font-semibold text-foreground">
            {profile.name}
          </span>
          <p className="whitespace-pre-line break-words text-[13px] leading-relaxed text-foreground/90">
            {profile.bio}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 pt-4 sm:px-6">
          <button
            type="button"
            onClick={handleToggleFollow}
            aria-pressed={isFollowing}
            className={cn(
              "h-10 flex-1 rounded-lg text-[13px] font-semibold transition-colors sm:h-9",
              isFollowing
                ? "bg-muted text-foreground hover:bg-muted/70 active:bg-muted/50"
                : "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80"
            )}
          >
            {isFollowing ? "Mengikuti" : "Ikuti"}
          </button>

          <button
            type="button"
            onClick={handleMessageContact}
            className="h-10 flex-1 rounded-lg bg-muted text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/70 active:bg-muted/50 sm:h-9"
          >
            Pesan
          </button>
        </div>

        <div className="sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-10 mt-5 grid shrink-0 grid-cols-2 border-b bg-background sm:top-16">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.id === "posts" ? "Postingan" : "Ditandai"}
              aria-selected={activeTab === tab.id}
              className={cn(
                "flex items-center justify-center border-b-2 py-3 transition-colors sm:py-2.5",
                activeTab === tab.id
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="h-5 w-5" />
            </button>
          ))}
        </div>

        {isPostsTab ? (
          <div className="grid grid-cols-3 gap-0.5 pb-[calc(2rem+env(safe-area-inset-bottom))]">
            {profile.posts.map((post) => renderPost(post))}

            {isEmptyPosts && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                Belum ada postingan.
              </p>
            )}
          </div>
        ) : (
          <p className="px-6 py-12 pb-[calc(3rem+env(safe-area-inset-bottom))] text-center text-sm text-muted-foreground">
            Belum ada postingan yang menandai {profile.name}.
          </p>
        )}
      </div>
    </div>
  );
}
