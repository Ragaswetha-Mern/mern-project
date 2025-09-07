import React from "react";
import "./CategorySummary.css";

const CategorySummary = ({ expenses, categories }) => {
  const categoryTotals = categories.map((cat) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return { category: cat, total };
  });

  return (
    <div className="category-summary-card flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        Category-wise Spending
      </h2>
      <ul className="space-y-2">
        {categoryTotals.map(({ category, total }) => (
          <li key={category} className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">{category}</span>
            <span className="text-blue-700 font-bold">₹{total.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySummary;
