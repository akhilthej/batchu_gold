import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

const Checkout = ({ totalCartValue }) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  useEffect(() => {
    // You can fetch any necessary data or initialize state here
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handlePayment = () => {
    // Implement your payment gateway integration logic here
    // For example, using a mock function for demonstration
    alert(`Processing payment of ₹${totalCartValue.toFixed(2)} using ${paymentMethod}`);
  };

  return (
    <div className="mt-20 mx-auto w-full max-w-screen-lg">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Billing Details</h1>
        <form className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={billingDetails.fullName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Email:</label>
            <input
              type="email"
              name="email"
              value={billingDetails.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={billingDetails.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">City:</label>
            <input
              type="text"
              name="city"
              value={billingDetails.city}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Postal Code:</label>
            <input
              type="text"
              name="postalCode"
              value={billingDetails.postalCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700">Country:</label>
            <input
              type="text"
              name="country"
              value={billingDetails.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
        </form>
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                className="mr-2"
              />
              Credit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={() => setPaymentMethod('paypal')}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition duration-300"
          >
            Proceed to Pay ₹{totalCartValue.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
