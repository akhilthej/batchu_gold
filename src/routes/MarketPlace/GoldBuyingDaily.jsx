import React, { useState } from 'react';

const PaymentForm = () => {
  const [formData, setFormData] = useState({
    merchantTransactionId: '',
    merchantUserId: 'MUID' + Date.now(),
    amount: '',
    merchantOrderId: '',
    mobileNumber: '',
    message: '',
    email: '',
    shortName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://batchugold.com/apis/Store/PhonePe/PhonePe.php', {
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
    <div className='mt-20'>
      <h2>Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Merchant Transaction ID:
          <input type="text" name="merchantTransactionId" value={formData.merchantTransactionId} onChange={handleChange} required />
        </label><br />
        <label>
          Amount:
          <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
        </label><br />
        <label>
          Mobile Number:
          <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
        </label><br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label><br />
        <label>
          Message:
          <textarea name="message" value={formData.message} onChange={handleChange}></textarea>
        </label><br />
        <label>
          Short Name:
          <input type="text" name="shortName" value={formData.shortName} onChange={handleChange} />
        </label><br />
        <button type="submit">Pay</button>
      </form>
    </div>
  );
};

export default PaymentForm;
