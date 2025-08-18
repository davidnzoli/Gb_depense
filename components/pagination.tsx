// import React from "react";
// import { Button } from "@/components/ui/button";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (pageNumber: number) => void;
// }

// const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
//   let pageNumbers: (number | string)[] = [];

//   if (totalPages <= 5) {
//     pageNumbers = [...Array(totalPages)].map((_, index) => index + 1);
//   } else {
//     pageNumbers = [
//       1,
//       2,
//       3,
//       4,
//       5,
//       "...",
//       totalPages - 4,
//       totalPages - 3,
//       totalPages - 2,
//       totalPages - 1,
//       totalPages,
//     ].filter((page) => typeof page === "number" && page <= totalPages);
//   }

//   return (
//     <div className="flex w-[100%] h-11 justify-end items-end mt-4 gap-3">
//       <Button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className="cursor-pointer"
//       >
//         Précédent
//       </Button>

//       <Button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className="cursor-pointer"
//       >
//         Suivant
//       </Button>
//     </div>
//   );
// };

// export default Pagination;

"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null; // pas besoin de pagination

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-4 flex justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage - 1);
            }}
          />
        </PaginationItem>

        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={currentPage === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(currentPage + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
