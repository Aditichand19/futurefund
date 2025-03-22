// import React from "react";
// import { Line, Bar } from "react-chartjs-2";
// import "chart.js/auto"; // Auto-import Chart.js
// import "../App.css"; 

// const FinancialPredictions = ({ transactions }) => {
//   // === 📌 Step 1: Process Transactions ===
//   const groupTransactionsByMonth = (transactions = []) => { 
//     let monthlyData = {};

//     if (!Array.isArray(transactions) || transactions.length === 0) {
//       console.warn("No transactions available for predictions.");
//       return monthlyData; // Return empty object instead of failing
//     }

//     transactions.forEach(txn => {
//       let month = txn.date.substring(0, 7); // Extract "YYYY-MM"
//       if (!monthlyData[month]) {
//         monthlyData[month] = { income: 0, expenses: 0 };
//       }
//       if (txn.type === "Income") {
//         monthlyData[month].income += txn.amount;
//       } else {
//         monthlyData[month].expenses += Math.abs(txn.amount);
//       }
//     });

//     return monthlyData;
//   };

//   // === 📌 Step 2: Predict April 2025 ===
//   const predictNextMonth = (monthlyData) => {
//     let months = Object.keys(monthlyData).sort(); // Get sorted month keys
//     let lastThreeMonths = months.slice(-3); // Get last 3 months

//     let totalExpenses = 0, totalIncome = 0;
//     lastThreeMonths.forEach(month => {
//       totalExpenses += monthlyData[month].expenses;
//       totalIncome += monthlyData[month].income;
//     });

//     let avgExpenses = totalExpenses / lastThreeMonths.length;
//     let avgIncome = totalIncome / lastThreeMonths.length;

//     return {
//       predictedExpenses: Math.round(avgExpenses),
//       predictedIncome: Math.round(avgIncome),
//       predictedSavings: Math.round(avgIncome - avgExpenses)
//     };
//   };

//   // Process Transactions
//   const monthlyData = groupTransactionsByMonth(transactions);
//   const prediction = predictNextMonth(monthlyData);

//   // Prepare Data for Bar Chart
//   const barChartData = {
//     labels: [...Object.keys(monthlyData), "Apr 2025"],
//     datasets: [
//       {
//         label: "Income",
//         data: [...Object.values(monthlyData).map(d => d.income), prediction.predictedIncome],
//         backgroundColor: "green",
//       },
//       {
//         label: "Expenses",
//         data: [...Object.values(monthlyData).map(d => d.expenses), prediction.predictedExpenses],
//         backgroundColor: "red",
//       },
//       {
//         label: "Savings",
//         data: [...Object.values(monthlyData).map(d => d.income - d.expenses), prediction.predictedSavings],
//         backgroundColor: "blue",
//       }
//     ]
//   };

//   // === 📌 Step 3: Add Interactive Trend Lines ===
//   const lineChartData = {
//     labels: [...Object.keys(monthlyData), "Apr 2025"],
//     datasets: [
//       {
//         label: "Income Trend",
//         data: [...Object.values(monthlyData).map(d => d.income), prediction.predictedIncome],
//         borderColor: "green",
//         fill: false,
//         tension: 0.3, // Smooth curve
//         pointRadius: 5,
//       },
//       {
//         label: "Expenses Trend",
//         data: [...Object.values(monthlyData).map(d => d.expenses), prediction.predictedExpenses],
//         borderColor: "red",
//         fill: false,
//         tension: 0.3,
//         pointRadius: 5,
//       },
//       {
//         label: "Savings Trend",
//         data: [...Object.values(monthlyData).map(d => d.income - d.expenses), prediction.predictedSavings],
//         borderColor: "blue",
//         fill: false,
//         tension: 0.3,
//         pointRadius: 5,
//       }
//     ]
//   };

//   return (
//     <div className="predictions-container">
//       <h2>🔮 Financial Predictions for April 2025</h2>

//       {/* Bar Chart */}
//       <div className="chart-container">
//         <h3>📊 Bar Chart</h3>
//         <Bar data={barChartData} />
//       </div>

//       {/* Trend Line Chart */}
//       <div className="chart-container">
//         <h3>📈 Trend Over Time</h3>
//         <Line data={lineChartData} />
//       </div>
//     </div>
//   );
// };

// export default FinancialPredictions;


// frontend/src/components/FinancialPredictions.js