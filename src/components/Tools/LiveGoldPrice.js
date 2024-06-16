import React, { useEffect, useState } from 'react';
import { Goldraw } from '../../assets/data/Imagedata';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

const LiveGoldPrice = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const goldpricelive = GOLD_LIVE_PRICE;

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(goldpricelive);
        const data = await response.json();
        // Assuming the API response has a structure like { price: 8000 }
        if (data && data.length > 0) {
          const goldData = data.find(item => item.product_name === 'Gold');
          if (goldData) {
            setGoldPrice(goldData.price);
          }
        }
      } catch (error) {
        console.error('Error fetching gold price:', error);
      }
    };

    fetchGoldPrice();
  }, [goldpricelive]);

  return (
    <section className="flex items-center">
      <img src={Goldraw} alt="Goldraw" width={50} height={50} className="cursor-pointer absolute mr-10" />
      <div className="flex ml-8 items-center bg-yellow-400 py-1 px-4 rounded-full border-2 border-yellow-500">
        <div className="relative flex items-center justify-center pr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-bold text-[9px] sm:text-xs leading-tight">
            {`Live Gold Price`}
          </span>
          <span className="text-black font-bold text-[12px] md:text-sm leading-tight">
            {goldPrice !== null ? `₹${goldPrice.toFixed(2)}/gm` : 'Loading...'}
          </span>
        </div>
      </div>
    </section>
  );
};

export default LiveGoldPrice;
