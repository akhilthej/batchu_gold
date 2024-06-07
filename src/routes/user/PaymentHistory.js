import React, { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { USER_FETCH_TRANSACTIONS_URL } from '../../hooks/APIHooks';
import { GoldCoin, SilverCoin } from '../../assets/data/Imagedata';
import TotalMaterial from './TotalMaterial';

const TransactionTable = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(USER_FETCH_TRANSACTIONS_URL);
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
    return <div className="flex items-center justify-center h-screen text-red-500">Loading...</div>;
  }

  // Filter transactions based on user email
  const userTransactions = transactions.filter(transaction => transaction.email === user.emailaddress);

  // Filter transactions into gold and silver categories
  const goldTransactions = userTransactions.filter(transaction => transaction.type === 'Gold');
  const silverTransactions = userTransactions.filter(transaction => transaction.type === 'Silver');

  // Calculate total gold and silver grams for successful transactions
  const totalGold = goldTransactions.reduce((total, transaction) => {
    if (transaction.status.toLowerCase() === 'success') {
      return total + Number(transaction.gold || 0);
    }
    return total;
  }, 0);

  const totalSilver = silverTransactions.reduce((total, transaction) => {
    if (transaction.status.toLowerCase() === 'success') {
      return total + Number(transaction.silver || 0);
    }
    return total;
  }, 0);

  const renderTable = (transactions, type) => (
    <div className="bg-white shadow-lg rounded-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{type} Transaction History</h2>

      {transactions.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-800">ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Amount (INR)</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Gold/Silver (grams)</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Created At</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Payment ID</th>
                <th className="py-3 px-4 text-left font-medium text-gray-800">Email</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-b">
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">
                    {transaction.type}
                    {transaction.type === 'Gold' ? (
                      <img src={GoldCoin} alt="Gold" className="w-6 h-6 inline-block ml-2" />
                    ) : (
                      <img src={SilverCoin} alt="Silver" className="w-6 h-6 inline-block ml-2" />
                    )}
                  </td>
                  <td className={`py-2 px-4 text-sm ${transaction.status.toLowerCase() === 'success' ? 'text-green-500' : 'text-red-500'}`}>{transaction.status}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.amount}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.gold || transaction.silver}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.created_at}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.payment_id}</td>
                  <td className="py-2 px-4 text-sm text-gray-700">{transaction.email}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm font-medium text-gray-800" colSpan="4">Total {type}</td>
                <td className="py-2 px-4 text-sm font-medium text-gray-800">{(type === 'Gold' ? totalGold : totalSilver).toFixed(8)} grams</td>
                <td className="py-2 px-4 text-sm font-medium text-gray-800" colSpan="3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No {type.toLowerCase()} transactions found.</p>
      )}
    </div>
  );

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
    <TotalMaterial />
      {/* User and Auth */}
      <section className="mb-6">
        <div className="flex items-center justify-center p-4 bg-white shadow-lg rounded-md">
          {user ? (
            <>
              <span className="text-lg text-gray-800">
                Hello, <span className="font-bold">{user.name}</span>
                <br />
                <span className="font-bold">{user.emailaddress}</span>
              </span>
            </>
          ) : (
            <>
              <span className="text-lg text-gray-800">
                Welcome Guest
              </span>
            </>
          )}
        </div>
      </section>

      {renderTable(goldTransactions, 'Gold')}
      {renderTable(silverTransactions, 'Silver')}
    </section>
  );
};

export default TransactionTable;
