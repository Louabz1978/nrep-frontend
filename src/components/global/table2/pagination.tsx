import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/global/ui/pagination";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "../ui/button";

export interface DynamicPaginationProps {
  totalPageCount: number | undefined;
  prefix: string;
}

export function DynamicPagination({
  totalPageCount,
  prefix = "",
}: DynamicPaginationProps) {
  const [page, setPage] = useQueryState(
    `${prefix}_page`,
    parseAsInteger.withDefault(1)
  );
  const [currentTotal, setCurrentTotal] = useState<number>(totalPageCount ?? 0);
  useEffect(() => {
    if (totalPageCount || totalPageCount === 0) setCurrentTotal(totalPageCount);
  }, [totalPageCount]);

  const renderPageNumbers = () => {
    const items: ReactNode[] = [];
    const maxVisiblePages = 5;

    if (currentTotal <= maxVisiblePages) {
      for (let i = 1; i <= currentTotal; i++) {
        items.push(
          <PaginationItem key={i}>
            <Button
              size={"icon"}
              onClick={() => {
                setPage(i).catch(console.error);
              }}
              variant={page === i ? "default" : "link"}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <Button
            onClick={() => {
              setPage(1).catch(console.error);
            }}
            variant={page === 1 ? "default" : "link"}
          >
            1
          </Button>
        </PaginationItem>
      );

      if (page > 3) {
        items.push(
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(currentTotal - 1, page + 1);

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <Button
              size={"icon"}
              onClick={() => {
                setPage(i).catch(console.error);
              }}
              variant={page === i ? "default" : "link"}
            >
              {i}
            </Button>
          </PaginationItem>
        );
      }

      if (page < currentTotal - 2) {
        items.push(
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      items.push(
        <PaginationItem key={currentTotal}>
          <Button
            onClick={() => {
              setPage(currentTotal).catch(console.error);
            }}
            variant={page === currentTotal ? "default" : "link"}
          >
            {currentTotal}
          </Button>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 w-full">
      <Pagination>
        <PaginationContent className="max-sm:gap-0">
          <PaginationItem>
            <Button
              onClick={() => {
                setPage(Math.max(page - 1, 1)).catch(console.error);
              }}
              tabIndex={page === 1 ? -1 : undefined}
              variant={"outline"}
              disabled={page === 1}
            >
              {"السابق"}
            </Button>
          </PaginationItem>
          {renderPageNumbers()}

          <PaginationItem>
            <Button
              onClick={() => {
                setPage(Math.min(page + 1, currentTotal)).catch(console.error);
              }}
              tabIndex={page === currentTotal ? -1 : undefined}
              variant={"outline"}
              disabled={page === currentTotal}
            >
              {"التالي"}
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
