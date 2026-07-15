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
}

export default function WetonResultTable({ data }: Props) {
  // 10. Computed / Derived
  const isEmpty = data.length === 0;

  return (
    <div className="hidden overflow-x-auto rounded-md border md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tanggal</TableHead>
            <TableHead>Weton</TableHead>
            <TableHead>Hasil</TableHead>
            <TableHead>Skor</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isEmpty ? (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                Belum ada hasil. Klik &quot;Cari Weton Cocok&quot; untuk memulai.
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={`${item.date}-${item.weton}`}>
                <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                <TableCell className="whitespace-nowrap">{item.weton}</TableCell>
                <TableCell className="whitespace-nowrap">{item.result}</TableCell>
                <TableCell className="whitespace-nowrap">{item.score}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
