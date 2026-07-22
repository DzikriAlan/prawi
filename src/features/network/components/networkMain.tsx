// 1. Import External Library
import { useEffect, useRef, useState } from "react";

// 2. Import Types
import type { DataNetworkPerson } from "../types/networkTypes";

// 4. Import States / Stores
import { useSearchStore } from "@/shared/lib/searchStore";

// Import Components
import NetworkCard from "./networkCard";
import NetworkCardSkeleton from "./networkCardSkeleton";

// Import Shadcn/UI Components
import { LoadData } from "@/components/ui/load-data";

const NAMES = [
  "Muhammad Najmi Briliant",
  "Listy Indriyanti",
  "Musthofa Joko Anggoro",
  "Naja Jeloudar",
  "Ricardo Palungguk Natama",
  "Mario Adriel Gosal",
  "Yosef Nuraga Wicaksana",
  "Aisha Fajri Munawaroh",
  "Dewi Anggraini Putri",
  "Bagas Satria Wibowo",
  "Clara Amelia Santoso",
  "Fajar Ramadhan Siregar",
  "Gita Permata Sari",
  "Hendra Kusuma Wijaya",
  "Intan Permatasari",
  "Joko Prasetyo",
  "Kirana Ayu Lestari",
  "Lukman Hakim Nasution",
  "Maya Puspita Dewi",
  "Nadia Rahmawati",
  "Oscar Pratama Putra",
  "Putri Wulandari",
  "Qori Fauzan Akbar",
  "Rangga Adi Saputra",
  "Sari Kusumawardani",
  "Tegar Bayu Aji",
  "Umi Kalsum Fadillah",
  "Vino Aditya Nugraha",
  "Wulan Dari Anjani",
  "Xaverius Adrian Tan",
  "Yudha Pratama Wijaya",
  "Zahra Anindya Putri",
  "Ahmad Faisal Rahman",
  "Bella Safitri",
  "Chandra Dwi Kurniawan",
  "Diana Puspa Ningrum",
  "Erlangga Surya Putra",
  "Farah Nabila Zahra",
  "Galih Setiawan",
  "Hana Kamila Rizki",
  "Irfan Maulana Yusuf",
  "Jasmine Aulia Rahma",
  "Kevin Alexander Halim",
  "Laila Nur Fadhilah",
  "Muhammad Reza Pahlevi",
  "Nabila Az Zahra",
  "Omar Syarif Hidayat",
  "Priska Amanda Wijaya",
  "Rizky Firmansyah",
  "Salsabila Putri Ramadhani",
];

const TITLES = [
  "Product Manager · Ex Startup Founder",
  "Software Engineer · Backend Specialist",
  "UI/UX Designer · Design System Enthusiast",
  "Data Analyst · Business Intelligence",
  "Human Resources · Talent Acquisition",
  "Marketing Lead · Brand Strategy",
  "Business Development Manager",
  "Content Creator · Digital Strategist",
  "Finance Analyst · Investment Enthusiast",
  "R&D Engineer · Information Security",
];

const BIOS = [
  "Suka berbagi insight seputar dunia kerja dan produktivitas.",
  "Senang berkolaborasi lintas tim untuk membangun produk yang berdampak.",
  "Aktif belajar hal baru dan terbuka untuk diskusi seru.",
  "Percaya bahwa kolaborasi yang baik lahir dari komunikasi yang jujur.",
  "Menikmati proses belajar dari setiap tantangan pekerjaan.",
  "Tertarik pada isu teknologi, desain, dan pengembangan diri.",
  "Selalu antusias mencoba pendekatan baru dalam bekerja.",
  "Percaya kolaborasi lintas disiplin menghasilkan solusi terbaik.",
  "Suka mengeksplorasi ide-ide baru bersama tim yang solid.",
  "Berkomitmen memberi dampak positif lewat pekerjaan sehari-hari.",
];

const INTERESTS = [
  "Fotografi, traveling, kuliner",
  "Membaca buku, menulis, film dokumenter",
  "Olahraga, hiking, musik",
  "Desain, teknologi, seni digital",
  "Investasi, podcast bisnis, networking",
  "Musik, konser, fotografi",
  "Coding, open source, teknologi",
  "Yoga, meditasi, gaya hidup sehat",
  "Kuliner, traveling, budaya lokal",
  "Board game, film, komunitas kreatif",
];

const LOCATIONS = [
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Semarang",
  "Medan",
  "Denpasar",
  "Makassar",
  "Malang",
  "Palembang",
  "Balikpapan",
  "Bogor",
  "Depok",
  "Tangerang",
  "Bekasi",
];

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
  "1560250097-0b93528c311a",
  "1590086782957-93c06ef21604",
  "1607990281513-2c110a25bd8c",
  "1517070208541-6ddc4d3efbcb",
  "1544723795-3fb6469f5b39",
  "1502685104226-ee32379fefbe",
  "1601412436009-d964bd02edbc",
  "1633332755192-727a05c4013d",
  "1614289371518-722f2615943d",
  "1573165231977-3f0e27806045",
  "1633419461186-7d40a38105ec",
  "1522075469751-3a6694fb2f61",
];

const COVER_PHOTO_IDS = [
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
  "1497366412874-3415097a27e7",
  "1454165804606-c3d57bc86b40",
  "1531482615713-2afd69097998",
  "1497215728101-856f4ea42174",
  "1512314889357-e157c22f938d",
  "1497032628192-86f99bcd76bc",
  "1553877522-43269d4ea984",
  "1521791136064-7986c2920216",
];

const DUMMY_NETWORK_PEOPLE: DataNetworkPerson[] = NAMES.map((name, index) => ({
  id: String(index + 1),
  name,
  verified: index % 3 !== 0,
  title: TITLES[index % TITLES.length],
  coverUrl: `https://images.unsplash.com/photo-${COVER_PHOTO_IDS[index % COVER_PHOTO_IDS.length]}?w=400&h=200&fit=crop`,
  avatarUrl: `https://images.unsplash.com/photo-${AVATAR_PHOTO_IDS[index % AVATAR_PHOTO_IDS.length]}?w=200&h=200&fit=crop`,
  bio: BIOS[index % BIOS.length],
  interests: INTERESTS[index % INTERESTS.length],
  location: LOCATIONS[index % LOCATIONS.length],
  birthDate: `${((index * 7) % 28) + 1}/${((index * 5) % 12) + 1}/${1988 + (index % 20)}`,
}));

const PAGE_SIZE = 10;
const LOAD_MORE_DELAY_MS = 800;

export default function NetworkMain() {
  // 9. Store / Controller
  const searchQuery = useSearchStore((state) => state.searchQuery);

  // 8. State
  const [networkPeople, setNetworkPeople] = useState<DataNetworkPerson[]>(
    DUMMY_NETWORK_PEOPLE
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // 10. Computed / Derived
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const isSearchActive = normalizedSearchQuery !== "";
  const searchedPeople = isSearchActive
    ? networkPeople.filter((person) =>
        `${person.name} ${person.title} ${person.location}`
          .toLowerCase()
          .includes(normalizedSearchQuery)
      )
    : networkPeople;
  const visiblePeople = isSearchActive
    ? searchedPeople
    : searchedPeople.slice(0, visibleCount);
  const hasMore = !isSearchActive && visibleCount < networkPeople.length;
  const hasNoSearchResult = isSearchActive && searchedPeople.length === 0;

  // 11. Methods / Handlers
  const handleDismissPerson = (id: string) => {
    setNetworkPeople((state) => state.filter((person) => person.id !== id));
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);

    setTimeout(() => {
      setVisibleCount((state) => Math.min(state + PAGE_SIZE, networkPeople.length));
      setIsLoadingMore(false);
    }, LOAD_MORE_DELAY_MS);
  };

  // 12. Effects
  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) handleLoadMore();
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore]);

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 md:mx-auto md:max-w-4xl md:px-8 md:py-12">
      <LoadData
        response={{
          isEmpty: hasNoSearchResult,
          emptyTitle: "Tidak ditemukan hasil",
          emptySubtitle: `Tidak ada hasil untuk "${searchQuery.trim()}".`,
        }}
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visiblePeople.map((person) => (
            <NetworkCard
              key={person.id}
              person={person}
              onDismissPerson={handleDismissPerson}
            />
          ))}

          {isLoadingMore &&
            Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <NetworkCardSkeleton key={`skeleton-${index}`} />
            ))}
        </div>
      </LoadData>

      {hasMore && <div ref={loadMoreRef} />}
    </div>
  );
}
