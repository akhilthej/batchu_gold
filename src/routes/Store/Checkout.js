import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/GlobalProvider';
import { PhonepeLogo } from '../../assets/data/Imagedata'; // Ensure this path is correct
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
    const [street, setStreet] = useState(user.address || '');
    const [city, setCity] = useState('');
    const [pincode, setPincode] = useState('');

    const [goldPrice, setGoldPrice] = useState(null);
    const goldpricelive = GOLD_LIVE_PRICE;

    // Timer state
    const [timer, setTimer] = useState(120); // 120 seconds = 2 minutes

    useEffect(() => {
        // Countdown timer
        const countdown = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);

        // Redirect when timer hits zero
        if (timer === 0) {
            clearInterval(countdown);
            window.location.href = '/Store'; // Redirect to '/Store' when timer reaches zero
        }

        // Cleanup interval on unmount or timer change
        return () => clearInterval(countdown);
    }, [timer]);

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
    }, [user]);

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
        setReferralCode(e.target.value);
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

    const [formData, setFormData] = useState({
        merchantTransactionId: '',
        merchantUserId: 'MUID' + Date.now(),
        amount: totalAmount,
        merchantOrderId: user.name,
        mobileNumber: user.phonenumber,
        message: 'Order From Store | Address:' + shippingAddress,
        email: user.emailaddress,
        shortName: 'BAT_StoreOrders',
        orderlist: '', // Initialize as empty string
        referralCode: '', // Initialize as empty string
    });

    useEffect(() => {
        // Update orderlist whenever cart changes
        const orderlist = cart.map(product => `${product.title} - Quantity: ${product.quantity}`).join(', ');
        setFormData(prevFormData => ({
            ...prevFormData,
            orderlist,
        }));
    }, [cart]);

    useEffect(() => {
        // Update referralCode and amount whenever they change
        setFormData(prevFormData => ({
            ...prevFormData,
            amount: totalAmount,
            referralCode,
        }));
    }, [totalAmount, referralCode]);

    const handlePayment = async (e) => {
        e.preventDefault();
      
        try {
          // Generate a unique transaction ID
          const transactionId = `${'MUID'}${Date.now()}`;
      
          const response = await fetch('https://batchugold.com/apis/PhonePe/Store/PhonePe.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ...formData,
              merchantTransactionId: transactionId,
            })
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

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        if (name === 'street') {
            setStreet(value);
        } else if (name === 'city') {
            setCity(value);
        } else if (name === 'pincode') {
            setPincode(value);
        }
        setShippingAddress(`${street}, ${city}, ${pincode}`);
    };

    return (
        <section className='overflow-hidden'>
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
                                    className="border-b border-gray-300 py-2 text-base text-black w-full"
                                />
                            </div>
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                className="border-b border-gray-300 py-2 text-base text-black w-full ml-4"
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
                        <input
                            type="text"
                            name="street"
                            value={street}
                            onChange={handleAddressChange}
                            placeholder="Street"
                            className="border-b border-gray-300 py-2 text-base text-black mt-1 w-full"
                        />
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={handleAddressChange}
                            placeholder="City"
                            className="border-b border-gray-300 py-2 text-base text-black mt-1 w-full"
                        />
                        <input
                            type="text"
                            name="pincode"
                            value={pincode}
                            onChange={handleAddressChange}
                            placeholder="Pincode"
                            className="border-b border-gray-300 py-2 text-base text-black mt-1 w-full"
                        />
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

                    {/* Timer display */}
                    <div className="text-center mt-4 text-[12px] bg-red-500">
                        <p className="text-white">Redirecting to Store in {timer} seconds...</p>
                    </div>

                    {cart.length === 0 ? (
                        <p className="text-lg">Your cart is empty</p>
                    ) : (
                        <>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                                <table className="min-w-full bg-white border-collapse rounded-lg">
                                    <tbody>
                                        {cart.map((product) => {
                                            const totalPrice = calculateTotalPrice(product);
                                            const originalProductPrice = Math.round((goldPrice / 1) * product.weight); // Assuming goldPrice is per gram
                                            const makingCharges = Math.round((product.making_percentage / 100) * originalProductPrice);
                                            const gst = Math.round(0.03 * (originalProductPrice + makingCharges));
                                            return (
                                                <tr key={product.id} className="border-b border-gray-200">
                                                    <td className="justify-center mx-auto">
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
                                                    <div className='flex-col flex py-2'>
                                                        <td className="text-[10px] bg-yellow-400 text-center font-bold">PureGold (24K)</td>
                                                        <span className='text-sm bg-white font-bold text-center'> {(originalProductPrice * product.quantity)} ₹</span>
                                                        <td className="text-[10px] bg-yellow-600 text-center text-white">Quantity :<span className=' font-bold'> {product.quantity}</span> </td>
                                                        <td className="text-[10px] bg-yellow-400 text-center mt-2 font-bold">Charges</td>
                                                        <span className='text-sm font-bold text-center'> {(makingCharges * product.quantity)} ₹</span>

                                                        <td className="text-[8px] font-bold text-center">Which includes</td>
                                                        <td className="text-[10px] bg-yellow-400 p-2 text-left">
                                                            <li>Making Charges +</li>
                                                            <li>Payment Gateway +</li>
                                                            <li>Vault Charges +</li>
                                                            <li>Insurance +</li>
                                                            <li>Handling Charges +</li>
                                                            <li>Referral commission {product.referral_commission}% = ₹{Math.round(((product.referral_commission) * totalAmount) / 100)} </li>

                                                        </td>

                                                        <td className="text-[10px] bg-yellow-600 text-center font-bold">GST <span className='text-white'>(3%) </span></td>
                                                        <span className='text-sm font-bold text-center'> {(gst * product.quantity)} ₹</span>
                                                    </div>
                                                    <td className="text-[10px] font-bold text-center">SUBTOTAL<br /><span className='text-sm font-bold'> ₹{(totalPrice * product.quantity)}</span> </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="2" className="text-right font-semibold px-4 py-2">
                                                Subtotal:
                                            </td>
                                            <td className="px-4 py-2">₹{Math.round(totalCartValue)}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan="2" className="text-right font-semibold px-4 py-2">
                                                Shipping:
                                            </td>
                                            <td className="px-4 py-2">₹{shippingCharge}</td>
                                        </tr>
                                        <tr className="bg-gray-200">
                                            <td colSpan="2" className="text-right font-semibold px-4 py-2 bg-yellow-600 ">
                                                Total :
                                            </td>
                                            <td className="px-4 py-2 bg-yellow-400  ">₹{Math.round(totalAmount)}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex z-50 fixed w-full bottom-0 bg-white  h-[80px]">
                    <div className="w-1/2 flex items-center justify-center">
                        <div className='text-center'>
                            <h3 className='text-[10px] font-semibold -mb-1'>Payment Method</h3>
                            <img src={PhonepeLogo} // Replace with your image path
                                alt="Phonepe"
                                className="h-10" />
                            <span className="text-gray-700 text-xs">UPI Payment Solutions</span>
                        </div>
                    </div>
                    <button type="submit"
                        onClick={handlePayment} className="w-1/2 bg-yellow-500 hover:bg-orange-600 transition duration-300 flex items-center justify-center">
                        <div>
                            <div className="text-white font-bold text-sm flex flex-col items-center">
                                <FaLock className="text-white mb-1 mx-auto" />
                                <span>Place Order <br /><span>₹{Math.round(totalAmount)}</span></span>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

        </section>
    );
}

export default Checkout;
