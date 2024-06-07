import React from 'react';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();

  const handleBuyGold = () => {
    navigate('/gold-buying');
  };

  const handleBuySilver = () => {
    navigate('/silver-buying');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img src="/path/to/gold-image.jpg" alt="Buy Gold" className="w-full h-64 object-cover rounded" />
          <button
            onClick={handleBuyGold}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          >
            Buy Gold
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img src="/path/to/silver-image.jpg" alt="Buy Silver" className="w-full h-64 object-cover rounded" />
          <button
            onClick={handleBuySilver}
            className="mt-4 w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
          >
            Buy Silver
          </button>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
