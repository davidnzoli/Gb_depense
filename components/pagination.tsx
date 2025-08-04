import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  let pageNumbers: (number | string)[] = [];

  if (totalPages <= 5) {
    pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);
  } else {
    pageNumbers = [
      1,
      2,
      3,
      4,
      5,
      "...",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ].filter((page) => typeof page === "number" && page <= totalPages);
  }

  return (
    <div className="flex w-[100%] h-11 justify-end items-end mt-4 gap-3">
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="cursor-pointer"
      >
        Précédent
      </Button>

      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="cursor-pointer"
      >
        Suivant
      </Button>
    </div>
  );
};

export default Pagination;