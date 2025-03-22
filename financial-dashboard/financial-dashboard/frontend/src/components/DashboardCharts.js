import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const DashboardCharts = ({ transactions }) => {
  if (transactions.length === 0) {
    return <p>No transactions recorded yet.</p>;
  }

  // Expenses by Category (Bar Chart)
  const categoryTotals = {};
  const revenueCategoryTotals = {}; // Store income totals by category

  transactions.forEach((txn) => {
    if (txn.type === "Expense") {
      categoryTotals[txn.category] = (categoryTotals[txn.category] || 0) + Math.abs(txn.amount);
    } else if (txn.type === "Income") {
      revenueCategoryTotals[txn.category] = (revenueCategoryTotals[txn.category] || 0) + txn.amount;
    }
  });

  const expensesBarChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: "Expenses by Category",
        data: Object.values(categoryTotals),
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff", "#ff9f40"],
      },
    ],
  };

  // Revenue (Income) by Category (Bar Chart)
  const revenueBarChartData = {
    labels: Object.keys(revenueCategoryTotals),
    datasets: [
      {
        label: "Revenue by Category",
        data: Object.values(revenueCategoryTotals),
        backgroundColor: ["#36a2eb", "#4caf50", "#f39c12", "#8e44ad", "#2ecc71", "#3498db"],
      },
    ],
  };

  // Income vs Expenses Over Time (Line Chart)
  const dateWiseData = {};
  transactions.forEach((txn) => {
    if (!dateWiseData[txn.date]) {
      dateWiseData[txn.date] = { income: 0, expense: 0 };
    }
    if (txn.type === "Income") {
      dateWiseData[txn.date].income += txn.amount;
    } else {
      dateWiseData[txn.date].expense += Math.abs(txn.amount);
    }
  });

  const sortedDates = Object.keys(dateWiseData).sort();
  const lineChartData = {
    labels: sortedDates,
    datasets: [
      {
        label: "Income",
        data: sortedDates.map((date) => dateWiseData[date].income),
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "Expenses",
        data: sortedDates.map((date) => dateWiseData[date].expense),
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="charts-container">
      <h3>📊 Financial Insights</h3>

      {/* Charts in a Single Row */}
      <div className="charts-row">
        {/* Expenses Bar Chart */}
        <div className="chart">
          <h4>📌 Expenses by Category</h4>
          <Bar data={expensesBarChartData} />
        </div>

        {/* Revenue (Income) Bar Chart */}
        <div className="chart">
          <h4>📌 Revenue by Category</h4>
          <Bar data={revenueBarChartData} />
        </div>

        {/* Line Chart for Income vs Expenses Over Time */}
        <div className="chart">
          <h4>📌 Income vs Expenses Over Time</h4>
          {sortedDates.length > 1 ? <Line data={lineChartData} /> : <p>Not enough data for line chart</p>}
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;