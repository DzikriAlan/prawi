// 2. Import Types
import type { MatchWeton, SingleWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
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
  matchWeton: MatchWeton;
  singleWeton: SingleWeton;
}

export default function WetonResult({ matchWeton, singleWeton }: Props) {
  // 10. Computed / Derived
  const hasMatchResult = matchWeton.status === "success" && matchWeton.data;
  const hasSingleResult = singleWeton.status === "success" && singleWeton.data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hasil</CardTitle>
        <CardDescription>
          Hasil perhitungan weton dan pencarian weton cocok.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Weton</h3>

          {hasSingleResult ? (
            <p className="text-sm text-muted-foreground">
              {singleWeton.data?.weton}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {singleWeton.status === "loading"
                ? "Menghitung..."
                : "Belum ada hasil."}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-semibold">Weton Cocok</h3>

          {hasMatchResult ? (
            <div className="overflow-x-auto">
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
                  {matchWeton.data?.map((item) => (
                    <TableRow key={`${item.date}-${item.weton}`}>
                      <TableCell className="whitespace-nowrap">
                        {item.date}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.weton}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.result}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        {item.score}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {matchWeton.status === "loading"
                ? "Menghitung..."
                : "Belum ada hasil."}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
