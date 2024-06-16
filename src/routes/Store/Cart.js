import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        // Fetch the cart items from local storage if they exist
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (product) => {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const updateQuantity = (product, newQuantity) => {
        const updatedCart = cart.map((item) => {
            if (item.id === product.id) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    useEffect(() => {
        // Save cart items to local storage whenever it changes
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <div className="mt-20 mx-auto w-full max-w-screen-lg">
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-xl">Your cart is empty</p>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-collapse rounded-lg">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Product</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Quantity</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Subtotal</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-200">
                                        <td className="px-4 py-2 text-sm">{product.title}</td>
                                        <td className="px-4 py-2 text-sm">${product.price}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <input
                                                type="number"
                                                value={product.quantity}
                                                onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-sm">${(product.price * product.quantity).toFixed(2)}</td>
                                        <td className="px-4 py-2">
                                            <RiCloseCircleLine
                                                className="h-6 w-6 text-red-500 cursor-pointer"
                                                onClick={() => removeFromCart(product)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end mt-6">
                        <a href="/Store/checkout">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                Proceed to Checkout
                            </button>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
