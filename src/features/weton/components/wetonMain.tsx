// 1. Import External Library
import { useState } from "react";

// 2. Import Types
import type {
  PayloadMatchWeton,
  PayloadSingleWeton,
  MatchWeton,
  SingleWeton,
} from "../types/wetonTypes";

// Import Components
import WetonMatchForm from "./wetonMatchForm";
import WetonSingleForm from "./wetonSingleForm";
import WetonResult from "./wetonResult";

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

    const [year, month, day] = payload.date.split("-");
    const data = getWetonFromString(`${day}/${month}/${year}`);

    setSingleWeton({
      status: "success",
      statusTitle: "Berhasil",
      statusSubtitle: "Weton berhasil dihitung.",
      data,
    });
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

    const [year, month, day] = payload.targetDate.split("-");
    const data = getMatchWeton(
      `${day}/${month}/${year}`,
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
  };

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-8 sm:px-6 md:mx-auto md:max-w-xl md:px-0 md:py-12">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold">Kalkulator Weton</h1>
        <p className="text-sm text-muted-foreground">
          Hitung weton dan cari weton yang cocok berdasarkan primbon Jawa.
        </p>
      </div>

      <WetonMatchForm
        loading={matchWeton.status === "loading"}
        onCalculateMatch={handleCalculateMatch}
      />

      <WetonSingleForm
        loading={singleWeton.status === "loading"}
        onCalculateWeton={handleCalculateWeton}
      />

      <WetonResult
        matchWeton={matchWeton}
        singleWeton={singleWeton}
      />
    </div>
  );
}
