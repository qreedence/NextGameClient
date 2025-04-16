import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
  className,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  // Ensure baseUrl doesn't end with a slash if we're appending page numbers
  const normalizedBaseUrl = baseUrl.endsWith("/")
    ? baseUrl.slice(0, -1)
    : baseUrl;

  // Create URLs for each pagination action
  const firstPageUrl = `/${normalizedBaseUrl}?page=1`;
  const prevPageUrl = `/${normalizedBaseUrl}?page=${currentPage - 1}`;
  const nextPageUrl = `/${normalizedBaseUrl}?page=${currentPage + 1}`;
  const lastPageUrl = `/${normalizedBaseUrl}?page=${totalPages}`;

  // Generate page numbers to display (current page in the middle with 2 on each side when possible)
  const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pageNumbers.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav
      className={cn("flex items-center justify-center space-x-1", className)}
      aria-label="Pagination"
    >
      <Link
        to={firstPageUrl}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm border",
          isFirstPage
            ? "pointer-events-none opacity-50 border-input bg-background"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Go to first page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : 0}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Link>
      <Link
        to={prevPageUrl}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm border",
          isFirstPage
            ? "pointer-events-none opacity-50 border-input bg-background"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Go to previous page"
        aria-disabled={isFirstPage}
        tabIndex={isFirstPage ? -1 : 0}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      {pageNumbers.map((pageNumber) => (
        <Link
          key={pageNumber}
          to={`/${normalizedBaseUrl}?page=${pageNumber}`}
          className={cn(
            "inline-flex h-9 min-w-9 items-center justify-center rounded-md text-sm border px-3",
            pageNumber === currentPage
              ? "border-primary bg-primary text-primary-foreground font-medium"
              : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
          )}
          aria-label={`Go to page ${pageNumber}`}
          aria-current={pageNumber === currentPage ? "page" : undefined}
        >
          {pageNumber}
        </Link>
      ))}

      <Link
        to={nextPageUrl}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm border",
          isLastPage
            ? "pointer-events-none opacity-50 border-input bg-background"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Go to next page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : 0}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
      <Link
        to={lastPageUrl}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm border",
          isLastPage
            ? "pointer-events-none opacity-50 border-input bg-background"
            : "border-input bg-background hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Go to last page"
        aria-disabled={isLastPage}
        tabIndex={isLastPage ? -1 : 0}
      >
        <ChevronsRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
