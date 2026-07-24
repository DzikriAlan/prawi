// 1. Import External Library
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Notyf } from "notyf";

// 2. Import Types
import type {
  DataContact,
  DataContactPost,
  DataContactProfile,
} from "../types/contactTypes";
import type { DataStatusUpdate } from "@/features/status/types/statusTypes";

// Import Components
import ContactList from "./contactList";
import ContactProfile from "./contactProfile";

const AVATAR_PHOTO_IDS = [
  "1507003211169-0a1dd7228f2d",
  "1494790108377-be9c29b29330",
  "1500648767791-00dcc994a43e",
  "1438761681033-6461ffad8d80",
  "1531123897727-8f129e1688ce",
  "1472099645785-5658abf4ff4e",
  "1544725176-7c40e5a71c5e",
  "1519345182560-3f2917c472ef",
  "1580489944761-15a19d654956",
  "1573497019940-1c28c88b4f3e",
  "1506794778202-cad84cf45f1d",
  "1534528741775-53994a69daeb",
  "1552058544-f2b08422138a",
  "1607746882042-944635dfe10e",
  "1548142813-c348350df52b",
  "1573496359142-b8d87734a5a2",
];

const POST_PHOTO_IDS = [
  "1519389950473-47ba0277781c",
  "1497366216548-37526070297c",
  "1522071820081-009f0129c71c",
  "1556761175-5973dc0f32e7",
  "1497366811353-6870744d04b2",
  "1441974231531-c6227db76b6e",
  "1521737604893-d14cc237f11d",
  "1552664730-d307ca884978",
  "1497366754035-f200968a6e72",
  "1600880292203-757bb62b4baf",
  "1541746972996-4e0b0f43e02a",
  "1524758631624-e2822e304c36",
];

const RAW_CONTACTS = [
  {
    name: "AbsolutFit Gym",
    username: "absolutfit.gym",
    subtitle: "Fitness Center",
    isBusiness: true,
    bio: "Pusat kebugaran modern.\nPersonal trainer & kelas grup.\nBuka setiap hari 06.00 - 22.00.",
    followers: 12400,
    following: 231,
  },
  {
    name: "Adam Pratama",
    username: "adam.ptm",
    subtitle: "Rider akhir pekan",
    isBusiness: false,
    bio: "Motor, kopi, dan jalan panjang.\nBandung based.",
    followers: 842,
    following: 613,
  },
  {
    name: "Adi Nugraha",
    username: "adinugraha",
    subtitle: "Front End Developer",
    isBusiness: false,
    bio: "Ngoding di siang hari, ngopi di malam hari.",
    followers: 1320,
    following: 947,
  },
  {
    name: "Adit Saputra",
    username: "adit.sptr",
    subtitle: "",
    isBusiness: false,
    bio: "Suka fotografi jalanan.",
    followers: 410,
    following: 388,
  },
  {
    name: "Agung Wibowo",
    username: "agungwbw",
    subtitle: "Product Designer",
    isBusiness: false,
    bio: "Mendesain hal-hal yang berguna.\nPenggemar design system.",
    followers: 2210,
    following: 512,
  },
  {
    name: "Bella Safitri",
    username: "bellasafitri",
    subtitle: "Content Creator",
    isBusiness: false,
    bio: "Berbagi cerita seputar gaya hidup & traveling.",
    followers: 18700,
    following: 320,
  },
  {
    name: "Bagas Wibowo",
    username: "bagas.wbw",
    subtitle: "Backend Engineer",
    isBusiness: false,
    bio: "Membangun API yang rapi dan cepat.",
    followers: 990,
    following: 274,
  },
  {
    name: "Clara Santoso",
    username: "clara.santoso",
    subtitle: "UI/UX Designer",
    isBusiness: false,
    bio: "Detail kecil bikin perbedaan besar.",
    followers: 3450,
    following: 611,
  },
  {
    name: "Dewi Anggraini",
    username: "dewi.anggr",
    subtitle: "Marketing Lead",
    isBusiness: false,
    bio: "Cerita brand, strategi, dan sedikit senja.",
    followers: 5620,
    following: 743,
  },
  {
    name: "Fajar Ramadhan",
    username: "fajar.rmd",
    subtitle: "",
    isBusiness: false,
    bio: "Lari pagi, kerja siang, baca malam.",
    followers: 720,
    following: 690,
  },
  {
    name: "Gita Permata",
    username: "gitapermata",
    subtitle: "Data Analyst",
    isBusiness: false,
    bio: "Menemukan cerita di balik angka.",
    followers: 1180,
    following: 402,
  },
  {
    name: "Hendra Kusuma",
    username: "hendra.ksm",
    subtitle: "Team Lead",
    isBusiness: false,
    bio: "Percaya kolaborasi mengalahkan kompetisi.",
    followers: 2040,
    following: 358,
  },
  {
    name: "Intan Permatasari",
    username: "intan.prm",
    subtitle: "Human Resources",
    isBusiness: false,
    bio: "Senang bertemu orang baru.",
    followers: 1560,
    following: 820,
  },
  {
    name: "Kirana Ayu",
    username: "kirana.ayu",
    subtitle: "Photographer",
    isBusiness: false,
    bio: "Mengabadikan momen sederhana.",
    followers: 8900,
    following: 265,
  },
  {
    name: "Rangga Saputra",
    username: "rangga.sptr",
    subtitle: "",
    isBusiness: false,
    bio: "Penggemar sepeda dan senja.",
    followers: 630,
    following: 570,
  },
  {
    name: "Sari Kusuma",
    username: "sari.ksm",
    subtitle: "Finance Analyst",
    isBusiness: false,
    bio: "Rapi soal angka, santai soal hidup.",
    followers: 1440,
    following: 336,
  },
];

const buildAvatarUrl = (index: number) =>
  `https://images.unsplash.com/photo-${AVATAR_PHOTO_IDS[index % AVATAR_PHOTO_IDS.length]}?w=200&h=200&fit=crop`;

const buildPosts = (index: number): DataContactPost[] =>
  Array.from({ length: 6 + (index % 4) }).map((_, postIndex) => ({
    id: `${index}-${postIndex}`,
    imageUrl: `https://images.unsplash.com/photo-${POST_PHOTO_IDS[(index + postIndex) % POST_PHOTO_IDS.length]}?w=400&h=400&fit=crop`,
    isMultiple: (index + postIndex) % 3 === 0,
  }));

const CONTACTS: DataContact[] = RAW_CONTACTS.map((contact, index) => ({
  id: String(index + 1),
  name: contact.name,
  username: contact.username,
  avatarUrl: buildAvatarUrl(index),
  subtitle: contact.subtitle,
  isBusiness: contact.isBusiness,
}));

const PROFILES: DataContactProfile[] = RAW_CONTACTS.map((contact, index) => ({
  id: String(index + 1),
  name: contact.name,
  username: contact.username,
  avatarUrl: buildAvatarUrl(index),
  bio: contact.bio,
  postCount: 6 + (index % 4),
  followerCount: contact.followers,
  followingCount: contact.following,
  posts: buildPosts(index),
}));

const SELF_CONTACT: DataContact = {
  id: "self",
  name: "Dzikri",
  username: "_dzikrialan",
  avatarUrl: buildAvatarUrl(4),
  subtitle: "Kirim pesan ke diri sendiri",
  isBusiness: false,
};

const SELF_PROFILE: DataContactProfile = {
  id: "self",
  name: "Dzikri",
  username: "_dzikrialan",
  avatarUrl: SELF_CONTACT.avatarUrl,
  bio: "Builder Blayer.id & Front End Developer.\nSharing perjalanan karier di industri teknologi.",
  postCount: 8,
  followerCount: 132,
  followingCount: 147,
  posts: buildPosts(9),
};

// 7. Props
interface Props {
  onCloseNewChat: () => void;
  onOpenProfileStatus: (
    statuses: DataStatusUpdate[],
    activeStatusId: string
  ) => void;
  sidePanel?: ReactNode;
}

export default function ContactMain({
  onCloseNewChat,
  onOpenProfileStatus,
  sidePanel,
}: Props) {
  // 8. State
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeContactId, setActiveContactId] = useState<string | null>(null);

  // 9. Store / Controller
  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const activeProfile =
    activeContactId === SELF_PROFILE.id
      ? SELF_PROFILE
      : PROFILES.find((profile) => profile.id === activeContactId) ?? null;

  // 11. Methods / Handlers
  const handleOpenContact = (contactId: string) => {
    setActiveContactId(contactId);
  };

  const handleBackToList = () => {
    setActiveContactId(null);
  };

  const handleMessageContact = (contactId: string) => {
    const contact = CONTACTS.find((item) => item.id === contactId);
    notyfRef.current?.success(
      `Fitur kirim pesan ke ${contact?.name ?? "kontak"} belum tersedia.`
    );
  };

  const handleOpenPost = (postId: string) => {
    if (!activeProfile) return;

    const buildProfileStatus = (post: DataContactPost): DataStatusUpdate => ({
      id: `profile-${activeProfile.id}-${post.id}`,
      name: activeProfile.name,
      avatarUrl: activeProfile.avatarUrl,
      timeLabel: "Postingan",
      isViewed: false,
      isLiked: false,
      items: [{ id: post.id, imageUrl: post.imageUrl, caption: "" }],
    });

    const profileStatuses = activeProfile.posts.map(buildProfileStatus);
    const activeStatus = profileStatuses.find(
      (status) => status.items[0]?.id === postId
    );

    onOpenProfileStatus(profileStatuses, activeStatus?.id ?? profileStatuses[0].id);
  };

  const handleCreateGroup = () => {
    notyfRef.current?.success("Fitur grup baru belum tersedia.");
  };

  const handleCreateContact = () => {
    notyfRef.current?.success("Fitur kontak baru belum tersedia.");
  };

  const handleCreateCommunity = () => {
    notyfRef.current?.success("Fitur komunitas baru belum tersedia.");
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
  }, []);

  return (
    <div className="flex h-full w-full gap-6 bg-muted/40 p-0 xl:p-6">
      <div className="h-full w-full min-w-0 flex-1 overflow-hidden bg-background xl:rounded-2xl xl:border xl:shadow-sm">
        {activeProfile ? (
          <ContactProfile
            profile={activeProfile}
            onBack={handleBackToList}
            onMessageContact={handleMessageContact}
            onOpenMoreOptions={handleOpenMoreOptions}
            onOpenPost={handleOpenPost}
          />
        ) : (
          <ContactList
            self={SELF_CONTACT}
            contacts={CONTACTS}
            searchKeyword={searchKeyword}
            onChangeSearchKeyword={setSearchKeyword}
            onCloseNewChat={onCloseNewChat}
            onOpenContact={handleOpenContact}
            onCreateGroup={handleCreateGroup}
            onCreateContact={handleCreateContact}
            onCreateCommunity={handleCreateCommunity}
            onOpenMoreOptions={handleOpenMoreOptions}
          />
        )}
      </div>

      {sidePanel}
    </div>
  );
}
