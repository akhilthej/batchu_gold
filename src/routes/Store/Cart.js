import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { useAuth } from '../../hooks/GlobalProvider';
import { Link } from 'react-router-dom';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

function Cart() {
    // Destructure user from the useAuth hook
    const { user } = useAuth();

    // State to manage cart items and gold price
    const [cart, setCart] = useState([]);
    const [goldPrice, setGoldPrice] = useState(null);
    const goldpricelive = GOLD_LIVE_PRICE;

    // Fetch cart items from local storage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Fetch gold price from the API on component mount
    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const response = await fetch(goldpricelive);
                const data = await response.json();
                if (data && data.length > 0) {
                    const goldData = data.find(item => item.product_name === 'Gold');
                    if (goldData) {
                        setGoldPrice(goldData.price);
                    }
                }
            } catch (error) {
                console.error('Error fetching gold price:', error);
            }
        };
        fetchGoldPrice();
    }, [goldpricelive]);

    // Function to remove a product from the cart
    const removeFromCart = (product) => {
        const updatedCart = cart.filter((item) => item.id !== product.id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Function to update the quantity of a product in the cart
    const updateQuantity = (product, newQuantity) => {
        if (newQuantity >= 0) {
            const updatedCart = cart.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // Save cart items to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Function to calculate the total price for a product
    const calculateTotalPrice = (product) => {
        if (!goldPrice) return 'Loading...';

        const goldPricePerGram = goldPrice / 1; // Assuming Live goldPrice is per gram
        const originalProductPrice = goldPricePerGram * product.weight; // Assuming goldPrice is per gram

        const makingCharges = (product.making_percentage / 100) * originalProductPrice;
        const gst = 0.03 * (originalProductPrice + makingCharges);

        const totalPrice = originalProductPrice + makingCharges + gst;

        return {
            totalPrice: totalPrice.toFixed(2),
            originalProductPrice: originalProductPrice.toFixed(2),
            makingCharges: makingCharges.toFixed(2),
            gst: gst.toFixed(2)
        };
    };

    // Calculate total cart value
    const totalCartValue = cart.reduce((total, product) => {
        const { totalPrice } = calculateTotalPrice(product);
        return total + (totalPrice * product.quantity);
    }, 0);

    return (
        <div className="my-20 mx-auto w-full max-w-screen-lg">
            <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-xl">Your cart is empty</p>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-collapse rounded-lg">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Product</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Raw Gold</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Making</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">GST (3%)</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Quantity</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">Subtotal</th>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => {
                                    const { totalPrice, originalProductPrice, gst } = calculateTotalPrice(product);
                                    return (
                                        <tr key={product.id} className="border-b border-gray-200">
                                            <td className="px-4 py-2 justify-center mx-auto">
                                                <img
                                                    src={`data:image/jpeg;base64,${product.image_data}`} // Assuming product.image contains base64 data
                                                    alt={product.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className='flex-col flex'>
                                                    <td className="pt-1 font-bold text-xs flex-col">{product.title}</td>
                                                    <td className="pb-1 font-medium text-xs"><span className='font-bold'>Price Per Coin:</span> ₹{totalPrice}</td>
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                                {(originalProductPrice * product.quantity)} ₹
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                               +
                                            </td>

                                            <td className="px-4 py-2 text-sm">{(product.making_percentage / 1)}%</td>
                                            <td className="px-4 py-2 text-sm">
                                               +
                                            </td>

                                            <td className="px-4 py-2 text-sm">{(gst * product.quantity)} ₹</td>
                                            <td className="px-4 py-2 text-sm">
                                               +
                                            </td>

                                            <td className="px-4 py-2 text-sm">
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-sm">
                                               =
                                            </td>

                                            <td className="px-4 py-2 text-sm">₹{(totalPrice * product.quantity).toFixed(2)}</td>
                                            <td className="px-4 py-2">
                                                <RiCloseCircleLine
                                                    className="h-6 w-6 text-red-500 cursor-pointer"
                                                    onClick={() => removeFromCart(product)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
                        <div className="flex justify-between items-center border-t border-gray-300 py-4">
                            <div>
                                <p className="text-lg font-semibold">Shipping:</p>
                                <p className="text-sm">{user.address}</p>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Total Cart Value:</p>
                                <p className="text-xl font-bold">₹{totalCartValue.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Link to="/Store/checkout">
                            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
