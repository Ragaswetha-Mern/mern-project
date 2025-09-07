import { useState } from "react";
import AddExpense from "./components/AddExpense/AddExpense";
import CategorySummary from "./components/CategorySummary/CategorySummary";
import ExpenseChart from "./components/ExpenseChart/ExpenseChart";
import ExpenseEntry from "./components/ExpenseEntry/ExpenseEntry";
import "./App.css";

const CATEGORIES = ["Food", "Travel", "Bills", "Others"];

function App() {
  const [expenses, setExpenses] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [filterMin, setFilterMin] = useState("");
  const [filterMax, setFilterMax] = useState("");
  const [sortType, setSortType] = useState("recent");
  const [showForm, setShowForm] = useState(true);
  const [showExpenses, setShowExpenses] = useState(true);
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    note: "",
  });
  const [carDistance, setCarDistance] = useState(100);
  const EXPENSES_KEY = "expenses_data";

  const handleDelete = (id) => {
    setExpenses((prev) => {
      if (prev.length > 1) {
        setCarDistance((d) => Math.min(d + 10, 100));
      } else {
        setCarDistance(100);
      }
      return prev.filter((e) => e.id !== id);
    });
  };

  let filtered = expenses.filter((e) => {
    if (filterCategory && e.category !== filterCategory) return false;
    if (filterDate && e.date !== filterDate) return false;
    if (filterMin && e.amount < parseFloat(filterMin)) return false;
    if (filterMax && e.amount > parseFloat(filterMax)) return false;
    return true;
  });
  if (sortType === "recent") filtered = filtered.sort((a, b) => b.id - a.id);
  if (sortType === "amount")
    filtered = filtered.sort((a, b) => b.amount - a.amount);
  if (sortType === "lowest")
    filtered = filtered.sort((a, b) => a.amount - b.amount);
  if (sortType === "oldest") filtered = filtered.sort((a, b) => a.id - b.id);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!form.amount || !form.category || !form.date) return;
    const newExpense = {
      ...form,
      amount: parseFloat(form.amount),
      id: Date.now(),
    };
    setExpenses([newExpense, ...expenses]);
    setCarDistance((d) => Math.max(d - 10, 0));
    setForm({ amount: "", category: "", date: "", note: "" });
    setFilterCategory("");
    setFilterDate("");
    setFilterMin("");
    setFilterMax("");
  };
  return (
    <div className="app-bg app-font min-h-screen py-10 flex flex-col items-center">
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6">
        <div className="w-full mb-6">
          <marquee
            behavior="scroll"
            direction="left"
            className="text-lg font-bold text-purple-700 bg-blue-50 py-2 rounded-xl shadow"
          >
            🚗💸 Smart savings fuel your dreams! 🌱✨ Spend wisely, drive your
            future forward. 🚀💡
          </marquee>
        </div>
        <h1
          className="text-5xl md:text-6xl font-black text-center mb-12 text-purple-700 drop-shadow-xl flex items-center justify-center gap-4 animate-fade-in tracking-tight"
          style={{ fontFamily: "Poppins, Roboto, Arial, sans-serif" }}
        >
          <span role="img" aria-label="money" className="text-5xl md:text-6xl">
            💸
          </span>
          <span className="ml-2">Smart Expense Tracker</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <CategorySummary expenses={expenses} categories={CATEGORIES} />
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <ExpenseChart expenses={expenses} categories={CATEGORIES} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <AddExpense
              form={form}
              handleChange={handleChange}
              handleAddExpense={handleAddExpense}
              showForm={showForm}
              setShowForm={setShowForm}
              CATEGORIES={CATEGORIES}
              sortType={sortType}
              setSortType={setSortType}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterDate={filterDate}
              setFilterDate={setFilterDate}
              filterMin={filterMin}
              setFilterMin={setFilterMin}
              filterMax={filterMax}
              setFilterMax={setFilterMax}
              carDistance={carDistance}
              setCarDistance={setCarDistance}
            />
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col">
            <ExpenseEntry
              filtered={filtered}
              handleDelete={handleDelete}
              showExpenses={showExpenses}
              setShowExpenses={setShowExpenses}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
