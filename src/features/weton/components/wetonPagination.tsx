// Import Shadcn/UI Components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// 7. Props
interface Props {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
}

export default function WetonPagination({ page, totalPages, onChangePage }: Props) {
  // 10. Computed / Derived
  const isPreviousDisabled = page <= 1;
  const isNextDisabled = page >= totalPages;

  // 11. Methods / Handlers
  const handleClickPrevious = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!isPreviousDisabled) onChangePage(page - 1);
  };

  const handleClickNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    if (!isNextDisabled) onChangePage(page + 1);
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            aria-disabled={isPreviousDisabled}
            className={isPreviousDisabled ? "pointer-events-none opacity-50" : undefined}
            onClick={handleClickPrevious}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            href="#"
            isActive
            className="pointer-events-none w-auto px-4"
          >
            Halaman {page} dari {totalPages}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            href="#"
            aria-disabled={isNextDisabled}
            className={isNextDisabled ? "pointer-events-none opacity-50" : undefined}
            onClick={handleClickNext}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
