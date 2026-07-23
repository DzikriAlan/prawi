// 1. Import External Library
import React, { useEffect, useRef, useState } from "react";
import { Notyf } from "notyf";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";
import { useExploreStore } from "@/shared/lib/exploreStore";

// 2. Import Types
import type { DataStatusUpdate } from "@/features/status/types/statusTypes";
import type {
  ChatFilterId,
  DataChatFriendSuggestion,
  DataChatConversation,
  DataChatLabel,
  DataChatMessage,
  DataChatStory,
} from "../types/chatTypes";

// Import Components
import ChatConversationList from "./chatConversationList";
import ChatEmptyPanel from "./chatEmptyPanel";
import ChatRoom from "./chatRoom";
import ChatFriendSuggestionPanel from "./chatFriendSuggestionPanel";
import ChatFriendActivityPanel from "./chatFriendActivityPanel";
import StatusViewerModal from "@/features/status/components/statusViewerModal";

const REPLY_DELAY_MS = 1200;

const CHAT_LABELS: DataChatLabel[] = [
  { id: "project", name: "Project", dotClassName: "bg-chat-accent" },
  { id: "keluarga", name: "Keluarga", dotClassName: "bg-chat-online" },
  { id: "teman", name: "Teman", dotClassName: "bg-chat-primary" },
  { id: "kerja", name: "Kerja", dotClassName: "bg-chat-bubble" },
];

const DUMMY_REPLIES = [
  "Siap, nanti aku cek dulu ya.",
  "Wah menarik juga idenya, lanjut!",
  "Oke noted, makasih infonya.",
  "Boleh, nanti sore aku kabari lagi.",
  "Hehe iya, kemarin baru sempat lihat.",
  "Aman, aku bantu bagian itu.",
];

const FRIEND_SUGGESTIONS: DataChatFriendSuggestion[] = [
  {
    id: "1",
    name: "Rani Oktaviani",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    mutualLabel: "5 teman bersama",
    isAdded: false,
  },
  {
    id: "2",
    name: "Fajar Nugroho",
    avatarUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop",
    mutualLabel: "3 teman bersama",
    isAdded: false,
  },
  {
    id: "3",
    name: "Alya Kusumastuti",
    avatarUrl:
      "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop",
    mutualLabel: "Sering berinteraksi",
    isAdded: false,
  },
  {
    id: "4",
    name: "Dimas Prayoga",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop",
    mutualLabel: "2 teman bersama",
    isAdded: false,
  },
  {
    id: "5",
    name: "Salsabila Putri",
    avatarUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop",
    mutualLabel: "Baru bergabung",
    isAdded: false,
  },
];

const ALL_STATUSES: DataStatusUpdate[] = [
  {
    id: "1",
    name: "Nadia Rahmawati",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    timeLabel: "10 menit lalu",
    isViewed: false,
    isLiked: false,
    items: [
      {
        id: "1-1",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1400&fit=crop",
        caption: "Ngopi santai sore ini, mumpung cuacanya cerah.",
      },
      {
        id: "1-2",
        imageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1400&fit=crop",
        caption: "Lanjut kerja lagi di kafe sebelah.",
      },
      {
        id: "1-3",
        imageUrl:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1400&fit=crop",
        caption: "",
      },
    ],
  },
  {
    id: "2",
    name: "Bagas Satria Wibowo",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    timeLabel: "42 menit lalu",
    isViewed: false,
    isLiked: false,
    items: [
      {
        id: "2-1",
        imageUrl:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=1400&fit=crop",
        caption: "Meeting kelar juga akhirnya, lanjut healing dulu.",
      },
      {
        id: "2-2",
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1400&fit=crop",
        caption: "Sunset-nya bagus banget hari ini.",
      },
    ],
  },
  {
    id: "3",
    name: "Clara Amelia Santoso",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    timeLabel: "1 jam lalu",
    isViewed: false,
    isLiked: false,
    items: [
      {
        id: "3-1",
        imageUrl:
          "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1400&fit=crop",
        caption: "",
      },
      {
        id: "3-2",
        imageUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=1400&fit=crop",
        caption: "Ruang kerja baru, semoga betah.",
      },
    ],
  },
  {
    id: "4",
    name: "Hendra Kusuma Wijaya",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    timeLabel: "Kemarin, 20.14",
    isViewed: true,
    isLiked: false,
    items: [
      {
        id: "4-1",
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1400&fit=crop",
        caption: "Weekend project akhirnya kelar, lega banget rasanya.",
      },
    ],
  },
  {
    id: "5",
    name: "Intan Permatasari",
    avatarUrl:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop",
    timeLabel: "Kemarin, 09.02",
    isViewed: true,
    isLiked: false,
    items: [
      {
        id: "5-1",
        imageUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=1400&fit=crop",
        caption: "",
      },
      {
        id: "5-2",
        imageUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1400&fit=crop",
        caption: "Pagi yang tenang.",
      },
    ],
  },
];

const ALL_CONVERSATIONS: DataChatConversation[] = [
  {
    id: "1",
    isFavorite: true,
    isGroup: false,
    labelId: "project",
    name: "Nadia Rahmawati",
    avatarUrl:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop",
    isOnline: true,
    unreadCount: 2,
    timeLabel: "09.41",
    messages: [
      {
        id: "1-1",
        text: "Halo, gimana kabarnya?",
        dayLabel: "Kemarin",
        timeLabel: "19.02",
        isMine: false,
        isRead: true,
      },
      {
        id: "1-2",
        text: "Baik dong, kamu gimana? Lagi sibuk banget kayaknya.",
        dayLabel: "Kemarin",
        timeLabel: "19.10",
        isMine: true,
        isRead: true,
      },
      {
        id: "1-3",
        text: "Lumayan sih, minggu ini banyak deadline.",
        dayLabel: "Kemarin",
        timeLabel: "19.15",
        isMine: false,
        isRead: true,
      },
      {
        id: "1-4",
        text: "Btw jadi ngopi weekend ini?",
        dayLabel: "Hari ini",
        timeLabel: "09.40",
        isMine: false,
        isRead: true,
      },
      {
        id: "1-5",
        text: "Aku free hari Sabtu siang.",
        dayLabel: "Hari ini",
        timeLabel: "09.41",
        isMine: false,
        isRead: true,
      },
    ],
  },
  {
    id: "2",
    isFavorite: false,
    isGroup: false,
    labelId: "kerja",
    name: "Bagas Satria Wibowo",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    isOnline: false,
    unreadCount: 0,
    timeLabel: "08.12",
    messages: [
      {
        id: "2-1",
        text: "Bro, file desainnya udah aku kirim ke email ya.",
        dayLabel: "Hari ini",
        timeLabel: "08.05",
        isMine: false,
        isRead: true,
      },
      {
        id: "2-2",
        text: "Oke sip, nanti aku review habis meeting.",
        dayLabel: "Hari ini",
        timeLabel: "08.12",
        isMine: true,
        isRead: false,
      },
    ],
  },
  {
    id: "3",
    isFavorite: true,
    isGroup: false,
    labelId: "teman",
    name: "Clara Amelia Santoso",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    isOnline: true,
    unreadCount: 1,
    timeLabel: "Kemarin",
    messages: [
      {
        id: "3-1",
        text: "Makasih ya bantuannya kemarin!",
        dayLabel: "2 hari lalu",
        timeLabel: "16.20",
        isMine: false,
        isRead: true,
      },
      {
        id: "3-2",
        text: "Sama-sama, senang bisa bantu.",
        dayLabel: "2 hari lalu",
        timeLabel: "16.45",
        isMine: true,
        isRead: true,
      },
      {
        id: "3-3",
        text: "Nanti kalau ada project lagi aku kabarin.",
        dayLabel: "Kemarin",
        timeLabel: "21.03",
        isMine: false,
        isRead: true,
      },
    ],
  },
  {
    id: "4",
    isFavorite: false,
    isGroup: true,
    labelId: "kerja",
    name: "Hendra Kusuma Wijaya",
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    isOnline: false,
    unreadCount: 0,
    timeLabel: "Senin",
    messages: [
      {
        id: "4-1",
        text: "Laporan bulanannya jangan lupa dikumpulkan ya.",
        dayLabel: "Senin",
        timeLabel: "10.30",
        isMine: false,
        isRead: true,
      },
      {
        id: "4-2",
        text: "Sudah aku upload semalam pak.",
        dayLabel: "Senin",
        timeLabel: "10.34",
        isMine: true,
        isRead: true,
      },
    ],
  },
  {
    id: "5",
    isFavorite: false,
    isGroup: false,
    labelId: "keluarga",
    name: "Intan Permatasari",
    avatarUrl:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop",
    isOnline: false,
    unreadCount: 0,
    timeLabel: "Minggu",
    messages: [
      {
        id: "5-1",
        text: "Foto-foto kemarin udah aku kirim di album ya.",
        dayLabel: "Minggu",
        timeLabel: "14.11",
        isMine: false,
        isRead: true,
      },
      {
        id: "5-2",
        text: "Bagus semua hasilnya, makasih banyak!",
        dayLabel: "Minggu",
        timeLabel: "14.50",
        isMine: true,
        isRead: true,
      },
    ],
  },
];

// 7. Props
interface Props {
  detailPanel?: React.ReactNode;
}

export default function ChatMain({ detailPanel }: Props) {
  // 8. State
  const [conversations, setConversations] =
    useState<DataChatConversation[]>(ALL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    null
  );
  const [replyingConversationId, setReplyingConversationId] = useState<
    string | null
  >(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeFilterId, setActiveFilterId] = useState<ChatFilterId>("all");
  const [statuses, setStatuses] = useState<DataStatusUpdate[]>(ALL_STATUSES);
  const [activeStatusId, setActiveStatusId] = useState<string | null>(null);
  const [isStatusViewerOpen, setIsStatusViewerOpen] = useState(false);
  const [friendSuggestions, setFriendSuggestions] =
    useState<DataChatFriendSuggestion[]>(FRIEND_SUGGESTIONS);
  const [activeLabelId, setActiveLabelId] = useState<string | null>(null);

  // 9. Store / Controller
  const isExploreOpen = useExploreStore((state) => state.isExploreOpen);
  const setExploreOpen = useExploreStore((state) => state.setExploreOpen);

  const notyfRef = useRef<Notyf | null>(null);
  const replyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 10. Computed / Derived
  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ??
    null;
  const totalUnreadCount = conversations.reduce(
    (total, conversation) => total + conversation.unreadCount,
    0
  );
  const unreadLabel =
    totalUnreadCount > 0
      ? `${totalUnreadCount} pesan belum dibaca`
      : "Semua pesan sudah dibaca";
  const stories: DataChatStory[] = statuses.map((status) => ({
    id: status.id,
    name: status.name.split(" ")[0],
    avatarUrl: status.avatarUrl,
    isOnline:
      conversations.find((conversation) => conversation.name === status.name)
        ?.isOnline ?? false,
    hasUnseenStory: !status.isViewed,
  }));
  const filteredConversations = getFilteredConversations();
  const isDetailPanelVisible =
    (isExploreOpen && Boolean(detailPanel)) ||
    Boolean(activeConversation) ||
    isStatusViewerOpen;
  const onlineFriends = conversations.filter((conversation) => conversation.isOnline);

  // 11. Methods / Handlers
  function getFilteredConversations() {
    const keyword = searchKeyword.trim().toLowerCase();

    const matchesSection = (conversation: DataChatConversation) => {
      if (activeLabelId) return conversation.labelId === activeLabelId;
      if (activeFilterId === "unread") return conversation.unreadCount > 0;
      if (activeFilterId === "favorite") return conversation.isFavorite;
      if (activeFilterId === "group") return conversation.isGroup;
      if (activeFilterId === "archive" || activeFilterId === "trash") return false;
      return true;
    };

    const matchesKeyword = (conversation: DataChatConversation) => {
      if (!keyword) return true;

      const lastMessageText = conversation.messages.at(-1)?.text ?? "";

      return (
        conversation.name.toLowerCase().includes(keyword) ||
        lastMessageText.toLowerCase().includes(keyword)
      );
    };

    return conversations.filter(
      (conversation) => matchesSection(conversation) && matchesKeyword(conversation)
    );
  }

  const handleSelectFilter = (filterId: ChatFilterId) => {
    setActiveFilterId(filterId);
    setActiveLabelId(null);
  };

  const handleSelectLabel = (labelId: string) => {
    setActiveLabelId((state) => (state === labelId ? null : labelId));
  };

  const handleCreateLabel = () => {
    notyfRef.current?.success("Fitur buat label belum tersedia.");
  };

  const handleOpenConversation = (conversationId: string) => {
    setActiveConversationId(conversationId);
    setIsStatusViewerOpen(false);
    setExploreOpen(false);
    setConversations((state) =>
      state.map((conversation) =>
        conversation.id === conversationId
          ? { ...conversation, unreadCount: 0 }
          : conversation
      )
    );
  };

  const handleCloseConversation = () => {
    setActiveConversationId(null);
  };

  const handleSendMessage = (conversationId: string, text: string) => {
    const getTimeLabel = () =>
      new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      });

    const getRandomReply = () =>
      DUMMY_REPLIES[Math.floor(Math.random() * DUMMY_REPLIES.length)];

    const appendMessage = (
      conversation: DataChatConversation,
      message: DataChatMessage
    ) => ({
      ...conversation,
      timeLabel: message.timeLabel,
      messages: [...conversation.messages, message],
    });

    const myMessage: DataChatMessage = {
      id: `${conversationId}-${Date.now()}`,
      text,
      dayLabel: "Hari ini",
      timeLabel: getTimeLabel(),
      isMine: true,
      isRead: false,
    };

    setConversations((state) =>
      state.map((conversation) =>
        conversation.id === conversationId
          ? appendMessage(conversation, myMessage)
          : conversation
      )
    );

    setReplyingConversationId(conversationId);

    if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);

    replyTimeoutRef.current = setTimeout(() => {
      const replyMessage: DataChatMessage = {
        id: `${conversationId}-${Date.now()}-reply`,
        text: getRandomReply(),
        dayLabel: "Hari ini",
        timeLabel: getTimeLabel(),
        isMine: false,
        isRead: true,
      };

      setConversations((state) =>
        state.map((conversation) =>
          conversation.id === conversationId
            ? appendMessage(
                {
                  ...conversation,
                  messages: conversation.messages.map((message) =>
                    message.isMine ? { ...message, isRead: true } : message
                  ),
                },
                replyMessage
              )
            : conversation
        )
      );

      setReplyingConversationId(null);
    }, REPLY_DELAY_MS);
  };

  const handleStartNewChat = () => {
    notyfRef.current?.success("Fitur pesan baru belum tersedia.");
  };

  const handleOpenStory = (statusId: string) => {
    setActiveStatusId(statusId);
    setActiveConversationId(null);
    setExploreOpen(false);
    setIsStatusViewerOpen(true);
  };

  const handleCloseStatusViewer = () => {
    setIsStatusViewerOpen(false);
  };

  const handleViewStatus = (statusId: string) => {
    setStatuses((state) => {
      const isAlreadyViewed = state.some(
        (status) => status.id === statusId && status.isViewed
      );

      if (isAlreadyViewed) return state;

      return state.map((status) =>
        status.id === statusId ? { ...status, isViewed: true } : status
      );
    });
  };

  const handleToggleLikeStatus = (statusId: string) => {
    setStatuses((state) =>
      state.map((status) =>
        status.id === statusId ? { ...status, isLiked: !status.isLiked } : status
      )
    );
  };

  const handleReactToStatus = (statusId: string, emoji: string) => {
    const status = statuses.find((item) => item.id === statusId);
    notyfRef.current?.success(`Anda bereaksi ${emoji} ke status ${status?.name ?? ""}`);
  };

  const handleRepostStatus = (statusId: string) => {
    const status = statuses.find((item) => item.id === statusId);
    notyfRef.current?.success(`Status ${status?.name ?? ""} berhasil diposting ulang.`);
  };

  const handleToggleAddFriend = (suggestionId: string) => {
    setFriendSuggestions((state) =>
      state.map((suggestion) =>
        suggestion.id === suggestionId
          ? { ...suggestion, isAdded: !suggestion.isAdded }
          : suggestion
      )
    );
  };

  const handleShowAllSuggestions = () => {
    notyfRef.current?.success("Halaman rekomendasi teman belum tersedia.");
  };

  const handleCreateStory = () => {
    notyfRef.current?.success("Fitur buat story belum tersedia.");
  };

  const handleOpenMoreOptions = () => {
    notyfRef.current?.success("Menu lainnya belum tersedia.");
  };

  // 12. Effects
  useEffect(() => {
    notyfRef.current = new Notyf({
      duration: 3000,
      position: { x: "right", y: "top" },
    });

    return () => {
      if (replyTimeoutRef.current) clearTimeout(replyTimeoutRef.current);
    };
  }, []);

  const conversationListPanel = (
    <ChatConversationList
      conversations={filteredConversations}
      stories={stories}
      labels={CHAT_LABELS}
      searchKeyword={searchKeyword}
      activeFilterId={activeFilterId}
      activeLabelId={activeLabelId}
      activeConversationId={activeConversationId}
      unreadLabel={unreadLabel}
      onChangeSearchKeyword={setSearchKeyword}
      onOpenConversation={handleOpenConversation}
      onCreateStory={handleCreateStory}
      onOpenStory={handleOpenStory}
      onStartNewChat={handleStartNewChat}
      onOpenMoreOptions={handleOpenMoreOptions}
      onSelectFilter={handleSelectFilter}
      onSelectLabel={handleSelectLabel}
      onCreateLabel={handleCreateLabel}
    />
  );

  const statusPanel = (
    <div className="flex h-full w-full gap-4 bg-muted/40 p-0 xl:p-4">
      <div className="mx-auto h-full w-full max-w-[520px] overflow-hidden xl:rounded-2xl">
        <StatusViewerModal
          statuses={statuses}
          activeStatusId={activeStatusId}
          open={isStatusViewerOpen}
          onClose={handleCloseStatusViewer}
          onViewStatus={handleViewStatus}
          onToggleLikeStatus={handleToggleLikeStatus}
          onReactToStatus={handleReactToStatus}
          onRepostStatus={handleRepostStatus}
        />
      </div>

      <div className="no-scrollbar hidden w-[320px] shrink-0 flex-col gap-4 overflow-y-auto xl:flex">
        <ChatFriendSuggestionPanel
          suggestions={friendSuggestions}
          onToggleAddFriend={handleToggleAddFriend}
          onShowAllSuggestions={handleShowAllSuggestions}
        />

        <ChatFriendActivityPanel
          friends={onlineFriends}
          onOpenConversation={handleOpenConversation}
        />
      </div>
    </div>
  );

  const conversationDetailPanel = activeConversation ? (
    <ChatRoom
      conversation={activeConversation}
      isReplying={replyingConversationId === activeConversation.id}
      onCloseConversation={handleCloseConversation}
      onSendMessage={handleSendMessage}
    />
  ) : (
    <ChatEmptyPanel />
  );

  const resolveDetailPanel = () => {
    if (isExploreOpen && detailPanel) return detailPanel;
    if (isStatusViewerOpen) return statusPanel;
    if (activeConversation) return conversationDetailPanel;
    return conversationDetailPanel;
  };

  return (
    <div className="flex h-full w-full">
      <div
        className={cn(
          "h-full w-full md:block md:w-[380px] md:shrink-0 md:border-r",
          isDetailPanelVisible ? "hidden" : "block"
        )}
      >
        {conversationListPanel}
      </div>

      <div
        className={cn(
          "h-full flex-1 overflow-y-auto md:block",
          isDetailPanelVisible ? "block" : "hidden"
        )}
      >
        {resolveDetailPanel()}
      </div>
    </div>
  );
}
