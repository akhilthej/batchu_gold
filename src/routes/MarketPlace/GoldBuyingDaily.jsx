import React, { useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

const App = () => {
  const { user } = useAuth();

  const [merchantTransactionId, setMerchantTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [merchantOrderId, setMerchantOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePay = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Ensure required fields are not empty
    if (!merchantTransactionId || !amount || !merchantOrderId) {
      setError('Please fill all required fields.');
      return;
    }

    const formData = {
      merchantTransactionId,
      merchantUserId: user.name,
      amount: parseInt(amount), // Ensure amount is sent as integer
      merchantOrderId,
      mobileNumber: user.phonenumber,
      message,
      email: user.emailaddress,
      shortName: 'BAT_REG_DAILY', // Static value
    };

    try {
      const response = await fetch('https://batchugold.com/apis/Store/PhonePe.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YourAuthTokenHere', // Add authorization header if needed
        },
        body: JSON.stringify(formData),
        mode: 'cors',
      });

      const data = await response.json();
      console.log('Response:', data); // Log the response for debugging

      if (data.iframeUrl) {
        openPopup(data.iframeUrl);
      } else {
        console.error('Error:', data.error);
        setError(data.error || 'Unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error processing payment. Please try again.');
    }
  };

  const openPopup = (url) => {
    const newWindow = window.open(url, '_blank', 'height=600,width=800');
    if (newWindow) {
      newWindow.focus();
    } else {
      setError('Popup blocked! Please enable popups for this site.');
    }
  };

  return (
    <div className='my-20'>
      <h1>change2</h1>
      <form onSubmit={handlePay}>
        <input
          type="text"
          placeholder="Merchant Transaction ID"
          value={merchantTransactionId}
          onChange={(e) => setMerchantTransactionId(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount (in paisa)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Merchant Order ID"
          value={merchantOrderId}
          onChange={(e) => setMerchantOrderId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-teal-900 text-white py-2 rounded hover:bg-teal-600"
        >
          Pay
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default App;
