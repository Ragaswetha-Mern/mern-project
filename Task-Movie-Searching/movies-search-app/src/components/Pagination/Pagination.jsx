import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination flex justify-center items-center gap-3 p-8 bg-black">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-5 py-2 rounded-xl font-bold shadow-md border-2 border-gray-800 transition-all duration-200 text-lg ${
            page === currentPage
              ? "bg-red-600 text-white scale-105"
              : "bg-gray-900 text-white hover:bg-red-700"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
