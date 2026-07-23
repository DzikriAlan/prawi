// Satu unggahan di dalam satu akun status
export interface DataStatusItem {
  id: string;
  imageUrl: string;
  caption: string;
}

// Kumpulan status milik satu kontak
export interface DataStatusUpdate {
  id: string;
  name: string;
  avatarUrl: string;
  timeLabel: string;
  isViewed: boolean;
  items: DataStatusItem[];
  isLiked: boolean;
}
