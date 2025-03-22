import React from "react";
import DashboardCharts from "./DashboardCharts"; // Import Charts
import "../App.css";

const Dashboard = ({ transactions, addTransaction }) => {
  // Calculate Summary
  const totalIncome = transactions
    .filter((txn) => txn.type === "Income")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const totalExpenses = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((acc, txn) => acc + Math.abs(txn.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  // Top Spending Category Calculation
  const categoryTotals = {};
  transactions.forEach((txn) => {
    if (txn.type === "Expense") {
      categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    }
  });

  const topCategory = Object.keys(categoryTotals).reduce(
    (max, category) =>
      categoryTotals[category] > (categoryTotals[max] || 0) ? category : max,
    "None"
  );

  return (
    <div className="dashboard-container">
      <h2>📊 Dashboard Overview</h2>

      {/* SUMMARY CARDS */}
      <div className="summary-cards">
        <div className="card income">
          <p>Total Income</p>
          <h3>₹{totalIncome}</h3>
        </div>
        <div className="card expense">
          <p>Total Expenses</p>
          <h3>₹{totalExpenses}</h3>
        </div>
        <div className="card balance">
          <p>Net Balance</p>
          <h3>₹{netBalance}</h3>
        </div>
        <div className="card top-category">
          <p>Top Spending Category</p>
          <h3>{topCategory}</h3>
        </div>
      </div>

      {/* CHARTS COMPONENT */}
      <DashboardCharts transactions={transactions} />

      {/* ADD TRANSACTION BUTTON FOR TESTING */}
      <button
        className="add-btn"
        onClick={() =>
          addTransaction({
            date: new Date().toISOString().split("T")[0],
            description: "Freelance Job",
            amount: 5000,
            type: "Income",
            category: "Salary",
          })
        }
      >
        ➕ Add Sample Income
      </button>
    </div>
  );
};

export default Dashboard;
