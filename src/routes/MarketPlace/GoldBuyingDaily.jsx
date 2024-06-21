import React, { useState } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

const App = () => {
  const { user } = useAuth();

  const [merchantTransactionId, setMerchantTransactionId] = useState('');
  const [amount, setAmount] = useState('');
  const [merchantOrderId, setMerchantOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [iframeUrl, setIframeUrl] = useState(''); // State to hold the iframe URL
  const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

  const handlePay = async () => {
    const formData = new FormData();
    formData.append('merchantTransactionId', merchantTransactionId);
    formData.append('merchantUserId', user.name);
    formData.append('amount', amount);
    formData.append('merchantOrderId', merchantOrderId);
    formData.append('mobileNumber', user.phonenumber);
    formData.append('message', message);
    formData.append('email', user.emailaddress);
    formData.append('shortName', "BAT_REG_DAILY"); // Static value

    try {
      const response = await fetch('https://batchugold.com/(apis)/Store/PhonePe.php', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const data = await response.json();
      console.log('Response:', data); // Log the response for debugging

      if (data.iframeUrl) {
        setIframeUrl(data.iframeUrl);
        setShowOverlay(true); // Show the overlay
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='my-20'>
      {!showOverlay ? (
        <form onSubmit={(e) => { e.preventDefault(); handlePay(); }}>
          <input
            type="text"
            placeholder="Merchant Transaction ID"
            value={merchantTransactionId}
            onChange={(e) => setMerchantTransactionId(e.target.value)}
          />
          <input
            type="text"
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
          onClick={handlePay}
          className="w-full bg-teal-900 text-white py-2 rounded hover:bg-teal-600"
        >
          Pay
        </button>

        </form>
      ) : (
        <div className='overlay bg-black/70 min-h-screen '>
          <div className='iframe-container '>
            <iframe src={iframeUrl} className='mx-auto my-auto' width="400" height="600" title="Payment"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
