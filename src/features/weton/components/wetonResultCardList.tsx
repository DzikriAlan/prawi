// 2. Import Types
import type { DataMatchWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import { Card, CardContent } from "@/components/ui/card";

// 7. Props
interface Props {
  data: DataMatchWeton[];
  onViewDetail: (result: string) => void;
}

export default function WetonResultCardList({ data, onViewDetail }: Props) {
  // 10. Computed / Derived
  const isEmpty = data.length === 0;

  if (isEmpty) {
    return (
      <div className="md:hidden">
        <Card>
          <CardContent className="py-6 text-center text-sm text-muted-foreground">
            Belum ada hasil. Klik &quot;Cari Weton Cocok&quot; untuk memulai.
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 md:hidden">
      {data.map((item) => (
        <Card key={`${item.date}-${item.weton}`}>
          <CardContent className="flex flex-col gap-1 py-4 text-sm">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold">{item.date}</span>
              <span className="text-muted-foreground">Skor {item.score}</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">{item.weton}</span>
              <button
                type="button"
                className="font-medium underline decoration-dotted underline-offset-4"
                onClick={() => onViewDetail(item.result)}
              >
                {item.result}
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
