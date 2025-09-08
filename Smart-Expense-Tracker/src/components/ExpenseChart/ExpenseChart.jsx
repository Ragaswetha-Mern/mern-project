import "./ExpenseChart.css";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses, categories }) => {
  const colors = ["#a78bfa", "#60a5fa", "#fbbf24", "#f472b6"];
  const data = {
    labels: categories,
    datasets: [
      {
        data: categories.map((cat) =>
          expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + e.amount, 0)
        ),
        backgroundColor: colors,
        borderWidth: 2,
      },
    ],
  };

  const legendItems = categories.map((cat, idx) => {
    const total = expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0);
    return (
      <div key={cat} className="flex items-center gap-2 mb-2">
        <span
          className="inline-block w-4 h-4 rounded-full border-2"
          style={{ backgroundColor: colors[idx], borderColor: colors[idx] }}
        ></span>
        <span className="font-semibold text-gray-700">{cat}</span>
        <span className="text-blue-700 font-bold ml-auto">
          ₹{total.toFixed(2)}
        </span>
      </div>
    );
  });

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 flex flex-col md:flex-row items-center gap-8">
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h2 className="text-2xl font-extrabold mb-6 text-purple-700 flex items-center gap-2">
          <svg
            className="w-7 h-7 text-purple-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="#a78bfa"
            />
            <path
              d="M12 6v6l4 2"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Expense Distribution
        </h2>
        <div className="space-y-2 mt-2">{legendItems}</div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center">
        <div className="w-64 h-64">
          <Pie
            data={data}
            options={{
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ExpenseChart;
