// 1. Import External Library
import { useState } from "react";

// 2. Import Types
import type { PayloadSingleWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

// 7. Props
interface Props {
  loading: boolean;
  onCalculateWeton: (payload: PayloadSingleWeton) => void;
}

export default function WetonSingleForm({ loading, onCalculateWeton }: Props) {
  // 8. State
  const [date, setDate] = useState("");

  // 10. Computed / Derived
  const isSubmitDisabled = !date || loading;

  // 11. Methods / Handlers
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCalculateWeton({ date });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cek Weton</CardTitle>
        <CardDescription>
          Masukkan tanggal untuk mengetahui weton-nya.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="singleDate">Tanggal</Label>
            <Input
              id="singleDate"
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full"
          >
            {loading ? "Menghitung..." : "Cek Weton"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
