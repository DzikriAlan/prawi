// 1. Import External Library
import { useState } from "react";

// 2. Import Types
import type { PayloadSingleWeton } from "../types/wetonTypes";

// Import Shadcn/UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// 7. Props
interface Props {
  loading: boolean;
  onCalculateWeton: (payload: PayloadSingleWeton) => void;
}

export default function WetonSingleForm({ loading, onCalculateWeton }: Props) {
  // 8. State
  const [date, setDate] = useState("");

  // 11. Methods / Handlers
  function isValidDate(value: string): boolean {
    const match = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value);

    if (!match) return false;

    const day = Number(match[1]);
    const month = Number(match[2]);

    return day >= 1 && day <= 31 && month >= 1 && month <= 12;
  }

  // 10. Computed / Derived
  const isSubmitDisabled = !isValidDate(date) || loading;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onCalculateWeton({ date });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="singleDate">Tanggal</Label>
        <Input
          id="singleDate"
          type="text"
          inputMode="numeric"
          placeholder="dd/mm/yyyy"
          maxLength={10}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <p className="text-xs text-muted-foreground">Contoh: 29/07/2005 atau 29/7/2005</p>
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className="w-full"
      >
        {loading ? "Menghitung..." : "Cek Weton"}
      </Button>
    </form>
  );
}
