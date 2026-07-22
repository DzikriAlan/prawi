// Satu update status milik kontak
export interface DataStatusUpdate {
  id: string;
  name: string;
  avatarUrl: string;
  timeLabel: string;
  isViewed: boolean;
  imageUrl: string;
  caption: string;
  isLiked: boolean;
}

// Satu saluran yang bisa diikuti
export interface DataStatusChannel {
  id: string;
  name: string;
  avatarUrl: string;
  followerLabel: string;
  verified: boolean;
  isFollowing: boolean;
}
