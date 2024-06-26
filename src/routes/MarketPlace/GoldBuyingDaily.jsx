import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

import { GoldCoin } from '../../assets/data/Imagedata';

const GoldBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [gold, setGold] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [goldPricePerGram, setGoldPricePerGram] = useState(0);
  const [formattedGold, setFormattedGold] = useState('');

  const amountValues = [0, 10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500];

  const [formData, setFormData] = useState({
    merchantTransactionId: '',
    merchantUserId: 'MUID' + Date.now(),
    amount: '',
    merchantOrderId: '',
    mobileNumber: user.phonenumber,
    message: 'Order For Digital Gold - Daily',
    email: user.emailaddress,
    shortName: 'BAT_DigitalGold_Daily',
    orderlist: '',
    referralCode: referralCode,
  });

  useEffect(() => {
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(GOLD_LIVE_PRICE);
        const data = await response.json();
        const goldPrice = data.find(item => item.product_name === 'Gold');
        if (goldPrice) {
          setGoldPricePerGram(goldPrice.price);
        } else {
          console.error('Gold price not found in API response');
        }
      } catch (error) {
        console.error('Error fetching gold price:', error);
      }
    };

    fetchGoldPrice();
  }, []);

  useEffect(() => {
    const calculateGoldAfterGST = () => {
      const goldAfterGST = gold * (1 - 0.35); // Assuming 35% GST
      const formattedGold = goldAfterGST.toFixed(8);
      setFormattedGold(formattedGold);
    };
  
    calculateGoldAfterGST();
  }, [gold]);
  
  const handleAmountChange = (value) => {
    const selectedAmount = value;
    const calculatedGold = selectedAmount / goldPricePerGram;
    setAmount(selectedAmount);
    setGold(calculatedGold);
  
    const formattedGoldAfterGST = (calculatedGold * (1 - 0.35)).toFixed(8); // Assuming 35% GST
    setFormattedGold(formattedGoldAfterGST);
  
    setFormData(prevFormData => ({
      ...prevFormData,
      amount: selectedAmount,
      merchantTransactionId: 'MTID' + Date.now(),
      merchantOrderId: 'MOID' + Date.now(),
      orderlist: `${formattedGoldAfterGST} grams`,
    }));
  };
  

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
    setFormData(prevFormData => ({
      ...prevFormData,
      referralCode: code,
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://batchugold.com/apis/PhonePe/DigitalGold/PhonePe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      if (responseData.error) {
        console.error('Error:', responseData.error);
      } else {
        window.location.href = responseData.iframeUrl;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="p-8 w-full max-w-md">
        <div className="bg-gradient-to-r from-[#facc15] to-[#ca8a04] p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Daily Gold Buy</h1>
          <label className="block mb-2 text-white font-bold">Enter Amount (INR):</label>
          
          <input
  type="number"
  value={amount}
  onChange={(e) => handleAmountChange(Number(e.target.value))}
  className="w-full px-2 py-1 mb-4 border rounded"
  readOnly
/>


          <div className="flex flex-wrap gap-2 justify-center">
            {amountValues.map((value, index) => (
              <button
                key={index}
                onClick={() => handleAmountChange(value)}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-400"
              >
                {value}
              </button>
            ))}
          </div>

          <p className="text-center mt-4">
            Rs. {amount}
          </p>

          <p className="mb-4 text-[12px]">
            Receive: {formattedGold} grams
          </p>
          <button
            onClick={handlePayment}
            className="w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-700"
          >
            Subscribe Now
          </button>
        </div>

        <div className='px-5'>
          <div className='p-5 bg-yellow-400 rounded-b-2xl'>
            <label className="block mb-2 text-yellow-900 font-bold text-sm">Referral Code:</label>
            <input
              type="text"
              value={referralCode}
              onChange={handleReferralCodeChange}
              className="w-full px-2 mb-2 border rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoldBuying;
