// Import Shadcn/UI Components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const PRIMBON_MEANING: Record<string, string> = {
  Pegat:
    "Dipercaya memiliki banyak ujian dalam rumah tangga, seperti perselisihan, masalah ekonomi, atau perbedaan prinsip yang dapat berujung pada perpisahan.",
  Ratu:
    "Dipercaya sebagai pasangan yang sangat serasi, dihormati oleh keluarga maupun lingkungan, serta memiliki hubungan yang harmonis.",
  Jodoh:
    "Dipercaya memang berjodoh. Hubungan cenderung langgeng karena kedua pasangan dapat saling memahami dan menerima kekurangan masing-masing.",
  Topo:
    "Dipercaya akan menghadapi banyak kesulitan pada awal pernikahan, seperti ekonomi atau pekerjaan. Namun, jika mampu melewati masa sulit tersebut, kehidupan rumah tangga dipercaya akan menjadi lebih baik.",
  Tinari:
    "Dipercaya membawa keberuntungan. Pasangan dinilai mudah memperoleh rezeki, kebahagiaan, dan kehidupan yang cukup harmonis.",
  Padu:
    "Dipercaya sering mengalami perbedaan pendapat atau pertengkaran kecil. Meski demikian, pertengkaran tersebut umumnya tidak sampai menyebabkan perceraian.",
  Sujanan:
    "Dipercaya memiliki potensi munculnya godaan dari pihak ketiga atau masalah yang berkaitan dengan kesetiaan, sehingga diperlukan komitmen dan kepercayaan yang kuat.",
  Pesthi:
    "Dipercaya memiliki kehidupan rumah tangga yang tenang, tenteram, dan harmonis dengan konflik yang relatif sedikit.",
};

// 7. Props
interface Props {
  open: boolean;
  result: string | null;
  onOpenChange: (open: boolean) => void;
}

export default function WetonResultDetailModal({ open, result, onOpenChange }: Props) {
  // 10. Computed / Derived
  const meaning = result ? PRIMBON_MEANING[result] ?? "" : "";

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{result}</DialogTitle>
          <DialogDescription>Arti hasil primbon weton.</DialogDescription>
        </DialogHeader>

        <p className="text-sm leading-relaxed text-foreground">{meaning}</p>
      </DialogContent>
    </Dialog>
  );
}
