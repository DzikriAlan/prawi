// 1. Import External Library
import { useRef } from "react";
import Image from "next/image";
import { Camera, ImagePlus } from "lucide-react";

// 2. Import Types
import type { PayloadStoreProfile } from "../types/profileTypes";

// Import Shadcn/UI Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PURPOSE_OPTIONS = [
  "Mencari Pasangan",
  "Pertemanan",
  "Networking Bisnis",
  "Kolaborasi Kerja",
];

const ACTIVITY_LEVEL_OPTIONS = ["Sangat Aktif", "Aktif", "Jarang Aktif"];

// 7. Props
interface Props {
  payload: PayloadStoreProfile;
  onChangePayload: (partialPayload: Partial<PayloadStoreProfile>) => void;
}

export default function ProfileForm({ payload, onChangePayload }: Props) {
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // 11. Methods / Handlers
  const handlePickBannerImage = () => {
    bannerInputRef.current?.click();
  };

  const handlePickAvatarImage = () => {
    avatarInputRef.current?.click();
  };

  const handleChangeBannerImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) onChangePayload({ bannerImageUrl: URL.createObjectURL(file) });
  };

  const handleChangeAvatarImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) onChangePayload({ avatarImageUrl: URL.createObjectURL(file) });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <button
          type="button"
          onClick={handlePickBannerImage}
          className="relative flex h-28 w-full items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted"
        >
          {payload.bannerImageUrl ? (
            <Image
              src={payload.bannerImageUrl}
              alt="Banner"
              fill
              className="object-cover"
            />
          ) : (
            <span className="flex flex-col items-center gap-1 text-xs text-muted-foreground">
              <ImagePlus className="h-5 w-5" />
              Unggah banner
            </span>
          )}
        </button>
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeBannerImage}
        />

        <button
          type="button"
          onClick={handlePickAvatarImage}
          className="absolute -bottom-6 left-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted"
        >
          {payload.avatarImageUrl ? (
            <Image
              src={payload.avatarImageUrl}
              alt="Foto profil"
              fill
              className="object-cover"
            />
          ) : (
            <Camera className="h-5 w-5 text-muted-foreground" />
          )}
        </button>
        <input
          ref={avatarInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChangeAvatarImage}
        />
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Label htmlFor="birthDate">Tanggal Lahir</Label>
        <Input
          id="birthDate"
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/yyyy"
          maxLength={10}
          value={payload.birthDate}
          onChange={(event) =>
            onChangePayload({ birthDate: event.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="purpose">Tujuan</Label>
        <Select
          value={payload.purpose}
          onValueChange={(value) => onChangePayload({ purpose: value })}
        >
          <SelectTrigger id="purpose">
            <SelectValue placeholder="Pilih tujuan" />
          </SelectTrigger>
          <SelectContent>
            {PURPOSE_OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="interests">Minat</Label>
        <Input
          id="interests"
          type="text"
          placeholder="Contoh: fotografi, traveling, kuliner"
          value={payload.interests}
          onChange={(event) =>
            onChangePayload({ interests: event.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="location">Domisili</Label>
        <Input
          id="location"
          type="text"
          placeholder="Contoh: Bandung, Jawa Barat"
          value={payload.location}
          onChange={(event) =>
            onChangePayload({ location: event.target.value })
          }
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">Tentang Saya</Label>
        <Textarea
          id="bio"
          placeholder="Ceritakan sedikit tentang diri Anda"
          value={payload.bio}
          onChange={(event) => onChangePayload({ bio: event.target.value })}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="activityLevel">Status Aktivitas</Label>
        <Select
          value={payload.activityLevel}
          onValueChange={(value) => onChangePayload({ activityLevel: value })}
        >
          <SelectTrigger id="activityLevel">
            <SelectValue placeholder="Pilih status aktivitas" />
          </SelectTrigger>
          <SelectContent>
            {ACTIVITY_LEVEL_OPTIONS.map((option) => (
              <SelectItem
                key={option}
                value={option}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
