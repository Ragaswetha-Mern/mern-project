import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination flex flex-wrap justify-center items-center gap-2 md:gap-3 p-4 md:p-8 bg-black overflow-x-auto scrollbar-thin scrollbar-thumb-[#00a8e1] scrollbar-track-black">
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1]"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &#171;
      </button>
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1]"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &#60;
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
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1]"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &#62;
      </button>
      <button
        className="px-3 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 bg-gray-900 text-white hover:bg-[#00a8e1]"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &#187;
      </button>
    </div>
  );
};

export default Pagination;
