import React from "react";
import "./FilterDropdown.css";

const FilterDropdown = ({ value, onChange, options }) => (
  <div className="filter-dropdown p-2">
    <select
      className="border-2 border-indigo-300 rounded-xl p-3 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
      value={value}
      onChange={onChange}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
