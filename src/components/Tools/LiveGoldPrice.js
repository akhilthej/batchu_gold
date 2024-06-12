import React from 'react';

const LiveGoldPrice = () => {
  const goldPrice = 6587; // Static gold price

  return (
    <div className="flex items-center bg-gray-300 py-1 px-4 rounded-full border-2">
      <div className="relative flex items-center justify-center pr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
      </div>
      <div className="flex flex-col">
        <span className="text-black font-bold text-[9px] sm:text-xs leading-tight">
          {`Live Gold Price`}
        </span>
        <span className="text-black font-bold text-[12px] md:text-sm leading-tight">
          {`₹${goldPrice.toFixed(2)}/gm`}
        </span>
      </div>
    </div>
  );
};

export default LiveGoldPrice;
