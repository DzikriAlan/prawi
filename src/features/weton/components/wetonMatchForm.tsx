// 1. Import External Library
import { useState } from "react";

// 2. Import Types
import type { PayloadMatchWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 7. Props
interface Props {
  loading: boolean;
  onCalculateMatch: (payload: PayloadMatchWeton) => void;
}

export default function WetonMatchForm({ loading, onCalculateMatch }: Props) {
  // 8. State
  const [targetDate, setTargetDate] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  // 11. Methods / Handlers
  function isValidDate(value: string): boolean {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);

    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);

    return day >= 1 && day <= 31 && month >= 1 && month <= 12;
  }

  // 10. Computed / Derived
  const isSubmitDisabled =
    !isValidDate(targetDate) || !startYear || !endYear || loading;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCalculateMatch({
      targetDate,
      startYear: Number(startYear),
      endYear: Number(endYear),
    });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="targetDate">Tanggal Lahir</Label>
        <Input
          id="targetDate"
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/yyyy"
          maxLength={10}
          value={targetDate}
          onChange={(event) => setTargetDate(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">Contoh: 07/11/2004 atau 7/11/2004</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="startYear">Tahun Awal</Label>
          <Input
            id="startYear"
            type="number"
            inputMode="numeric"
            placeholder="2024"
            value={startYear}
            onChange={(event) => setStartYear(event.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="endYear">Tahun Akhir</Label>
          <Input
            id="endYear"
            type="number"
            inputMode="numeric"
            placeholder="2026"
            value={endYear}
            onChange={(event) => setEndYear(event.target.value)}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full"
      >
        {loading ? "Menghitung..." : "Cari Weton Cocok"}
      </Button>
    </form>
  );
}
