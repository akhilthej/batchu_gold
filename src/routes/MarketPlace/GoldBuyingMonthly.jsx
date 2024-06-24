import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';


import {GoldCoin} from '../../assets/data/Imagedata';

const GoldBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [gold, setGold] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [goldPricePerGram, setGoldPricePerGram] = useState(0);
  const [formattedGold, setFormattedGold] = useState('');

  const amountValues = [2500, 5500, 10000];

  const [formData, setFormData] = useState({
    merchantTransactionId: '',
    merchantUserId: 'MUID' + Date.now(),
    amount: '',
    merchantOrderId: '',
    mobileNumber: user.phonenumber,
    message: 'Order For Digital Gold - Regular',
    email: user.emailaddress,
    shortName: 'BAT_DigitalGold_Regular',
    orderlist: '', // Initialize as empty string
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
      const goldAfterGST = gold * (1 - 0.03); // Assuming 3% GST
      const formattedGold = goldAfterGST.toFixed(8);
      setFormattedGold(formattedGold);
    };

    calculateGoldAfterGST();
  }, [gold]);

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    const selectedAmount = amountValues[value];
    const calculatedGold = selectedAmount / goldPricePerGram;
    setAmount(selectedAmount);
    setGold(calculatedGold);

    setFormData(prevFormData => ({
      ...prevFormData,
      amount: selectedAmount,
      merchantTransactionId: 'MTID' + Date.now(),
      merchantOrderId: 'MOID' + Date.now(),
      orderlist: `${calculatedGold.toFixed(8)} grams`, // Update orderlist with calculated gold grams
    }));
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
    setFormData(prevFormData => ({
      ...prevFormData,
      referralCode: code,
      orderlist: `${formattedGold} grams`, // Update orderlist with referral code
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
        // Handle error state or show error to user
      } else {
        // Redirect to payment URL received from backend
        window.location.href = responseData.iframeUrl; // Assuming iframeUrl is returned on success
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error state or show error to user
    }
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      
      <div className="p-8 w-full max-w-md">


      <div className="bg-gradient-to-r from-[#facc15] to-[#ca8a04] p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Buy Gold Monthly</h1>
        <label className="block mb-2 text-white font-bold ">Select Amount (INR):</label>

        <div className="relative w-full bg-yellow-700 max-w-lg h-10 flex items-center rounded-lg">
          <input
            type="range"
            min="0"
            max={amountValues.length - 1}
            step="1"
            value={amountValues.indexOf(amount)}
            onChange={handleSliderChange}
            className="w-full appearance-none bg-transparent cursor-pointer "
            style={{ zIndex: 10, position: 'relative' }}
          />
          <div
            className="absolute top-1/2 transform -translate-y-1/2 h-8 w-8 flex items-center justify-center pointer-events-none"
            style={{
              left: `calc(${(amountValues.indexOf(amount) / (amountValues.length - 1)) * 100}% - 16px)`,
              zIndex: 20
            }}
          >
            <img src={GoldCoin} alt="indicator" className="h-full w-full" />
          </div>
        </div>

        <div className="text-center mt-1">
          Rs. {amount}
        </div>
       
        <p className="mb-4 text-[12px]"> 
          Receive: {formattedGold} grams
        </p>
        <button
          onClick={handlePayment}
          className="w-full bg-yellow-900 text-white py-2 rounded hover:bg-yellow-700"
        >
          Buy Now
        </button>
      </div>

     <div className='px-5'>
     <div className='p-5 bg-yellow-400 rounded-b-2xl'>
      <label className="block mb-2 text-yellow-900 font-bold text-sm ">Referral Code:</label>
        <input
          type="text"
          value={referralCode}
          onChange={handleReferralCodeChange}
          className="w-full px-2 mb-2 border rounded "
        /></div></div>

    </div>
    </div>
  );
};

export default GoldBuying;
