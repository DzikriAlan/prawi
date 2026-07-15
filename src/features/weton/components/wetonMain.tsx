// 1. Import External Library
import { useEffect, useRef, useState } from "react";
import { Notyf } from "notyf";

// 2. Import Types
import type {
  PayloadMatchWeton,
  PayloadSingleWeton,
  MatchWeton,
  SingleWeton,
} from "../types/wetonTypes";

// Import Components
import WetonToolbar from "./wetonToolbar";
import WetonResultTable from "./wetonResultTable";
import WetonResultCardList from "./wetonResultCardList";
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
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const notyfRef = useRef<Notyf | null>(null);

  // 10. Computed / Derived
  const matchWetonData = matchWeton.data ?? [];
  const totalItems = matchWetonData.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPageData = matchWetonData.slice(
    (page - 1) * pageSize,
    (page - 1) * pageSize + pageSize
  );

  // 11. Methods / Handlers
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
        neptu: number;
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
                neptu,
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
    setIsMatchModalOpen(false);

    if (data.length > 0) {
      notyfRef.current?.success(`Ditemukan ${data.length} weton cocok.`);
    } else {
      notyfRef.current?.error("Tidak ditemukan weton cocok pada rentang tahun tersebut.");
    }
  };

  const handleChangePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
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
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 md:mx-auto md:max-w-3xl md:px-0 md:py-12">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold">Kalkulator Weton</h1>
        <p className="text-sm text-muted-foreground">
          Hitung weton dan cari weton yang cocok berdasarkan primbon Jawa.
        </p>
      </div>

      <WetonToolbar
        pageSize={pageSize}
        onChangePageSize={handleChangePageSize}
        onOpenMatchModal={handleOpenMatchModal}
        onOpenSingleModal={handleOpenSingleModal}
      />

      <WetonResultTable
        data={currentPageData}
        onViewDetail={handleViewDetail}
      />
      <WetonResultCardList
        data={currentPageData}
        onViewDetail={handleViewDetail}
      />

      {totalItems > 0 && (
        <WetonPagination
          page={page}
          totalPages={totalPages}
          onChangePage={handleChangePage}
        />
      )}

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
