import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/GlobalProvider';
import { USER_FETCH_TRANSACTIONS_URL } from '../../../hooks/APIHooks';
import { GoldCoin, SilverCoin } from '../../../assets/data/Imagedata';

const TotalMaterial = () => {
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

  // Filter successful transactions based on user email
  const successfulTransactions = transactions.filter(
    transaction => transaction.email === user.emailaddress && transaction.status.toLowerCase() === 'success'
  );

  // Calculate total gold and silver grams
  let totalGoldGrams = 0;
  successfulTransactions.forEach(transaction => {
    if (transaction.type === 'Gold') {
      totalGoldGrams += parseFloat(transaction.gold || 0);
    }
  });

  return (
    <section className="p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Total Material</h1>
      <div className="flex justify-center mb-4">
        <div className="flex flex-col items-center mr-8">
          <img src={GoldCoin} alt="Gold" className="w-16 h-16 mb-2" />
          <p className="text-lg text-gray-800 font-bold">{totalGoldGrams.toFixed(8)} g</p>
          <p className="text-sm text-gray-600">Gold</p>
        </div>
        
      </div>
    </section>
  );
};

export default TotalMaterial;
