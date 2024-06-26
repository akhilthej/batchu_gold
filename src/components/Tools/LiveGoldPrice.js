import React, { useState, useEffect } from 'react';
import { Goldraw } from '../../assets/data/Imagedata';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

const LiveGoldPrice = () => {
  const [goldPrice, setGoldPrice] = useState(null);
  const [countdown, setCountdown] = useState(300); // Initial countdown value in seconds for 4 minutes
  const goldpricelive = GOLD_LIVE_PRICE;

  // Function to fetch gold price from API
  const fetchGoldPrice = async () => {
    try {
      const response = await fetch(goldpricelive);
      const data = await response.json();
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

  // Fetch gold price initially when component mounts
  useEffect(() => {
    fetchGoldPrice();
  }, [goldpricelive]);

  // Set up interval to fetch gold price every 4 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchGoldPrice();
      setCountdown(300); // Reset countdown to 4 minutes (240 seconds) after each fetch
    }, 300000); // 4 minutes in milliseconds (240000)

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this effect runs only once on mount

  // Countdown timer effect to decrease countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000); // 1 second interval

    // Clear interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flex items-center">
      <img src={Goldraw} alt="Goldraw" width={50} height={50} className="cursor-pointer absolute mr-10" />
      <div className="flex ml-8 items-center bg-yellow-400 py-1 px-4 rounded-full border-2 border-yellow-500">
        <div className="relative flex items-center justify-center pr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-black font-medium text-[9px] sm:text-xs leading-tight">
            {`Live Gold Price`}
          </span>
          <span className="text-black font-bold text-[12px] md:text-sm leading-tight">
            {goldPrice !== null ? `₹${goldPrice.toFixed(2)}/gm` : 'Loading...'}
          </span>
          <span className="text-black font-medium text-[9px] sm:text-xs leading-tight">
            {`Updating in ${Math.floor(countdown / 60)}:${countdown % 60 < 10 ? '0' : ''}${countdown % 60}`}
          </span>
        </div>
      </div>
    </section>
  );
};

export default LiveGoldPrice;
