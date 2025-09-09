import React from "react";
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";
import "./Pagination.css";

const MAX_VISIBLE_PAGES = 10;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
  let endPage = startPage + MAX_VISIBLE_PAGES - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="pagination flex flex-wrap justify-center items-center gap-2 md:gap-3 p-4 md:p-8 bg-black overflow-x-auto scrollbar-thin scrollbar-thumb-[#00a8e1] scrollbar-track-black">
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1] flex items-center"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        title="First"
      >
        <FaAngleDoubleLeft />
      </button>
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1] flex items-center"
        onClick={() =>
          onPageChange(Math.max(1, currentPage - MAX_VISIBLE_PAGES))
        }
        disabled={currentPage === 1}
        title="Previous set"
      >
        <FaAngleLeft />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`px-4 md:px-5 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 transition-all duration-200 text-base md:text-lg ${
            page === currentPage
              ? "bg-[#00a8e1] text-white scale-105"
              : "bg-gray-900 text-white hover:bg-[#00a8e1]"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1] flex items-center"
        onClick={() =>
          onPageChange(Math.min(totalPages, currentPage + MAX_VISIBLE_PAGES))
        }
        disabled={currentPage === totalPages}
        title="Next set"
      >
        <FaAngleRight />
      </button>
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1] flex items-center"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        title="Last"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;
