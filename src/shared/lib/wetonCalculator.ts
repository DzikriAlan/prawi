const DAYS = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const PASARAN = ["Legi", "Pahing", "Pon", "Wage", "Kliwon"];

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

export interface WetonResult {
  hari: string;
  pasaran: string;
  weton: string;
  neptu: number;
}

export interface PrimbonMatch {
  result: string;
  score: number;
  totalNeptu: number;
}

export function getWetonFromDate(date: string): WetonResult | null {
  // Function utilitas (hanya digunakan di dalam parent function ini)
  function mod(value: number, divisor: number): number {
    return ((value % divisor) + divisor) % divisor;
  }

  function julianDay(year: number, month: number, day: number): number {
    let adjustedYear = year;
    let adjustedMonth = month;

    if (adjustedMonth <= 2) {
      adjustedYear--;
      adjustedMonth += 12;
    }

    const a = Math.floor(adjustedYear / 100);
    const b = 2 - a + Math.floor(a / 4);

    return (
      Math.floor(365.25 * (adjustedYear + 4716)) +
      Math.floor(30.6001 * (adjustedMonth + 1)) +
      day +
      b -
      1524
    );
  }

  const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(date);

  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);

  const jd = julianDay(year, month, day);

  const hari = DAYS[mod(jd + 1, 7)];
  const pasaran = PASARAN[mod(jd, 5)];

  return {
    hari,
    pasaran,
    weton: `${hari} ${pasaran}`,
    neptu: HARI_NEPTU[hari] + PASARAN_NEPTU[pasaran],
  };
}

export function getPrimbonMatch(neptuA: number, neptuB: number): PrimbonMatch {
  const totalNeptu = neptuA + neptuB;
  const result = PRIMBON.find((primbon) => primbon.values.includes(totalNeptu))?.name ?? "-";
  const score = SCORE[result] ?? 0;

  return { result, score, totalNeptu };
}
