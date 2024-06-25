import React, { useEffect, useState } from 'react';
import { RiCloseCircleLine,RiHome2Line,RiShoppingCartLine, RiStore3Fill } from 'react-icons/ri';
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
            totalPrice: Math.round(totalPrice),
            originalProductPrice: Math.round(originalProductPrice),
            makingCharges: Math.round(makingCharges),
            gst: Math.round(gst)
        };
    };

    // Calculate total cart value
    const totalCartValue = cart.reduce((total, product) => {
        const { totalPrice } = calculateTotalPrice(product);
        return total + (totalPrice * product.quantity);
    }, 0);

    return (
        <section>
        <div className="my-20 mx-auto w-full max-w-screen-lg">
        <div className='flex justify-between'>
         <Link to="/"><div className='bg-yellow-500 p-2 rounded-r-lg text-white'> <RiHome2Line className="h-6 w-8 text-white text-center mx-auto" /> <p className='text-[8px] text-center'>HOME</p></div></Link>
            <h2 className="text-3xl font-bold mb-6 text-center">CART</h2>
            <Link to="/Store"><div className='bg-yellow-500 p-2 rounded-l-lg text-white'><RiStore3Fill className="h-6 w-8 text-white  mx-auto" /><p className='text-[8px] text-center'>STORE</p></div></Link></div>
            
            {cart.length === 0 ? (
                <p className="text-sm">Your cart is empty</p>
            ) : (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border-collapse rounded-lg">
                            <thead className="bg-yellow-500">
                                <tr>
                                    <th className="border-b-2 border-gray-300 px-4 py-2 text-left text-sm font-semibold text-white uppercase">Product</th>
                                    <th className="border-b-2 border-gray-300 py-2 text-left text-sm font-semibold  text-white uppercase">Quantity</th>
                                    <th className="border-b-2 border-gray-300 py-2 text-left text-sm font-semibold  text-white uppercase">Subtotal</th>
                                    <th className="border-b-2 border-gray-300 py-2 text-left text-sm font-semibold  text-white uppercase"></th>
                                </tr>
                            </thead>


                            <tbody>
                                {cart.map((product) => {
                                    const { totalPrice, originalProductPrice, gst, makingCharges } = calculateTotalPrice(product);
                                    return (
                                        <tr key={product.id} className="border-b border-gray-200">
                                            <td className=" p-2  justify-center mx-auto">
                                                <img src={`data:image/jpeg;base64,${product.image_data}`} // Assuming product.image contains base64 data
                                                    alt={product.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <div className='flex-col flex'>
                                                    <td className="pt-1 font-bold text-xs flex-col">{product.title}</td>
                                                    <td className="pb-1 font-medium text-xs"><span className='font-bold'>Per Coin:</span> ₹{totalPrice}</td>
                                                    <td className="pt-1 font-bold text-xs flex-col">Referral Commission: {product.referral_commission} %</td>
                                                </div>
                                            </td>
                                       

                                           

                                            <td className="text-sm">
                                                <input
                                                    type="number"
                                                    value={product.quantity}
                                                    onChange={(e) => updateQuantity(product, parseInt(e.target.value))}
                                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                                                />
                                            </td>
                                           

                                            <td className="text-sm">₹{(totalPrice * product.quantity)}</td>
                                            <td className="">
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
                    
                   
                      
                  
                            <div className='mt-10'>
                                <p className="text-lg font-semibold p-2">Shipping:</p>
                                <div className="flex justify-between items-center border-t border-gray-300 p-2" />
                               
                                <p className="text-sm">{user.address}</p>
                            </div>
                </div>
            )}
        </div>


        <div className="flex z-50 fixed w-full bottom-0 bg-white h-[70px] drop-shadow-xl">

      <div className="w-1/2  flex items-center  justify-center">
      <div className='text-center'>
      <span className='"text-gray-700 text-sm'>Total Cart Value</span>
      <p className="text-xl font-bold">₹{Math.round(totalCartValue)}</p>
      </div></div>

      <button className="w-1/2  flex items-center bg-yellow-500 hover:bg-orange-600 transition duration-300  justify-center">
      <Link to="/Store/checkout">
      <button className="flex items-center justify-center text-white ">
        <RiShoppingCartLine className="h-6 w-8 text-white" />
         Checkout
      </button>
    </Link>
      </button>
    </div>

        </section>
    );
}

export default Cart;