import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

const GoldBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [gold, setGold] = useState(0);
  const [referralCode, setReferralCode] = useState('');
  const [goldPricePerGram, setGoldPricePerGram] = useState(0); // State to hold gold price
  const [productType] = useState('Regular Savings'); // Fixed product type
  const [products] = useState('Raw Gold'); // Fixed product
  const [formattedGold, setFormattedGold] = useState('');

  useEffect(() => {
    // Function to fetch gold price
    const fetchGoldPrice = async () => {
      try {
        const response = await fetch(GOLD_LIVE_PRICE); // Replace with your API endpoint
        const data = await response.json();
        const goldPrice = data.find(item => item.product_name === 'Gold');
        if (goldPrice) {
          setGoldPricePerGram(goldPrice.price); // Set the gold price per gram
        } else {
          console.error('Gold price not found in API response');
        }
      } catch (error) {
        console.error('Error fetching gold price:', error);
      }
    };

    fetchGoldPrice(); // Call the fetch function when component mounts
  }, []); // Empty dependency array ensures it runs only once

  useEffect(() => {
    // Calculate the amount of gold after applying -30% GST
    const calculateGoldAfterGST = () => {
      const goldAfterGST = gold * (1 - 0.35); // Applying -30% GST
      const formattedGold = goldAfterGST.toFixed(8); // Format to 8 decimal places
      setFormattedGold(formattedGold);
    };

    calculateGoldAfterGST();
  }, [gold]);

  const handleAmountChange = e => {
    const inr = e.target.value;
    setAmount(inr);
    setGold(inr / goldPricePerGram);
  };

  const handleReferralCodeChange = e => {
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
          // Call the backend to handle the payment
          fetch('https://batchugold.com/(apis)/goldtransations.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              payment_id: response.razorpay_payment_id,
              amount: amount,
              product_type: productType,
              products: products,
              email: user.emailaddress,
              phone: user.phonenumber,
              referral_code: referralCode,
              created_at: currentDateTime,
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
    <div className="py-10 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Buy Gold</h1>
        <label className="block mb-2 text-gray-700">Enter Amount (INR):</label>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          className="w-full px-3 py-2 mb-4 border rounded"
        />
        {user && (
          <>
            <label className="block mb-2 text-gray-700">Email:</label>
            <input
              type="email"
              value={user.emailaddress}
              readOnly
              className="w-full px-3 py-2 mb-4 border rounded bg-gray-200"
            />
            <label className="block mb-2 text-gray-700">Phone Number:</label>
            <input
              type="text"
              value={user.phonenumber}
              readOnly
              className="w-full px-3 py-2 mb-4 border rounded bg-gray-200"
            />
          </>
        )}
        {amount >= 10 && (
          <>
            <label className="block mb-2 text-gray-700">Referral Code:</label>
            <input
              type="text"
              value={referralCode}
              onChange={handleReferralCodeChange}
              className="w-full px-3 py-2 mb-4 border rounded"
            />
          </>
        )}
        <p className="mb-4">Gold you will receive after GST: {formattedGold} grams</p>
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
