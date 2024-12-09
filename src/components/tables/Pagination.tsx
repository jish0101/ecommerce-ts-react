import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const TablePagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / pageSize);
  const maxPageButtons = 4;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  const renderPageLinks = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    // Adjust startPage if endPage exceeds totalPages
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    // Add ellipsis for pages before startPage
    if (startPage > 1) {
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            className="cursor-pointer"
            onClick={() => handlePageClick(1)}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        pages.push(
          <PaginationItem key="start-ellipsis">
            <PaginationLink className="cursor-pointer">...</PaginationLink>
          </PaginationItem>
        );
      }
    }

    // Add visible page links
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            className="cursor-pointer"
            isActive={i === currentPage}
            onClick={() => handlePageClick(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    // Add ellipsis for pages after endPage
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <PaginationItem key="end-ellipsis">
            <PaginationLink className="cursor-pointer">...</PaginationLink>
          </PaginationItem>
        );
      }
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <Pagination className="mx-1 w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={handlePrevious}
          />
        </PaginationItem>
        {renderPageLinks()}
        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={handleNext} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePagination;