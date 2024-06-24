import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Use axios for HTTP requests

const PaymentSuccess = () => {
    const [paymentDetails, setPaymentDetails] = useState(null);

    useEffect(() => {
        // Fetch payment details from backend
        const fetchPaymentDetails = async () => {
            try {
                // Make a GET request to fetch payment details from your backend
                const response = await axios.get('https://batchugold.com/apis/PhonePe/DigitalGold/callback.php');

                // Assuming the response contains payment details in JSON format
                setPaymentDetails(response.data);
            } catch (error) {
                console.error('Error fetching payment details:', error);
            }
        };

        fetchPaymentDetails();
    }, []); // Empty dependency array to fetch data only once when component mounts

    return (
        <div className="p-5 flex flex-col items-center justify-center bg-gray-100 min-h-screen">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Payment Success</h1>
                {paymentDetails ? (
                    <div>
                        <p>Merchant ID: {paymentDetails.data?.merchantId}</p>
                        <p>Transaction ID: {paymentDetails.data?.transactionId}</p>
                        <p>Status: {paymentDetails.data?.status}</p>
                        {/* Add more fields as necessary */}
                    </div>
                ) : (
                    <p>Loading payment details...</p>
                )}
            </div>
        </div>
    );
};

export default PaymentSuccess;
