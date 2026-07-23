// 1. Import External Library
import { MessagesSquare } from "lucide-react";

export default function ChatEmptyPanel() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-muted/40 px-8 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MessagesSquare className="h-7 w-7" />
      </span>

      <span className="text-base font-semibold text-foreground">
        Pilih sebuah obrolan
      </span>

      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        Percakapan yang Anda pilih akan tampil di panel ini, lengkap dengan
        riwayat pesannya.
      </p>
    </div>
  );
}
