import React from "react";
import "./ExpenseEntry.css";

function ExpenseEntry({
  filtered,
  handleDelete,
  showExpenses,
  setShowExpenses,
}) {
  return (
    <div className="expense-entry-card flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
          <span role="img" aria-label="list">
            🧾
          </span>
          <span>Recent Expenses</span>
        </h2>
        <button
          onClick={() => setShowExpenses((v) => !v)}
          className="p-3 rounded-full bg-purple-200 text-purple-700 shadow-lg hover:bg-purple-300 transition flex items-center justify-center"
          aria-label={showExpenses ? "Collapse" : "Expand"}
        >
          {showExpenses ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="border-t border-purple-200 mb-8"></div>
      {showExpenses && filtered.length === 0 ? (
        <p className="text-gray-400 text-center text-lg">No expenses found.</p>
      ) : (
        <ul className="flex flex-col items-start w-full">
          {filtered.map((exp) => {
            const icons = {
              Food: "🍔",
              Travel: "✈️",
              Bills: "💡",
              Others: "🛒",
            };
            return (
              <li key={exp.id} className="w-full flex items-center mb-8">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-5 w-full">
                    <span className="text-3xl bg-purple-200 rounded-full p-3 border-2 border-purple-300 shadow">
                      {icons[exp.category] || "🛒"}
                    </span>
                    <div className="flex-1 bg-gradient-to-r from-white via-purple-50 to-white shadow-xl rounded-2xl px-8 py-6 border-2 border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-bold text-blue-700 text-2xl">
                          ₹{exp.amount.toFixed(2)}
                        </span>
                        <span className="bg-purple-200 text-purple-700 px-3 py-1 rounded text-sm font-semibold ml-2">
                          {exp.category}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 text-base">
                          {exp.date}
                        </span>
                        {exp.note && (
                          <span className="text-gray-500 italic text-sm">
                            ({exp.note})
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="ml-3 p-3 rounded-full bg-red-200 text-red-700 hover:bg-red-300 transition shadow-lg"
                      aria-label="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ExpenseEntry;
