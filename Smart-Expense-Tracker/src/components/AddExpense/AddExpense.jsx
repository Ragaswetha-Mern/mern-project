import React from "react";
import "./AddExpense.css";

function AddExpense({
  form,
  handleChange,
  handleAddExpense,
  showForm,
  setShowForm,
  CATEGORIES,
  sortType,
  setSortType,
  filterCategory,
  setFilterCategory,
  filterDate,
  setFilterDate,
  filterMin,
  setFilterMin,
  filterMax,
  setFilterMax,
  carDistance,
  setCarDistance,
}) {
  const CATEGORY_ICONS = {
    Food: "🍔",
    Travel: "✈️",
    Bills: "💡",
    Others: "🛒",
  };

  return (
    <div>
      <div className="bg-glass p-10 mb-8 relative">
        <div className="flex flex-col gap-4 sm:flex-col md:flex-row md:justify-between md:items-center mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-bold text-purple-700 flex items-center gap-3">
              <span role="img" aria-label="add">
                ➕
              </span>
              <span>Add Expense</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label
                htmlFor="sortType"
                className="text-purple-700 font-semibold"
              >
                Sort By:
              </label>
              <select
                id="sortType"
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}
                className="rounded-lg border-2 border-purple-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-purple-50 text-purple-700 font-semibold shadow"
              >
                <option value="recent">Most Recent</option>
                <option value="amount">Highest Amount</option>
                <option value="lowest">Lowest Amount</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
            <button
              onClick={() => setShowForm((v) => !v)}
              className="p-3 rounded-full bg-purple-200 text-purple-700 shadow-lg hover:bg-purple-300 transition flex items-center justify-center"
              aria-label={showForm ? "Collapse" : "Expand"}
            >
              {showForm ? (
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
        </div>

        <div className="bg-glass rounded-2xl p-8 mb-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-2xl text-purple-500 drop-shadow">🔎</span>
            <span className="text-2xl font-extrabold text-purple-700 tracking-tight font-sans">
              Filter Expenses
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl p-5 shadow border border-purple-200 hover:shadow-lg transition-all duration-200">
              <label
                htmlFor="filterCategory"
                className="label-icon text-sm text-purple-600 font-semibold mb-2 flex items-center gap-2 tracking-wide"
              >
                <span className="label-icon">📂</span> Category
              </label>
              <select
                id="filterCategory"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="rounded-xl border-2 border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-purple-700 font-semibold shadow hover:border-purple-500 transition-all duration-200"
              >
                <option value="">All</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_ICONS[cat] ? CATEGORY_ICONS[cat] + " " : ""}
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl p-5 shadow border border-purple-200 hover:shadow-lg transition-all duration-200">
              <label
                htmlFor="filterDate"
                className="text-sm text-purple-600 font-semibold mb-2 flex items-center gap-2 tracking-wide"
              >
                <span className="text-lg">📅</span> Date
              </label>
              <input
                id="filterDate"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="rounded-xl border-2 border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-purple-700 font-semibold shadow hover:border-purple-500 transition-all duration-200"
              />
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl p-5 shadow border border-purple-200 hover:shadow-lg transition-all duration-200">
              <label
                htmlFor="filterMin"
                className="text-sm text-purple-600 font-semibold mb-2 flex items-center gap-2 tracking-wide"
              >
                <span className="text-lg">💸</span> Min Amount
              </label>
              <input
                id="filterMin"
                type="number"
                value={filterMin}
                onChange={(e) => setFilterMin(e.target.value)}
                className="rounded-xl border-2 border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-purple-700 font-semibold shadow hover:border-purple-500 transition-all duration-200"
                min="0"
                step="0.01"
              />
            </div>
            <div className="flex flex-col gap-2 bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-xl p-5 shadow border border-purple-200 hover:shadow-lg transition-all duration-200">
              <label
                htmlFor="filterMax"
                className="text-sm text-purple-600 font-semibold mb-2 flex items-center gap-2 tracking-wide"
              >
                <span className="text-lg">💰</span> Max Amount
              </label>
              <input
                id="filterMax"
                type="number"
                value={filterMax}
                onChange={(e) => setFilterMax(e.target.value)}
                className="rounded-xl border-2 border-purple-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white text-purple-700 font-semibold shadow hover:border-purple-500 transition-all duration-200"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </div>

        {showForm && (
          <form
            className="space-y-8"
            onSubmit={(e) => {
              handleAddExpense(e);
              setCarDistance((prev) => Math.max(prev - 10, 0));
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">💵</span>
              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border-2 border-purple-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-purple-400 font-semibold text-purple-700 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📂</span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="border-2 border-purple-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-purple-400 font-semibold text-purple-700 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50"
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_ICONS[cat] ? CATEGORY_ICONS[cat] + " " : ""}
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📅</span>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="border-2 border-purple-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-purple-400 font-semibold text-purple-700 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50"
                required
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                placeholder="Note (optional)"
                className="border-2 border-purple-300 p-4 rounded-xl w-full focus:ring-2 focus:ring-purple-400 font-semibold text-purple-700 bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50"
              />
            </div>

            <div className="flex justify-between items-center mt-6 gap-6">
              <div
                className="car-animation-container flex flex-col items-center w-1/2 relative"
                style={{ height: "80px" }}
              >
                <span className="car-caption font-bold text-purple-700 mb-2 text-lg">
                  Expense Car
                </span>
                <div className="car-road w-full h-8 bg-gray-200 rounded-full relative">
                  <img
                    src="/car.png"
                    alt="Car"
                    className="car-img absolute"
                    style={{
                      left: `${carDistance}%`,
                      transition: "left 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                      top: "-24px",
                      width: "64px",
                    }}
                  />
                </div>
                <span className="car-label">Distance: {carDistance}%</span>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-400 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:scale-105 transition-transform duration-200 text-base flex items-center gap-1"
              >
                <span className="text-xl">💰</span> Burn Fuel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddExpense;
