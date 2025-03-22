import React from "react";
import Transactions from "../components/Transactions"; // Import Transactions component

const TransactionsPage = ({ transactions, addTransaction }) => {
  return (
    <div>
      <h2 className="page-title">Transactions</h2>
      <Transactions transactions={transactions} addTransaction={addTransaction} />
    </div>
  );
};

export default TransactionsPage;
