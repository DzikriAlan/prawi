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
      className="relative aspect-square bg-muted transition-opacity hover:opacity-90"
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
      <div className="sticky top-0 z-10 flex shrink-0 items-center gap-3 border-b bg-background/95 px-4 py-3.5 backdrop-blur sm:px-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali ke daftar kontak"
          className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <span className="min-w-0 flex-1 truncate text-[17px] font-semibold text-foreground">
          {profile.username}
        </span>

        <button
          type="button"
          onClick={onOpenMoreOptions}
          aria-label="Opsi lainnya"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <div className="flex items-center gap-6 px-4 pt-5 sm:gap-8 sm:px-6">
          <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full sm:h-24 sm:w-24">
            <Image
              src={profile.avatarUrl}
              alt={profile.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>

          <div className="grid flex-1 grid-cols-3 gap-1">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center">
                <span className="text-lg font-bold leading-tight text-foreground">
                  {stat.value}
                </span>
                <span className="text-[13px] text-muted-foreground">
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
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground/90">
            {profile.bio}
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 pt-4 sm:px-6">
          <button
            type="button"
            onClick={handleToggleFollow}
            aria-pressed={isFollowing}
            className={cn(
              "h-9 flex-1 rounded-lg text-[13px] font-semibold transition-colors",
              isFollowing
                ? "bg-muted text-foreground hover:bg-muted/70"
                : "bg-primary text-primary-foreground hover:opacity-90"
            )}
          >
            {isFollowing ? "Mengikuti" : "Ikuti"}
          </button>

          <button
            type="button"
            onClick={handleMessageContact}
            className="h-9 flex-1 rounded-lg bg-muted text-[13px] font-semibold text-foreground transition-colors hover:bg-muted/70"
          >
            Pesan
          </button>
        </div>

        <div className="mt-5 grid shrink-0 grid-cols-2 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              aria-label={tab.id === "posts" ? "Postingan" : "Ditandai"}
              aria-selected={activeTab === tab.id}
              className={cn(
                "flex items-center justify-center border-b-2 py-2.5 transition-colors",
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
          <div className="grid grid-cols-3 gap-0.5 pb-8">
            {profile.posts.map((post) => renderPost(post))}

            {isEmptyPosts && (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                Belum ada postingan.
              </p>
            )}
          </div>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            Belum ada postingan yang menandai {profile.name}.
          </p>
        )}
      </div>
    </div>
  );
}
