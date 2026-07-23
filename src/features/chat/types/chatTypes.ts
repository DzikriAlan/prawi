// Satu pesan di dalam sebuah percakapan
export interface DataChatMessage {
  id: string;
  text: string;
  dayLabel: string;
  timeLabel: string;
  isMine: boolean;
  isRead: boolean;
}

// Satu story yang tampil di rail atas daftar obrolan
export interface DataChatStory {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  hasUnseenStory: boolean;
}

// Satu rekomendasi teman yang tampil saat status sedang dibuka
export interface DataChatFriendSuggestion {
  id: string;
  name: string;
  avatarUrl: string;
  mutualLabel: string;
  isAdded: boolean;
}

// Filter cepat pada sidebar daftar obrolan
export type ChatFilterId =
  | "all"
  | "unread"
  | "favorite"
  | "group"
  | "archive"
  | "trash";

// Satu label yang bisa dipakai untuk mengelompokkan obrolan
export interface DataChatLabel {
  id: string;
  name: string;
  dotClassName: string;
}

// Satu percakapan beserta riwayat pesannya
export interface DataChatConversation {
  id: string;
  name: string;
  avatarUrl: string;
  isOnline: boolean;
  isFavorite: boolean;
  isGroup: boolean;
  labelId: string;
  unreadCount: number;
  timeLabel: string;
  messages: DataChatMessage[];
}
