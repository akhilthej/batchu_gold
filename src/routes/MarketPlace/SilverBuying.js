import React, { useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

const SilverBuying = () => {
  const { user } = useAuth();
  const [amount, setAmount] = useState('');
  const [silver, setSilver] = useState(0);
  const silverPricePerGram = 8000; // 1 gram 24 carat silver price in INR

  const handleAmountChange = (e) => {
    const inr = e.target.value;
    setAmount(inr);
    setSilver(inr / silverPricePerGram);
  };

  const sendPaymentResultToBackend = (paymentData) => {
    fetch('https://gold.cyberspacedigital.in/api/silvertransations.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Payment status updated successfully.');
        } else {
          alert('Failed to update payment status.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePayment = () => {
    const options = {
      key: 'rzp_live_JbXDlasvark44n',
      amount: amount * 100, // Amount is in paise
      currency: 'INR',
      name: 'Gold Buying App',
      description: 'Gold purchase',
      handler: function (response) {
        alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);
        sendPaymentResultToBackend({
          status: 'success',
          payment_id: response.razorpay_payment_id,
          amount: amount,
          silver: silver.toFixed(8),
          email: user.emailaddress,
          phone: user.phonenumber,
        });
      },
      prefill: {
        name: '',
        email: user.emailaddress,
        contact: user.phonenumber,
      },
      notes: {
        address: 'Gold Buying App Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: function () {
          alert('Payment process cancelled.');
          sendPaymentResultToBackend({
            status: 'failed',
            amount: amount,
            silver: silver.toFixed(8),
            email: user.emailaddress,
            phone: user.phonenumber,
          });
        },
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="py-10 flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Buy Silver</h1>
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
        <p className="mb-4">Gold you will receive: {silver.toFixed(8)} grams</p>
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

export default SilverBuying;
