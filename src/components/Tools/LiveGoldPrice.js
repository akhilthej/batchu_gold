import React from 'react';

const LiveGoldPrice = () => {
  const goldPrice = 6587; // Static gold price

  return (
    <div className="flex items-center space-x-1 bg-yellow-500 p-2 rounded-2xl text-xs">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
      </span>
      <span className="text-white font-bold ">
        {`Gold Price :  ₹${goldPrice.toFixed(2)} / gm`}
      </span>
    </div>
  );
};

export default LiveGoldPrice;
