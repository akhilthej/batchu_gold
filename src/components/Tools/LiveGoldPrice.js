import React from 'react';
import { Goldraw } from '../../assets/data/Imagedata';

const LiveGoldPrice = () => {
  const goldPrice = 6587; // Static gold price

  return (
    <section className="flex items-center">
      <img src={Goldraw} alt="Goldraw" width={50} height={50} className="cursor-pointer absolute mr-10" />

     <div className="flex ml-8 items-center bg-yellow-400 py-1 px-4 rounded-full border-2 border-yellow-500 ">
    
      <div className="relative flex items-center justify-center pr-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 "></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600 "></span>
      </div>
      <div className="flex flex-col">
        <span className="text-black font-bold text-[9px] sm:text-xs leading-tight">
          {`Live Gold Price`}
        </span>
        <span className="text-black font-bold text-[12px] md:text-sm leading-tight">
          {`₹${goldPrice.toFixed(2)}/gm`}
        </span>
      </div>
    </div></section>
  );
};

export default LiveGoldPrice;
