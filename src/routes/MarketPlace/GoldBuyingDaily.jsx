import React, { useState } from 'react';

const App = () => {
  const [merchantTransactionId, setMerchantTransactionId] = useState('');
  const [merchantUserId, setMerchantUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [merchantOrderId, setMerchantOrderId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [shortName, setShortName] = useState('');

  const handlePay = async () => {
    const formData = new FormData();
    formData.append('merchantTransactionId', merchantTransactionId);
    formData.append('merchantUserId', merchantUserId);
    formData.append('amount', amount);
    formData.append('merchantOrderId', merchantOrderId);
    formData.append('mobileNumber', mobileNumber);
    formData.append('message', message);
    formData.append('email', email);
    formData.append('shortName', shortName);

    try {
      const response = await fetch('https://batchugold.com/(apis)/Store/PhonePe.php', {
        method: 'POST',
        body: formData,
        mode: 'cors',
      });
      const data = await response.json();
      console.log('Response:', data); // Log the response for debugging

      if (data.iframeUrl) {
        // Open the payment page in a popup window
        window.open(data.iframeUrl, '_blank', 'width=600,height=600');
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='mt-20'>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <input
          type="text"
          placeholder="Merchant Transaction ID"
          value={merchantTransactionId}
          onChange={(e) => setMerchantTransactionId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Merchant User ID"
          value={merchantUserId}
          onChange={(e) => setMerchantUserId(e.target.value)}
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
          placeholder="Mobile Number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Short Name"
          value={shortName}
          onChange={(e) => setShortName(e.target.value)}
        />
        <button type="button" onClick={handlePay}>Pay</button>
      </form>
    </div>
  );
};

export default App;
