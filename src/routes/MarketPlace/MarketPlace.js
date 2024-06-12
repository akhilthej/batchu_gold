import React from 'react';
import { useNavigate } from 'react-router-dom';

const Marketplace = () => {
  const navigate = useNavigate();

  const handleBuyGold = () => {
    navigate('/gold-buying');
  };

  return (
    <section>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 space-x-10 px-10 ">
      <div className="w-full max-w-xl">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img src="/path/to/gold-image.jpg" alt="Buy Gold" className="w-full h-64 object-cover rounded" />
          <button
            onClick={handleBuyGold}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Buy Gold
          </button>
        </div>
      </div>

      <div className="w-full max-w-xl">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img src="/path/to/gold-image.jpg" alt="Buy Gold" className="w-full h-64 object-cover rounded" />
          <button
            onClick={handleBuyGold}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Buy Gold
          </button>
        </div>
      </div>


      <div className="w-full max-w-xl">
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
          <img src="/path/to/gold-image.jpg" alt="Buy Gold" className="w-full h-64 object-cover rounded" />
          <button
            onClick={handleBuyGold}
            className="mt-4 w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
            Buy Gold
          </button>
        </div>
      </div>
      
    </div>

    </section>
  );
};

export default Marketplace;
