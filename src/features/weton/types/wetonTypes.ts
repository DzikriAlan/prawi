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

// Satu profil orang yang tampil pada mode pencarian orang
export interface DataWetonPerson {
  id: string;
  name: string;
  verified: boolean;
  title: string;
  coverUrl: string;
  avatarUrl: string;
  bio: string;
  interests: string;
  location: string;
  birthDate: string;
}

// Satu topik yang sedang populer
export interface DataWetonTopic {
  id: string;
  name: string;
  postLabel: string;
  trend: number[];
}

// Satu grup yang bisa diikuti
export interface DataWetonGroup {
  id: string;
  name: string;
  memberLabel: string;
  isJoined: boolean;
}

// Satu baris hasil pencarian weton yang cocok
export interface DataMatchWeton {
  date: string;
  weton: string;
  totalNeptu: number;
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
