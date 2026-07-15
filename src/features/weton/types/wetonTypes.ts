// Form values: input untuk section getMatch
export interface PayloadMatchWeton {
  targetDate: string;
  startYear: number;
  endYear: number;
}

// Form values: input untuk section getWeton
export interface PayloadSingleWeton {
  date: string;
}

// Satu baris hasil pencarian weton yang cocok
export interface DataMatchWeton {
  date: string;
  weton: string;
  neptu: number;
  result: string;
  score: number;
}

// Hasil perhitungan weton dari satu tanggal
export interface DataSingleWeton {
  hari: string;
  pasaran: string;
  weton: string;
}

// Reactive state shape untuk section getMatch
export interface MatchWeton {
  status: string;
  statusTitle: string;
  statusSubtitle: string;
  data: DataMatchWeton[] | null;
}

// Reactive state shape untuk section getWeton
export interface SingleWeton {
  status: string;
  statusTitle: string;
  statusSubtitle: string;
  data: DataSingleWeton | null;
}
