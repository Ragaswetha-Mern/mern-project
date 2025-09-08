import React from "react";

const FilterDropdown = ({ value, onChange, options }) => (
  <div className="filter-dropdown p-2">
    <select className="border rounded p-2" value={value} onChange={onChange}>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FilterDropdown;
