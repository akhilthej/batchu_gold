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
  const [error, setError] = useState(''); // State to hold error messages

  const handlePay = async () => {
    setError(''); // Clear previous errors
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
        setError(data.error || 'Unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error processing payment. Please try again.');
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
            type="submit"
            className="w-full bg-teal-900 text-white py-2 rounded hover:bg-teal-600"
          >
            Pay
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      ) : (
        <div className='overlay bg-black/70 min-h-screen flex items-center justify-center'>
          <div className='iframe-container bg-white p-4 rounded'>
            <iframe src={iframeUrl} className='mx-auto my-auto' width="100%" height="600" title="Payment"></iframe>
            <button onClick={() => setShowOverlay(false)} className='mt-4 bg-red-500 text-white py-2 px-4 rounded'>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
