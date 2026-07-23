// 1. Import External Library
import { useEffect, useRef, useState } from "react";
import { Notyf } from "notyf";
import { ArrowLeft, BadgeCheck, Search } from "lucide-react";

// Import Shared Lib
import { cn } from "@/shared/lib/utils";
import { useExploreStore } from "@/shared/lib/exploreStore";

// 2. Import Types
import type {
  DataWetonGroup,
  DataWetonPerson,
  DataWetonTopic,
  PayloadMatchWeton,
  PayloadSingleWeton,
  MatchWeton,
  SingleWeton,
} from "../types/wetonTypes";

// Import Components
import WetonPersonCard from "./wetonPersonCard";
import WetonProfileProgressCard from "./wetonProfileProgressCard";
import WetonSuggestionList from "./wetonSuggestionList";
import WetonTopicList from "./wetonTopicList";
import WetonGroupList from "./wetonGroupList";
import WetonMatchCard from "./wetonMatchCard";
import WetonPagination from "./wetonPagination";
import WetonMatchModal from "./wetonMatchModal";
import WetonSingleModal from "./wetonSingleModal";
import WetonResultDetailModal from "./wetonResultDetailModal";

const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const HARI_NEPTU: Record<string, number> = {
  Minggu: 5,
  Senin: 4,
  Selasa: 3,
  Rabu: 7,
  Kamis: 8,
  Jumat: 6,
  Sabtu: 9,
};

const PASARAN_NEPTU: Record<string, number> = {
  Legi: 5,
  Pahing: 9,
  Pon: 7,
  Wage: 4,
  Kliwon: 8,
};

const PRIMBON = [
  { name: "Pegat", values: [1, 9, 17, 25, 33] },
  { name: "Ratu", values: [2, 10, 18, 26, 34] },
  { name: "Jodoh", values: [3, 11, 19, 27, 35] },
  { name: "Topo", values: [4, 12, 20, 28, 36] },
  { name: "Tinari", values: [5, 13, 21, 29] },
  { name: "Padu", values: [6, 14, 22, 30] },
  { name: "Sujanan", values: [7, 15, 23, 31] },
  { name: "Pesthi", values: [8, 16, 24, 32] },
];

const SCORE: Record<string, number> = {
  Ratu: 100,
  Jodoh: 100,
  Tinari: 95,
  Pesthi: 92,
  Topo: 85,
  Padu: 70,
  Sujanan: 60,
  Pegat: 40,
};

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

const DUMMY_WETON_PEOPLE: DataWetonPerson[] = NAMES.map((name, index) => ({
  id: String(index + 1),
  name,
  verified: index % 3 !== 0,
  title: TITLES[index % TITLES.length],
  coverUrl: `https://images.unsplash.com/photo-${COVER_PHOTO_IDS[index % COVER_PHOTO_IDS.length]}?w=400&h=160&fit=crop`,
  avatarUrl: `https://images.unsplash.com/photo-${AVATAR_PHOTO_IDS[index % AVATAR_PHOTO_IDS.length]}?w=200&h=200&fit=crop`,
  bio: BIOS[index % BIOS.length],
  interests: INTERESTS[index % INTERESTS.length],
  location: LOCATIONS[index % LOCATIONS.length],
  birthDate: `${((index * 7) % 28) + 1}/${((index * 5) % 12) + 1}/${1988 + (index % 20)}`,
}));

const POPULAR_TOPICS: DataWetonTopic[] = [
  { id: "1", name: "RemoteWork", postLabel: "12.4K postingan", trend: [4, 6, 5, 8, 7, 11] },
  { id: "2", name: "ProductDesign", postLabel: "8.7K postingan", trend: [7, 5, 6, 5, 8, 10] },
  { id: "3", name: "CareerGrowth", postLabel: "6.1K postingan", trend: [3, 5, 4, 6, 8, 9] },
  { id: "4", name: "StartupLife", postLabel: "5.3K postingan", trend: [6, 4, 5, 7, 6, 9] },
];

const POPULAR_GROUPS: DataWetonGroup[] = [
  { id: "1", name: "UI/UX Indonesia", memberLabel: "12.8K anggota", isJoined: false },
  { id: "2", name: "Komunitas Weton", memberLabel: "4.2K anggota", isJoined: false },
];

const DEFAULT_PAGE_SIZE = 10;

export default function WetonMain() {
  // 8. State
  const [matchWeton, setMatchWeton] = useState<MatchWeton>({
    status: "empty",
    statusTitle: "Belum ada hasil",
    statusSubtitle: "Silakan isi form pencarian weton cocok.",
    data: null,
  });

  const [singleWeton, setSingleWeton] = useState<SingleWeton>({
    status: "empty",
    statusTitle: "Belum ada hasil",
    statusSubtitle: "Silakan isi form cek weton.",
    data: null,
  });

  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(DEFAULT_PAGE_SIZE);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMode, setActiveMode] = useState<"people" | "match">("people");
  const [peopleSearchQuery, setPeopleSearchQuery] = useState("");
  const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  const [popularGroups, setPopularGroups] =
    useState<DataWetonGroup[]>(POPULAR_GROUPS);

  // 9. Store / Controller
  const setExploreOpen = useExploreStore((state) => state.setExploreOpen);

  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const matchWetonData = matchWeton.data ?? [];
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();
  const filteredMatchWetonData = normalizedSearchQuery
    ? matchWetonData.filter((item) =>
        `${item.date} ${item.weton} ${item.result}`
          .toLowerCase()
          .includes(normalizedSearchQuery)
      )
    : matchWetonData;
  const hasSearchResult = matchWetonData.length > 0 && normalizedSearchQuery !== "";
  const totalItems = filteredMatchWetonData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPageData = filteredMatchWetonData.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  const wetonPeople = getWetonPeople();
  const suggestedPeople = DUMMY_WETON_PEOPLE.slice(0, 3);
  const isPeopleMode = activeMode === "people";
  const isEmptyPeople = wetonPeople.length === 0;
  const isEmptyMatch = currentPageData.length === 0;
  const matchEmptyMessage = hasSearchResult
    ? "Tidak ada hasil yang cocok dengan pencarian."
    : 'Belum ada hasil. Klik "Cari Weton Cocok" untuk memulai.';

  // 11. Methods / Handlers
  function getWetonPeople() {
    const keyword = peopleSearchQuery.trim().toLowerCase();

    return DUMMY_WETON_PEOPLE.filter((person) => {
      if (isVerifiedOnly && !person.verified) return false;
      if (!keyword) return true;

      return `${person.name} ${person.title} ${person.location} ${person.interests}`
        .toLowerCase()
        .includes(keyword);
    });
  }

  const handleToggleVerifiedOnly = () => {
    setIsVerifiedOnly((state) => !state);
  };

  const handleShowAllSuggestions = () => {
    notyfRef.current?.success("Halaman rekomendasi lengkap belum tersedia.");
  };

  const handleToggleJoinGroup = (groupId: string) => {
    setPopularGroups((state) =>
      state.map((group) =>
        group.id === groupId ? { ...group, isJoined: !group.isJoined } : group
      )
    );
  };

  const handleCompleteProfile = () => {
    notyfRef.current?.success("Form lengkapi profil belum tersedia.");
  };

  const handleCloseExplore = () => {
    setExploreOpen(false);
  };

  const handleSelectMode = (mode: "people" | "match") => {
    setActiveMode(mode);
  };

  const handleGreetPerson = (personId: string) => {
    const person = DUMMY_WETON_PEOPLE.find((item) => item.id === personId);
    notyfRef.current?.success(
      `Permintaan terhubung ke ${person?.name ?? ""} berhasil dikirim.`
    );
  };

  const handleCalculateWeton = (payload: PayloadSingleWeton) => {
    // Function utilitas (hanya digunakan di dalam parent function ini)
    function mod(value: number, divisor: number): number {
      return ((value % divisor) + divisor) % divisor;
    }

    function julianDay(year: number, month: number, day: number): number {
      if (month <= 2) {
        year--;
        month += 12;
      }

      const a = Math.floor(year / 100);
      const b = 2 - a + Math.floor(a / 4);

      return (
        Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day +
        b -
        1524
      );
    }

    function getWeton(year: number, month: number, day: number) {
      const jd = julianDay(year, month, day);

      const hari = DAYS[mod(jd + 1, 7)];
      const pasaran = PASARAN[mod(jd, 5)];

      return {
        hari,
        pasaran,
        weton: `${hari} ${pasaran}`,
      };
    }

    function getWetonFromString(date: string) {
      const [day, month, year] = date.split(/[/-]/).map(Number);

      return getWeton(year, month, day);
    }

    setSingleWeton((state) => ({ ...state, status: "loading" }));

    const data = getWetonFromString(payload.date);

    setSingleWeton({
      status: "success",
      statusTitle: "Berhasil",
      statusSubtitle: "Weton berhasil dihitung.",
      data,
    });

    notyfRef.current?.success(`Weton: ${data.weton}`);
  };

  const handleCalculateMatch = (payload: PayloadMatchWeton) => {
    // Function utilitas (hanya digunakan di dalam parent function ini)
    function mod(value: number, divisor: number): number {
      return ((value % divisor) + divisor) % divisor;
    }

    function julianDay(year: number, month: number, day: number): number {
      if (month <= 2) {
        year--;
        month += 12;
      }

      const a = Math.floor(year / 100);
      const b = 2 - a + Math.floor(a / 4);

      return (
        Math.floor(365.25 * (year + 4716)) +
        Math.floor(30.6001 * (month + 1)) +
        day +
        b -
        1524
      );
    }

    function getWeton(year: number, month: number, day: number) {
      const jd = julianDay(year, month, day);

      const hari = DAYS[mod(jd + 1, 7)];
      const pasaran = PASARAN[mod(jd, 5)];

      return {
        hari,
        pasaran,
        weton: `${hari} ${pasaran}`,
      };
    }

    function getWetonFromString(date: string) {
      const [day, month, year] = date.split(/[/-]/).map(Number);

      return getWeton(year, month, day);
    }

    function getNeptu(date: string) {
      const { hari, pasaran } = getWetonFromString(date);

      return HARI_NEPTU[hari] + PASARAN_NEPTU[pasaran];
    }

    function getPrimbonResult(total: number) {
      return PRIMBON.find((v) => v.values.includes(total))?.name ?? "-";
    }

    function getMatchWeton(
      targetDate: string,
      startYear: number,
      endYear: number
    ) {
      const targetNeptu = getNeptu(targetDate);

      const result: {
        date: string;
        weton: string;
        totalNeptu: number;
        result: string;
        score: number;
      }[] = [];

      for (let year = startYear; year <= endYear; year++) {
        for (let month = 1; month <= 12; month++) {
          const lastDay = new Date(year, month, 0).getDate();

          for (let day = 1; day <= lastDay; day++) {
            const weton = getWeton(year, month, day);

            const neptu = HARI_NEPTU[weton.hari] + PASARAN_NEPTU[weton.pasaran];

            const total = targetNeptu + neptu;

            const primbon = getPrimbonResult(total);

            const score = SCORE[primbon] ?? 0;

            if (score >= 90) {
              result.push({
                date: `${weton.hari} ${day} ${MONTHS[month - 1]} ${year}`,
                weton: weton.weton,
                totalNeptu: total,
                result: primbon,
                score,
              });
            }
          }
        }
      }

      return result.sort((a, b) => b.score - a.score);
    }

    setMatchWeton((state) => ({ ...state, status: "loading" }));

    const data = getMatchWeton(
      payload.targetDate,
      payload.startYear,
      payload.endYear
    );

    setMatchWeton({
      status: data.length > 0 ? "success" : "empty",
      statusTitle: data.length > 0 ? "Berhasil" : "Tidak ditemukan",
      statusSubtitle:
        data.length > 0
          ? "Weton cocok berhasil ditemukan."
          : "Tidak ada weton cocok pada rentang tahun tersebut.",
      data,
    });

    setPage(1);
    setSearchQuery("");
    setIsMatchModalOpen(false);

    if (data.length > 0) {
      notyfRef.current?.success(`Ditemukan ${data.length} weton cocok.`);
    } else {
      notyfRef.current?.error("Tidak ditemukan weton cocok pada rentang tahun tersebut.");
    }
  };

  const handleChangeSearchQuery = (newSearchQuery: string) => {
    setSearchQuery(newSearchQuery);
    setPage(1);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleOpenMatchModal = () => {
    setIsMatchModalOpen(true);
  };

  const handleOpenChangeMatchModal = (open: boolean) => {
    setIsMatchModalOpen(open);
  };

  const handleOpenSingleModal = () => {
    setIsSingleModalOpen(true);
  };

  const handleViewDetail = (result: string) => {
    setSelectedResult(result);
    setIsDetailModalOpen(true);
  };

  const handleOpenChangeDetailModal = (open: boolean) => {
    setIsDetailModalOpen(open);
  };

  const handleOpenChangeSingleModal = (open: boolean) => {
    setIsSingleModalOpen(open);

    if (!open) {
      setSingleWeton({
        status: "empty",
        statusTitle: "Belum ada hasil",
        statusSubtitle: "Silakan isi form cek weton.",
        data: null,
      });
    }
  };

  // 12. Effects
  useEffect(() => {
    notyfRef.current = new Notyf({
      duration: 3000,
      position: { x: "right", y: "top" },
    });
  }, []);

  return (
    <div className="flex h-full w-full bg-background">
      <div className="no-scrollbar flex h-full min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex flex-col gap-4 px-4 pb-4 pt-6 sm:px-5">
          <div className="flex items-start gap-2">
            <button
              type="button"
              onClick={handleCloseExplore}
              aria-label="Kembali ke obrolan"
              className="-ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="text-[22px] font-bold leading-none tracking-tight text-foreground">
                Jelajahi Orang
              </h1>
              <p className="text-xs text-muted-foreground">
                Temukan orang baru atau cari tanggal dengan weton yang cocok.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectMode("people")}
              className={cn(
                "h-9 rounded-full px-4 text-[13px] transition-colors",
                isPeopleMode
                  ? "bg-primary/10 font-semibold text-primary"
                  : "border text-muted-foreground hover:bg-muted"
              )}
            >
              Cari Orang
            </button>

            <button
              type="button"
              onClick={() => handleSelectMode("match")}
              className={cn(
                "h-9 rounded-full px-4 text-[13px] transition-colors",
                isPeopleMode
                  ? "border text-muted-foreground hover:bg-muted"
                  : "bg-primary/10 font-semibold text-primary"
              )}
            >
              Weton Cocok
            </button>
          </div>

          {isPeopleMode ? (
            <div className="flex items-center gap-2">
              <div className="flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-full border bg-background px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

                <input
                  type="text"
                  value={peopleSearchQuery}
                  placeholder="Cari nama, profesi, atau kota"
                  onChange={(event) => setPeopleSearchQuery(event.target.value)}
                  className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <button
                type="button"
                onClick={handleToggleVerifiedOnly}
                aria-pressed={isVerifiedOnly}
                className={cn(
                  "flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-xs font-semibold transition-colors",
                  isVerifiedOnly
                    ? "bg-primary/10 text-primary"
                    : "border text-muted-foreground hover:bg-muted"
                )}
              >
                <BadgeCheck className="h-4 w-4" />
                Terverifikasi
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex h-11 flex-1 items-center gap-2.5 rounded-full border bg-background px-4">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Cari tanggal, weton, atau hasil"
                  onChange={(event) => handleChangeSearchQuery(event.target.value)}
                  className="h-full flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleOpenMatchModal}
                  className="h-11 flex-1 shrink-0 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:flex-none"
                >
                  Cari Weton Cocok
                </button>

                <button
                  type="button"
                  onClick={handleOpenSingleModal}
                  className="h-11 flex-1 shrink-0 rounded-full border px-4 text-xs font-semibold text-foreground transition-colors hover:bg-muted sm:flex-none"
                >
                  Hitung Weton
                </button>
              </div>
            </div>
          )}
      </div>

      {isPeopleMode && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-28 sm:grid-cols-2 sm:px-5 md:pb-8 xl:grid-cols-3">
          {wetonPeople.map((person) => (
            <WetonPersonCard
              key={person.id}
              person={person}
              onGreetPerson={handleGreetPerson}
            />
          ))}

          {isEmptyPeople && (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
              Tidak ada orang yang cocok dengan pencarian.
            </p>
          )}
        </div>
      )}

      {!isPeopleMode && (
        <div className="grid grid-cols-1 gap-3 px-4 pb-28 sm:grid-cols-2 sm:px-5 md:pb-8 xl:grid-cols-3">
          {currentPageData.map((item) => (
            <WetonMatchCard
              key={`${item.date}-${item.weton}`}
              match={item}
              onViewDetail={handleViewDetail}
            />
          ))}

          {isEmptyMatch && (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">
              {matchEmptyMessage}
            </p>
          )}

          {totalItems > 0 && (
            <div className="col-span-full">
              <WetonPagination
                page={page}
                totalPages={totalPages}
                onChangePage={handleChangePage}
              />
            </div>
          )}
        </div>
      )}

      </div>

      <aside className="hidden h-full w-[300px] shrink-0 flex-col gap-3 overflow-hidden border-l p-4 xl:flex 2xl:w-[340px]">
        <WetonProfileProgressCard
          completedStep={4}
          totalStep={5}
          onCompleteProfile={handleCompleteProfile}
        />

        <WetonSuggestionList
          people={suggestedPeople}
          onGreetPerson={handleGreetPerson}
          onShowAllSuggestions={handleShowAllSuggestions}
        />

        <WetonTopicList
          topics={POPULAR_TOPICS}
          onShowAllTopics={handleShowAllSuggestions}
        />

        <WetonGroupList
          groups={popularGroups}
          onToggleJoinGroup={handleToggleJoinGroup}
          onShowAllGroups={handleShowAllSuggestions}
        />
      </aside>

      <WetonMatchModal
        open={isMatchModalOpen}
        loading={matchWeton.status === "loading"}
        onOpenChange={handleOpenChangeMatchModal}
        onCalculateMatch={handleCalculateMatch}
      />

      <WetonSingleModal
        open={isSingleModalOpen}
        loading={singleWeton.status === "loading"}
        singleWeton={singleWeton}
        onOpenChange={handleOpenChangeSingleModal}
        onCalculateWeton={handleCalculateWeton}
      />

      <WetonResultDetailModal
        open={isDetailModalOpen}
        result={selectedResult}
        onOpenChange={handleOpenChangeDetailModal}
      />
    </div>
  );
}
