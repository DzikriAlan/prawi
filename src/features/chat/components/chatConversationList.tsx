// 1. Import External Library
import { MoreVertical, Plus, Search } from "lucide-react";

// 2. Import Types
import type {
  ChatFilterId,
  DataChatConversation,
  DataChatLabel,
  DataChatStory,
} from "../types/chatTypes";

// Import Components
import ChatConversationRow from "./chatConversationRow";
import ChatStoryRail from "./chatStoryRail";
import ChatFilterChips from "./chatFilterChips";

// 7. Props
interface Props {
  conversations: DataChatConversation[];
  stories: DataChatStory[];
  labels: DataChatLabel[];
  searchKeyword: string;
  activeFilterId: ChatFilterId;
  activeLabelId: string | null;
  activeConversationId: string | null;
  unreadLabel: string;
  onChangeSearchKeyword: (keyword: string) => void;
  onOpenConversation: (conversationId: string) => void;
  onCreateStory: () => void;
  onOpenStory: (statusId: string) => void;
  onStartNewChat: () => void;
  onOpenMoreOptions: () => void;
  onSelectFilter: (filterId: ChatFilterId) => void;
  onSelectLabel: (labelId: string) => void;
  onCreateLabel: () => void;
}

export default function ChatConversationList({
  conversations,
  stories,
  labels,
  searchKeyword,
  activeFilterId,
  activeLabelId,
  activeConversationId,
  unreadLabel,
  onChangeSearchKeyword,
  onOpenConversation,
  onCreateStory,
  onOpenStory,
  onStartNewChat,
  onOpenMoreOptions,
  onSelectFilter,
  onSelectLabel,
  onCreateLabel,
}: Props) {
  // 10. Computed / Derived
  const isEmptyConversation = conversations.length === 0;

  return (
    <div className="no-scrollbar flex h-full w-full flex-col overflow-y-auto bg-background">
      <div className="flex items-center justify-between px-4 pb-4 pt-6 sm:px-5">
        <h1
          title={unreadLabel}
          className="text-[22px] font-bold leading-none tracking-tight text-foreground"
        >
          Obrolan
        </h1>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onStartNewChat}
            aria-label="Pesan baru"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-opacity hover:opacity-90"
          >
            <Plus className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={onOpenMoreOptions}
            aria-label="Opsi lainnya"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-5 sm:px-5">
        <div className="flex h-11 items-center gap-2.5 rounded-full border bg-background px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

          <input
            type="text"
            value={searchKeyword}
            placeholder="Cari teman atau pesan"
            onChange={(event) => onChangeSearchKeyword(event.target.value)}
            className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <ChatFilterChips
        labels={labels}
        activeFilterId={activeFilterId}
        activeLabelId={activeLabelId}
        onSelectFilter={onSelectFilter}
        onSelectLabel={onSelectLabel}
        onCreateLabel={onCreateLabel}
      />

      <ChatStoryRail
        stories={stories}
        onCreateStory={onCreateStory}
        onOpenStory={onOpenStory}
      />

      <div className="flex flex-col divide-y border-t pb-28 md:pb-4">
        {conversations.map((conversation) => (
          <ChatConversationRow
            key={conversation.id}
            conversation={conversation}
            isActive={conversation.id === activeConversationId}
            onOpenConversation={onOpenConversation}
          />
        ))}

        {isEmptyConversation && (
          <p className="px-5 py-6 text-center text-sm text-muted-foreground">
            Tidak ada obrolan pada bagian ini.
          </p>
        )}
      </div>
    </div>
  );
}
