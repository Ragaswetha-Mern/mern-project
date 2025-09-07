# Smart Expense Tracker

A modern React + Vite app to track expenses, visualize spending, and encourage smart savings.

## Tech Stack

- React: UI library for building interactive interfaces
- Vite: Fast development/build tool
- TailwindCSS: Utility-first CSS for rapid styling
- Chart.js + react-chartjs-2: Data visualization

## How to Run & Initialize

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173]

## Main Components & React Features

### App.jsx

- **Purpose**: Root component, manages global state, layout, and passes props to children.
- **Tech used**: `useState` for state management, prop drilling for communication, conditional rendering.

### AddExpense.jsx

- **Purpose**: Form to add expenses, filter options, and animated car savings bar.
- **Tech used**: `useState` for local form and animation state, `useEffect` for animation and resets, controlled components, props for state updates.

### ExpenseEntry.jsx

- **Purpose**: Displays recent expenses, allows deletion.
- **Tech used**: `props` for data and delete handler, conditional rendering, mapping over arrays.

### CategorySummary.jsx

- **Purpose**: Shows total spending per category.
- **Tech used**: `props` for data, array methods (`map`, `filter`, `reduce`) for calculations.

### ExpenseChart.jsx

- **Purpose**: Pie chart of expenses by category.
- **Tech used**: `props` for data, Chart.js integration, array methods for chart data.

## Project Purpose

Track your expenses, visualize your spending, and motivate better savings habits with interactive UI and fun animations.
