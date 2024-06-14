import React, { useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

const GoldBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [gold, setGold] = useState(0);
  const [referralCode, setReferralCode] = useState(''); // State for referral code
  const goldPricePerGram = 8000; // 1 gram 24 carat gold price in INR

  const handleAmountChange = (e) => {
    const inr = e.target.value;
    setAmount(inr);
    setGold(inr / goldPricePerGram);
  };

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_live_JbXDlasvark44n', // Replace with your Razorpay key
      amount: amount * 100, // Amount is in paise
      currency: 'INR',
      name: 'Gold Buying App',
      description: 'Gold purchase',
      handler: function (response) {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: user.name || '', // Replace with user's name if available
        email: user.emailaddress,
        contact: user.phonenumber,
      },
      notes: {
        address: 'Gold Buying App Corporate Office',
        referral_code_gold: referralCode, // Pass referral code in notes
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          alert('Payment process cancelled.');
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="py-10 flex flex-col items-center justify-center bg-gray-100">
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
        <label className="block mb-2 text-gray-700">Referral Code:</label>
        <input
          type="text"
          value={referralCode}
          onChange={handleReferralCodeChange}
          className="w-full px-3 py-2 mb-4 border rounded"
        />
        <p className="mb-4">Gold you will receive: {gold.toFixed(8)} grams</p>
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
