import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { USER_FETCH_TRANSACTIONS_URL } from '../../hooks/APIHooks';
import { GoldCoin } from '../../assets/data/Imagedata';

const TransactionTable = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(USER_FETCH_TRANSACTIONS_URL);
        const data = await response.json();

        if (data.success) {
          setTransactions(data.transactions);
        } else {
          setError('Failed to fetch transactions');
        }
      } catch (error) {
        setError('Error fetching transactions');
      }
      setLoading(false);
    };

    fetchTransactions();
  }, []);

  const renderTable = (transactions) => (
    <div className="bg-white shadow-lg rounded-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Digital Gold History</h2>
      <span className="font-bold text-lg">User: {user.name}</span>
      <span className="text-sm">{user.emailaddress}</span>
      <span className="text-sm">{user.address}</span>

      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">TransactionId</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">Status</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">Amount (INR)</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">Gold (grams)</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">Email</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">ShortCode</th>
                <th className="py-3 px-1 text-left font-medium text-gray-800 text-[10px]">Created At</th>
              </tr>
            </thead>
            <tbody>
              {transactions
                .filter(transaction => transaction.email === user.emailaddress && transaction.shortName === 'BAT_DigitalGold')
                .map(transaction => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.transactionId}</td>
                    <td className={`py-2 px-1 text-[10px] ${transaction.status.toLowerCase() === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{transaction.status}</td>
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.amount}</td>
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.orderlist}</td>
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.email}</td>
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.shortName}</td>
                    <td className="py-2 px-1 text-[10px] text-gray-700">{transaction.created_at}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No gold transactions found.</p>
      )}
    </div>
  );

  return (
    <section className="p-8 bg-gray-100 min-h-screen mt-20">
      {loading ? (
        <div className="flex items-center justify-center h-screen text-red-500">Loading...</div>
      ) : error ? (
        <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
      ) : (
        renderTable(transactions)
      )}
    </section>
  );
};

export default TransactionTable;
