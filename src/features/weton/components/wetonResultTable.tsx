// 2. Import Types
import type { DataMatchWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

// 7. Props
interface Props {
  data: DataMatchWeton[];
  hasSearchResult: boolean;
  onViewDetail: (result: string) => void;
}

export default function WetonResultTable({ data, hasSearchResult, onViewDetail }: Props) {
  // 10. Computed / Derived
  const isEmpty = data.length === 0;
  const emptyMessage = hasSearchResult
    ? "Tidak ada hasil yang cocok dengan pencarian."
    : 'Belum ada hasil. Klik "Cari Weton Cocok" untuk memulai.';

  return (
    <div className="hidden overflow-x-auto rounded-md border md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Weton</TableHead>
            <TableHead>Total Neptu</TableHead>
            <TableHead>Hasil</TableHead>
            <TableHead>Skor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={`${item.date}-${item.weton}`}>
                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="whitespace-nowrap">{item.weton}</TableCell>
                <TableCell className="whitespace-nowrap">{item.totalNeptu}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <button
                    type="button"
                    className="underline decoration-dotted underline-offset-4 hover:text-primary"
                    onClick={() => onViewDetail(item.result)}
                  >
                    {item.result}
                  </button>
                </TableCell>
                <TableCell className="whitespace-nowrap">{item.score}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
