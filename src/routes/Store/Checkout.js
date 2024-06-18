import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';

import { RazorpayLogo } from '../../assets/data/Imagedata'

function Checkout() {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({
        emailaddress: '',
        phonenumber: '',
        sex: '',
        address: '', // Include address field
    });

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [shippingAddress, setShippingAddress] = useState(user.address || '');
    const [paymentMethod] = useState('Credit Card');

    useEffect(() => {
        if (user.name) {
            const nameParts = user.name.split(' ');
            setFirstName(nameParts[0] || '');
            setLastName(nameParts.slice(1).join(' ') || '');
            setUserData({
                emailaddress: user.emailaddress,
                phonenumber: user.phonenumber || '',
                sex: user.sex || '',
                address: user.address || '',
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]); // Only run this effect when `user` changes

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        // Here you would handle order submission, e.g., sending the order to a server
        console.log('Order submitted:', {
            cart,
            shippingAddress,
            paymentMethod,
            userData,
        });
        alert('Order submitted successfully!');
        // Optionally, clear the cart and redirect the user
        localStorage.removeItem('cart');
        setCart([]);
    };

    const totalCartValue = cart.reduce((total, product) => total + product.price * product.quantity, 0);
    const shippingCharge = 150; // Example shipping charge
    const totalAmount = totalCartValue + shippingCharge;

    return (
        <div className="mt-20 mx-auto w-full max-w-screen-lg grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left side: Customer Details */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Your Details</h2>
                <div className="mb-6">
                    <div className="flex">
                        <div>
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                className="border-b border-gray-300 py-2 text-base text-black  w-full"
                            />
                        </div>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="border-b border-gray-300 py-2 text-base text-black  w-full ml-4"
                        />
                    </div>
                    <input
                        type="email"
                        name="emailaddress"
                        value={userData.emailaddress}
                        placeholder="Email"
                        className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
                        readOnly
                    />
                    <input
                        type="tel"
                        name="phonenumber"
                        value={userData.phonenumber}
                        onChange={(e) =>
                            setUserData((prevUserData) => ({
                                ...prevUserData,
                                phonenumber: e.target.value,
                            }))
                        }
                        placeholder="Phone Number"
                        className="border-b border-gray-300 py-2 text-base text-black mt-4 w-full"
                    />
                    <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Shipping Address</label>
                    <textarea
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Enter your shipping address..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        rows={4}
                        required
                    ></textarea>
                </div>
            </div>

            {/* Right side: Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6">Your Order</h2>
                {cart.length === 0 ? (
                    <p className="text-lg">Your cart is empty</p>
                ) : (
                    <>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                            <table className="min-w-full bg-white border-collapse rounded-lg">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                            Product
                                        </th>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product) => (
                                        <tr key={product.id} className="border-b border-gray-200">
                                            <td className="px-4 py-2 text-sm">{product.title}</td>
                                            <td className="px-4 py-2 text-sm">₹{(product.price * product.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="1" className="text-right font-semibold px-4 py-2">
                                            Subtotal:
                                        </td>
                                        <td className="px-4 py-2">₹{totalCartValue.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <td colSpan="1" className="text-right font-semibold px-4 py-2">
                                            Shipping:
                                        </td>
                                        <td className="px-4 py-2">₹{shippingCharge.toFixed(2)}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td colSpan="1" className="text-right font-semibold px-4 py-2">
                                            Total:
                                        </td>
                                        <td className="px-4 py-2">₹{totalAmount.toFixed(2)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-4">Payment Method</h3>
                            
                            <div className=" items-center mt-4">
                            <span>Razorpay Payment Solutions</span>
                                <img
                                    src={RazorpayLogo} // Replace with your image path
                                    alt="Razorpay Logo"
                                    className="h-8 mr-4"
                                />
                                
                            </div>
                        </div>
                    </>
                )}
            </div>

            <div className="col-span-2 flex justify-end">
                <button
                    type="submit"
                    onClick={handleOrderSubmit}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Place Order - ₹{totalAmount.toFixed(2)}
                </button>
            </div>
        </div>
    );
}

export default Checkout;
