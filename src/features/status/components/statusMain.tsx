// 1. Import External Library
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Notyf } from "notyf";
import { Camera, Search } from "lucide-react";

// 2. Import Types
import type { DataStatusChannel, DataStatusUpdate } from "../types/statusTypes";

// Import Components
import StatusUpdateRow from "./statusUpdateRow";
import StatusChannelRow from "./statusChannelRow";
import StatusSectionToggle from "./statusSectionToggle";
import StatusViewerModal from "./statusViewerModal";

const MY_AVATAR_URL =
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&h=200&fit=crop";

const ALL_UPDATES: DataStatusUpdate[] = [
  {
    id: "1",
    name: "Nadia Rahmawati",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    timeLabel: "10 menit lalu",
    isViewed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1400&fit=crop",
    caption: "Ngopi santai sore ini, mumpung cuacanya cerah.",
    isLiked: false,
  },
  {
    id: "2",
    name: "Bagas Satria Wibowo",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    timeLabel: "42 menit lalu",
    isViewed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1400&fit=crop",
    caption: "Meeting kelar juga akhirnya, lanjut healing dulu.",
    isLiked: false,
  },
  {
    id: "3",
    name: "Clara Amelia Santoso",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    timeLabel: "1 jam lalu",
    isViewed: false,
    imageUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1400&fit=crop",
    caption: "",
    isLiked: false,
  },
  {
    id: "4",
    name: "Hendra Kusuma Wijaya",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    timeLabel: "Kemarin, 20.14",
    isViewed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1400&fit=crop",
    caption: "Weekend project akhirnya kelar, lega banget rasanya.",
    isLiked: false,
  },
  {
    id: "5",
    name: "Intan Permatasari",
    avatarUrl:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop",
    timeLabel: "Kemarin, 09.02",
    isViewed: true,
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=1400&fit=crop",
    caption: "",
    isLiked: false,
  },
];

const DISCOVER_CHANNELS: DataStatusChannel[] = [
  {
    id: "1",
    name: "Ruang Karier",
    avatarUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop",
    followerLabel: "128Rb",
    verified: true,
    isFollowing: false,
  },
  {
    id: "2",
    name: "Info Teknologi Harian",
    avatarUrl:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop",
    followerLabel: "84Rb",
    verified: true,
    isFollowing: false,
  },
  {
    id: "3",
    name: "Komunitas Desainer",
    avatarUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=200&h=200&fit=crop",
    followerLabel: "36Rb",
    verified: false,
    isFollowing: false,
  },
  {
    id: "4",
    name: "Insight Finansial",
    avatarUrl:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&h=200&fit=crop",
    followerLabel: "57Rb",
    verified: true,
    isFollowing: false,
  },
];

export default function StatusMain() {
  // 8. State
  const [updates, setUpdates] = useState<DataStatusUpdate[]>(ALL_UPDATES);
  const [channels, setChannels] = useState<DataStatusChannel[]>(DISCOVER_CHANNELS);
  const [isViewedSectionOpen, setIsViewedSectionOpen] = useState(false);
  const [isHiddenSectionOpen, setIsHiddenSectionOpen] = useState(false);
  const [isDiscoverChannelsOpen, setIsDiscoverChannelsOpen] = useState(true);
  const [activeStatusId, setActiveStatusId] = useState<string | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const recentUpdates = updates.filter((update) => !update.isViewed);
  const viewedUpdates = updates.filter((update) => update.isViewed);

  // 11. Methods / Handlers
  const handleToggleViewedSection = () => {
    setIsViewedSectionOpen((state) => !state);
  };

  const handleToggleHiddenSection = () => {
    setIsHiddenSectionOpen((state) => !state);
  };

  const handleToggleDiscoverChannels = () => {
    setIsDiscoverChannelsOpen((state) => !state);
  };

  const handleToggleFollow = (channelId: string) => {
    setChannels((state) =>
      state.map((channel) =>
        channel.id === channelId
          ? { ...channel, isFollowing: !channel.isFollowing }
          : channel
      )
    );
  };

  const handleOpenStatus = (statusId: string) => {
    setActiveStatusId(statusId);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
  };

  const handleViewStatus = (statusId: string) => {
    setActiveStatusId(statusId);
    setUpdates((state) =>
      state.map((update) =>
        update.id === statusId ? { ...update, isViewed: true } : update
      )
    );
  };

  const handleToggleLikeStatus = (statusId: string) => {
    setUpdates((state) =>
      state.map((update) =>
        update.id === statusId ? { ...update, isLiked: !update.isLiked } : update
      )
    );
  };

  const handleReactToStatus = (statusId: string, emoji: string) => {
    const status = updates.find((update) => update.id === statusId);
    notyfRef.current?.success(`Anda bereaksi ${emoji} ke status ${status?.name ?? ""}`);
  };

  const handleRepostStatus = (statusId: string) => {
    const status = updates.find((update) => update.id === statusId);
    notyfRef.current?.success(`Status ${status?.name ?? ""} berhasil diposting ulang.`);
  };

  // 12. Effects
  useEffect(() => {
    notyfRef.current = new Notyf({
      duration: 3000,
      position: { x: "right", y: "top" },
    });
  }, []);

  return (
    <div className="flex w-full flex-col bg-background md:mx-auto md:max-w-xl md:border-x">
      <div className="flex items-center justify-between px-4 py-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Pembaruan
        </h1>

        <button
          type="button"
          aria-label="Cari"
          className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>

      <div className="flex flex-col pb-2">
        <span className="px-4 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Status
        </span>

        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors hover:bg-accent/50"
        >
          <div className="relative h-12 w-12 shrink-0">
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={MY_AVATAR_URL}
                alt="Status saya"
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>

            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
              <Camera className="h-2.5 w-2.5" />
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-medium leading-snug text-foreground">
              Tambah Status
            </span>
            <span className="text-xs text-muted-foreground">
              Akan hilang setelah 24 jam
            </span>
          </div>
        </button>
      </div>

      <div className="flex flex-col border-t pb-2 pt-2">
        <span className="px-4 pb-1 text-xs font-medium text-muted-foreground">
          Pembaruan terkini
        </span>

        {recentUpdates.map((update) => (
          <StatusUpdateRow
            key={update.id}
            update={update}
            onOpenStatus={handleOpenStatus}
          />
        ))}
      </div>

      <div className="flex flex-col border-t pt-1">
        <StatusSectionToggle
          label="Pembaruan yang dilihat"
          isOpen={isViewedSectionOpen}
          onToggle={handleToggleViewedSection}
        />

        {isViewedSectionOpen &&
          viewedUpdates.map((update) => (
            <StatusUpdateRow
              key={update.id}
              update={update}
              onOpenStatus={handleOpenStatus}
            />
          ))}
      </div>

      <div className="flex flex-col border-t pb-2 pt-1">
        <StatusSectionToggle
          label="Pembaruan yang disembunyikan"
          isOpen={isHiddenSectionOpen}
          onToggle={handleToggleHiddenSection}
        />

        {isHiddenSectionOpen && (
          <p className="px-4 py-2 text-xs text-muted-foreground">
            Tidak ada pembaruan yang disembunyikan.
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1 border-t px-4 pb-2 pt-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          Saluran
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Dapatkan berita terbaru tentang topik yang Anda minati. Temukan saluran
          untuk diikuti di bawah ini.
        </p>
      </div>

      <div className="flex flex-col pb-6">
        <StatusSectionToggle
          label="Temukan saluran untuk diikuti"
          isOpen={isDiscoverChannelsOpen}
          onToggle={handleToggleDiscoverChannels}
        />

        {isDiscoverChannelsOpen &&
          channels.map((channel) => (
            <StatusChannelRow
              key={channel.id}
              channel={channel}
              onToggleFollow={handleToggleFollow}
            />
          ))}
      </div>

      <StatusViewerModal
        statuses={updates}
        activeStatusId={activeStatusId}
        open={isViewerOpen}
        onClose={handleCloseViewer}
        onViewStatus={handleViewStatus}
        onToggleLikeStatus={handleToggleLikeStatus}
        onReactToStatus={handleReactToStatus}
        onRepostStatus={handleRepostStatus}
      />
    </div>
  );
}
