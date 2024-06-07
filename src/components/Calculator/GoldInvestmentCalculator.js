// src/GoldInvestmentCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GoldInvestmentCalculator = () => {
  const [dailyAmount, setDailyAmount] = useState(0);
  const [time, setTime] = useState(1);

  // Calculate invested amount, estimated returns, and total returns
  const investedAmount = dailyAmount * time * 365;
  const estimatedReturns = investedAmount * 0.5; // Adjusted return rate to reflect the provided values
  const totalReturns = investedAmount + estimatedReturns;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl">
      <h1 className="text-4xl font-bold mb-8">24k Gold Investment Calculator</h1>
      <div className="flex space-x-10 mb-8">
        <div className="flex flex-col items-center">
          <label className="mb-4 text-xl">Daily Amount (₹)</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={dailyAmount}
            onChange={(e) => setDailyAmount(Number(e.target.value))}
            className="slider w-64 h-10 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 text-lg font-semibold">₹ {dailyAmount}</div>
        </div>
        <div className="flex flex-col items-center">
          <label className="mb-4 text-xl">Time (years)</label>
          <input
            type="range"
            min="1"
            max="20"
            value={time}
            onChange={(e) => setTime(Number(e.target.value))}
            className="slider w-64 h-10 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="mt-2 text-lg font-semibold">{time} yrs</div>
        </div>
      </div>
      <div className="text-center text-lg space-y-4 bg-white text-black p-6 rounded-lg shadow-lg">
        <div className="font-medium">Invested Amount: ₹ {investedAmount.toLocaleString('en-IN')}</div>
        <div className="font-medium">Estimated Returns: ₹ {estimatedReturns.toLocaleString('en-IN')}</div>
        <div className="font-bold text-xl">Total Returns on Gold: ₹ {totalReturns.toLocaleString('en-IN')}</div>
      </div>
      <Link to='/MarketPlace'>
      <button className="mt-8 px-8 py-3 bg-orange-600 rounded-full text-lg hover:bg-orange-700 transition duration-300">Start Saving Now</button></Link>
    </div>
  );
};

export default GoldInvestmentCalculator;
