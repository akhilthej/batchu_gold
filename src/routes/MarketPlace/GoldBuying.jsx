import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const GoldBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState(0);
  const [gold, setGold] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [goldPricePerGram, setGoldPricePerGram] = useState(0);
  const [formattedGold, setFormattedGold] = useState('');

  const amountValues = [0,10, 20, 50, 100, 200, 500];

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
      const goldAfterGST = gold * (1 - 0.3);
      const formattedGold = goldAfterGST.toFixed(8);
      setFormattedGold(formattedGold);
    };

    calculateGoldAfterGST();
  }, [gold]);

  const handleSliderChange = (e) => {
    const value = Number(e.target.value);
    setAmount(amountValues[value]);
    setGold(amountValues[value] / goldPricePerGram);
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_test_qjbYOaA0BlqnRS',
      amount: amount * 100,
      currency: 'INR',
      name: 'Gold Buying App',
      description: 'Gold purchase',
      handler: function(response) {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);

        const currentDateTime = new Date().toISOString();

        if (amount >= 10) {
          fetch('https://batchugold.com/(apis)/Store/Orders.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              amount: amount,
              email: user.emailaddress,
              phone: user.phonenumber,
              referral_code: referralCode,
              created_at: currentDateTime,
              notes: {
                address: 'Gold Buying App Corporate Office',
                referral_code_gold: referralCode,
                product_type: 'Regular Savings',
                products: 'Raw Gold',
              },
            }),
          })
            .then(response => response.json())
            .then(data => {
              if (data.success) {
                alert('Payment processed successfully');
              } else {
                alert('Failed to process payment');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Failed to process payment');
            });
        }
      },
      prefill: {
        name: user.name || '',
        email: user.emailaddress,
        contact: user.phonenumber,
      },
      notes: {
        address: 'Gold Buying App Corporate Office',
        referral_code_gold: referralCode,
        product_type: 'Regular Savings',
        products: 'Raw Gold',
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function() {
          alert('Payment process cancelled.');
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Quick Gold Buy</h1>
        <label className="block mb-2 text-gray-700">Select Amount (INR):</label>
        <input
          type="range"
          min="0"
          max={amountValues.length - 1}
          step="1"
          value={amountValues.indexOf(amount)}
          onChange={handleSliderChange}
          className="w-full"
        />
        <div className="text-center mt-1">
          Rs. {amount}
        </div>
        {user && (
          <>
          </>
        )}
        <label className="block mb-2 text-gray-700 text-sm">Referral Code:</label>
        <input
          type="text"
          value={referralCode}
          onChange={handleReferralCodeChange}
          className="w-full px-2  mb-2 border rounded"
        />

  

        <p className="mb-4 text-[12px]"> 
        <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-blue-500" /> 
        Receive : {formattedGold} grams</p>
        <button
          onClick={handlePayment}
          className="w-full bg-teal-900 text-white py-2 rounded hover:bg-teal-600"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default GoldBuying;
