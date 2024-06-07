import React, { useEffect, useState } from 'react';

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost/goldapi/fetchTransactions.php');
        const data = await response.json();

        if (data.success) {
          setTransactions(data.transactions);
        } else {
          console.error('Error fetching transactions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>

      {transactions.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">ID</th>
              <th className="py-2">Type</th>
              <th className="py-2">Status</th>
              <th className="py-2">Payment ID</th>
              <th className="py-2">Amount (INR)</th>
              <th className="py-2">Gold/Silver (grams)</th>
              <th className="py-2">Email</th>
              <th className="py-2">Phone</th>
              <th className="py-2">Created At</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.status}</td>
                <td className="border px-4 py-2">{transaction.payment_id}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.gold}</td>
                <td className="border px-4 py-2">{transaction.email}</td>
                <td className="border px-4 py-2">{transaction.phone}</td>
                <td className="border px-4 py-2">{transaction.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionTable;
