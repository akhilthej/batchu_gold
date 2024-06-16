import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/GlobalProvider'; // Replace with your authentication context or hook

function Checkout({ cart }) {
    const { user } = useAuth(); // Assuming your authentication hook or context

    const [userData, setUserData] = useState({
        name: '',
        emailAddress: '',
        phoneNumber: '',
        address: '',
        referralCode: '', // Default referral code
    });

    useEffect(() => {
        // Fetch user details from auth provider
        if (user) {
            setUserData({
                name: user.name || '',
                emailAddress: user.emailaddress || '',
                phoneNumber: user.phonenumber || '',
                address: user.address || '',
                referralCode: userData.referralCode || '',
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Calculate total price of all items in the cart
    const totalPrice = cart.reduce((total, product) => total + parseFloat(product.price) * product.quantity, 0);

    // Handle checkout and API call to store order
    const handleCheckout = () => {
        // Prepare order data
        const orderData = {
            status: 'Processing', // Initial status can be set here
            payment_id: 'Razorpay_payment_id_here', // Replace with actual payment ID from Razorpay
            amount: totalPrice.toFixed(2),
            products: cart.map(product => `product: ${product.title} quantity: ${product.quantity}`).join(', '),
            email: userData.emailAddress,
            phone: userData.phoneNumber,
            referral_code_order: userData.referralCode,
        };

        // API endpoint URL
        const apiUrl = 'https://batchugold.com/(apis)/checkout.php'; // Replace with your actual API endpoint

        // API call to store order data
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Order stored successfully:', data);
            // Optionally handle success or navigate to confirmation page
        })
        .catch(error => {
            console.error('Error storing order:', error);
            // Handle error, show message to user, etc.
        });
    };

    return (
        <div className="mt-20 mx-auto w-full max-w-screen-lg">
            <h2 className="text-2xl font-bold mb-6">Checkout</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border-collapse rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Product</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Quantity</th>
                            <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((product) => (
                            <tr key={product.id} className="border-b border-gray-200">
                                <td className="px-4 py-2 text-sm">{product.title}</td>
                                <td className="px-4 py-2 text-sm">${product.price}</td>
                                <td className="px-4 py-2 text-sm">{product.quantity}</td>
                                <td className="px-4 py-2 text-sm">${(product.price * product.quantity).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-end mt-6">
                <p className="text-lg font-bold">Total:</p>
                <p className="text-lg font-bold ml-2">${totalPrice.toFixed(2)}</p>
            </div>

            {/* Display user details form */}
            <div className="mt-6 border-t pt-6">
                <h3 className="text-xl font-bold mb-2">Your Details</h3>
                <form className="flex flex-col space-y-4">
                    <label className="text-sm font-semibold" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                        readOnly
                    />

                    <label className="text-sm font-semibold" htmlFor="emailAddress">Email Address</label>
                    <input
                        type="email"
                        id="emailAddress"
                        name="emailAddress"
                        value={userData.emailAddress}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                        readOnly
                    />

                    <label className="text-sm font-semibold" htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={userData.phoneNumber}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                    />

                    <label className="text-sm font-semibold" htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userData.address}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                    />

                    <label className="text-sm font-semibold" htmlFor="referralCode">Referral Code</label>
                    <input
                        type="text"
                        id="referralCode"
                        name="referralCode"
                        value={userData.referralCode}
                        onChange={handleInputChange}
                        className="px-4 py-2 border rounded"
                    />
                </form>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleCheckout}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
}

export default Checkout;
