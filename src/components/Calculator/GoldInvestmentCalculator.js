import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GoldCoin } from '../../assets/data/Imagedata';

const GoldInvestmentCalculator = () => {
  const [dailyAmount, setDailyAmount] = useState(0);
  const [time, setTime] = useState(1);

  // Calculate invested amount, estimated returns, and total returns
  const investedAmount = dailyAmount * time * 365;
  const estimatedReturns = investedAmount * 0.5; // Adjusted return rate to reflect the provided values
  const totalReturns = investedAmount + estimatedReturns;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 sm:p-6 md:p-8 rounded-2xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8">24k Gold Investment Calculator</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-10 mb-6 sm:mb-8 w-full">
        <div className="flex flex-col items-center mb-4 sm:mb-0 w-full">
          <label className="mb-2 sm:mb-4 text-lg sm:text-xl">Daily Amount (₹)</label>
          <div className="relative w-full bg-yellow-700 max-w-lg h-10 flex items-center rounded-lg">
            <input
              type="range"
              min="0"
              max="1000"
              step="1"
              value={dailyAmount}
              onChange={(e) => setDailyAmount(Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer"
              style={{ zIndex: 10, position: 'relative' }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center pointer-events-none"
              style={{
                left: `calc(${(dailyAmount / 1000) * 100}% - 16px)`,
                zIndex: 20
              }}
            >
              <img src={GoldCoin} alt="indicator" className="h-full w-full" />
            </div>
          </div>
          <div className="mt-2 text-md sm:text-lg font-semibold">₹ {dailyAmount}</div>
        </div>
        <div className="flex flex-col items-center w-full">
          <label className="mb-2 sm:mb-4 text-lg sm:text-xl">Time (years)</label>
          <div className="relative w-full bg-yellow-700 max-w-lg h-10 flex items-center rounded-lg">
            <input
              type="range"
              min="1"
              max="20"
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full appearance-none bg-transparent cursor-pointer"
              style={{ zIndex: 10, position: 'relative' }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center pointer-events-none"
              style={{
                left: `calc(${(time / 20) * 100}% - 30px)`,
                zIndex: 20
              }}
            >
              <img src={GoldCoin} alt="indicator" className="h-full w-full" />
            </div>
          </div>
          <div className="mt-2 text-md sm:text-lg font-semibold">{time} yrs</div>
        </div>
      </div>
      <div className="text-center text-sm sm:text-lg space-y-4 bg-white text-black p-4 sm:p-6 rounded-lg shadow-lg w-full">
        <div className="font-medium">Invested Amount: ₹ {investedAmount.toLocaleString('en-IN')}</div>
        <div className="font-medium">Estimated Returns: ₹ {estimatedReturns.toLocaleString('en-IN')}</div>
        <div className="font-bold text-lg sm:text-xl">Total Returns on Gold: ₹ {totalReturns.toLocaleString('en-IN')}</div>
      </div>
      <Link to='/MarketPlace'>
        <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-2 sm:py-3 bg-orange-600 rounded-full text-md sm:text-lg hover:bg-orange-700 transition duration-300">Start Saving Now</button>
      </Link>
    </div>
  );
};

export default GoldInvestmentCalculator;
