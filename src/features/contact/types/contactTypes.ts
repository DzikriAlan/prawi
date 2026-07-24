// Satu kontak pada daftar kontak baru
export interface DataContact {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  subtitle: string;
  isBusiness: boolean;
}

// Satu postingan pada grid profil kontak
export interface DataContactPost {
  id: string;
  imageUrl: string;
  isMultiple: boolean;
}

// Profil detail kontak (gaya Instagram)
export interface DataContactProfile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  bio: string;
  postCount: number;
  followerCount: number;
  followingCount: number;
  posts: DataContactPost[];
}
