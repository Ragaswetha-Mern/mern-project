import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="search-bar w-full flex items-center justify-center p-4">
    <input
      type="text"
      className="border rounded p-2 w-2/3"
      placeholder="Search movies..."
      value={value}
      onChange={onChange}
    />
    <button
      className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      onClick={onSearch}
    >
      Search
    </button>
  </div>
);

export default SearchBar;
