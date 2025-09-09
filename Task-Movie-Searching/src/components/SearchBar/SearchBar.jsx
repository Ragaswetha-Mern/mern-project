import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onChange, onSearch }) => (
  <div className="search-bar w-full flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-white rounded-2xl shadow-lg mb-6">
    <input
      type="text"
      className="border-2 border-indigo-300 rounded-xl p-3 w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
      placeholder="Search movies..."
      value={value}
      onChange={onChange}
    />
    <button
      className="px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:scale-105 hover:from-indigo-600 hover:to-pink-600 transition-all duration-200"
      onClick={onSearch}
    >
      Search
    </button>
  </div>
);

export default SearchBar;
