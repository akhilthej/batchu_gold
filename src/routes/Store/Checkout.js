import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { RazorpayLogo } from '../../assets/data/Imagedata'; // Ensure this path is correct
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';
import { FaLock } from 'react-icons/fa';

function Checkout() {
    const { user } = useAuth();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [userData, setUserData] = useState({
        emailaddress: '',
        phonenumber: '',
        sex: '',
        address: '', // Include address field
    });

    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const [shippingAddress, setShippingAddress] = useState(user.address || '');
    const [goldPrice, setGoldPrice] = useState(null);
    const goldpricelive = GOLD_LIVE_PRICE;

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
    }, [user]); // Only run this effect when `user` changes

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

    const handleReferralCodeChange = (e) => {
        const code = e.target.value;
        setReferralCode(code);
    };

    const handlePayment = () => {
        const options = {
            key: 'rzp_test_qjbYOaA0BlqnRS', // Replace with your Razorpay test key
            amount: totalAmount * 100, // Amount is in paisa (100 times of amount in currency)
            currency: 'INR',
            name: 'Gold Buying App',
            description: 'Gold purchase',
            handler: function (response) {
                alert('Payment successful. Payment ID: ' + response.razorpay_payment_id);

                if (totalAmount >= 2000 && referralCode) {
                    // Call the backend to handle the referral payment
                    fetch('https://batchugold.com/(apis)/Store/Orders.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            payment_id: response.razorpay_payment_id,
                            amount: totalAmount,
                            referral_code: referralCode,
                            email: user.emailaddress,
                            phone: user.phonenumber,
                            notes: {
                                address: 'Gold Buying App Corporate Office',
                                referral_code_gold: referralCode,
                                product_type: 'Store', // Set product_type dynamically
                                products: 'Items', // Set products dynamically
                            },
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            alert('Referral bonus processed successfully');
                        } else {
                            alert('Failed to process referral bonus');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
            },
            prefill: {
                name: `${firstName} ${lastName}`,
                email: user.emailaddress,
                contact: user.phonenumber,
            },
            notes: {
                address: user.address,
                referral_code_gold: referralCode,
            },
            theme: {
                color: '#3399cc',
            },
            modal: {
                ondismiss: function () {
                    alert('Payment process cancelled.');
                },
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const calculateTotalPrice = (product) => {
        if (!goldPrice) return 0;

        const goldPricePerGram = goldPrice / 1; // Assuming Live goldPrice is per gram
        const originalProductPrice = goldPricePerGram * product.weight; // Assuming goldPrice is per gram

        const makingCharges = (product.making_percentage / 100) * originalProductPrice;
        const gst = 0.03 * (originalProductPrice + makingCharges);

        const totalPrice = originalProductPrice + makingCharges + gst;

        return Math.round(totalPrice); // Return the total price rounded to the nearest whole number
    };

    const totalCartValue = cart.reduce((total, product) => {
        const totalPrice = calculateTotalPrice(product);
        return total + (totalPrice * product.quantity);
    }, 0);

    const shippingCharge = 150; // Example shipping charge
    const totalAmount = totalCartValue + shippingCharge;

    return (
        <section>
        <div className="py-20 mx-auto w-full grid grid-cols-1 gap-8 md:grid-cols-2">
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
                    <label className="block mb-2 text-gray-700">Referral Code:</label>
                    <input
                        type="text"
                        value={referralCode}
                        onChange={handleReferralCodeChange}
                        className="w-full px-3 py-2 mb-4 border rounded"
                    />
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
                                            Raw Gold
                                        </th>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                            Making
                                        </th>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                            GST 3%
                                        </th>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                        Quantity
                                        </th>
                                        <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700 uppercase">
                                            Subtotal
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((product) => {
                                        const totalPrice = calculateTotalPrice(product);
                                        const originalProductPrice = Math.round((goldPrice / 1) * product.weight); // Assuming goldPrice is per gram
                                        const makingCharges = Math.round((product.making_percentage / 100) * originalProductPrice);
                                        const gst = Math.round(0.03 * (originalProductPrice + makingCharges));
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
                                                    <td className="pb-1 font-medium text-xs"><span className='font-bold'>Price Per Coin:</span> ₹{(totalPrice)}</td>
                                                </div>
                                            </td>

                                            <td className="px-4 py-2 text-sm"> {(originalProductPrice * product.quantity)} ₹</td>
                                            <td className="px-4 py-2 text-sm">{(makingCharges * product.quantity)} ₹</td>
                                            <td className="px-4 py-2 text-sm">{(gst * product.quantity)} ₹</td>
                                            <td className="px-4 py-2 text-sm">{product.quantity}</td>
                                            <td className="px-4 py-2 text-sm">₹{(totalPrice * product.quantity)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="5" className="text-right font-semibold px-4 py-2">
                                            Subtotal:
                                        </td>
                                        <td className="px-4 py-2">₹{Math.round(totalCartValue)}</td>
                                    </tr>
                                    <tr>
                                    
                                        <td colSpan="5" className="text-right font-semibold px-4 py-2">
                                            Shipping:
                                        </td>
                                        <td className="px-4 py-2">₹{shippingCharge}</td>
                                    </tr>
                                    <tr className="bg-gray-200">
                                        <td colSpan="5" className="text-right font-semibold px-4 py-2">
                                            Total:
                                        </td>
                                        <td className="px-4 py-2">₹{Math.round(totalAmount)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        
                    </>
                )}
            </div>

           
            <div className="flex z-50 fixed w-full bottom-0 bg-white h-[70px]">
      <div className="w-1/2  flex items-center justify-center">
      <div className='text-center'>
      <h3 className='text-xs font-semibold -mb-2'>Payment Method</h3>
            <img src={RazorpayLogo} // Replace with your image path
                alt="Razorpay Logo"
                className="h-7"/>
            <span className="text-gray-700 text-xs">Razorpay Payment Solutions</span>
      </div></div>

      <button type="submit"
                onClick={handlePayment} className="w-1/2 bg-yellow-500  hover:bg-orange-600 transition duration-300 flex items-center justify-center">
      <div>
         
            <div className="text-white font-bold text-sm flex flex-col items-center"
            > <FaLock className="text-white mb-1 mx-auto" />
                <span>Place Order - ₹{Math.round(totalAmount)}</span>
            </div>
            </div>
      </button>
    </div>



        </div>

       
       
        </section>
    );
}

export default Checkout;
