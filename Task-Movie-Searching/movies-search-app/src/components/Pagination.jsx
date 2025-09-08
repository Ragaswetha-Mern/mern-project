import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <div className="pagination flex justify-center items-center gap-2 p-4">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } hover:bg-blue-400 transition`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
