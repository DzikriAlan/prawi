// 1. Import External Library
import { ChevronDown, ChevronUp } from "lucide-react";

// 7. Props
interface Props {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function StatusSectionToggle({ label, isOpen, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors hover:bg-accent/50"
    >
      <span className="text-sm font-medium text-muted-foreground">{label}</span>

      {isOpen ? (
        <ChevronUp className="h-4 w-4 text-muted-foreground" />
      ) : (
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      )}
    </button>
  );
}
