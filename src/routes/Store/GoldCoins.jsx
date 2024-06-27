import React, { useEffect, useState } from 'react';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

import { GoldCoin,Guarantee,StoreGoldCoinBG } from '../../assets/data/Imagedata';
import '../../components/Tools/Buttons.scss';
import { Link } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { RiStore3Fill } from 'react-icons/ri';

function GoldCoins() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [goldPrice, setGoldPrice] = useState(null);
    const goldpricelive = GOLD_LIVE_PRICE;


        const [showPopup, setShowPopup] = useState(false);
      
        const handleIconClick = () => {
          setShowPopup(!showPopup);
        };


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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://batchugold.com/apis/Store/ProductPost.php');
                const data = await response.json();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
    };

    const addToCart = () => {
        if (!selectedProduct) return;
        const existingProduct = cart.length > 0 ? cart[0] : null;
        if (existingProduct) {
            if (existingProduct.id !== selectedProduct.id) {
                const updatedCart = [{ ...selectedProduct, quantity: quantities[selectedProduct.id] || 1 }];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } else {
                const updatedCart = [{ ...existingProduct, quantity: existingProduct.quantity + (quantities[selectedProduct.id] || 1) }];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } else {
            const updatedCart = [{ ...selectedProduct, quantity: quantities[selectedProduct.id] || 1 }];
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    const calculateTotalPrice = (product) => {
        if (!goldPrice) return 'Loading...';

        const goldPricePerGram = goldPrice / 1;
        const originalProductPrice = goldPricePerGram * product.weight;

        const makingCharges = (product.making_percentage / 100) * originalProductPrice;
        const gst = 0.03 * (originalProductPrice + makingCharges);


        const totalPrice = originalProductPrice + makingCharges + gst ;

        return `₹${totalPrice.toFixed(2)}`;
    };

    return (
        <section className="min-h-screen flex items-center justify-center overflow-hidden"  style={{
              backgroundImage:
      `url("${StoreGoldCoinBG}")`,
      backgroundSize: "contain",
      backgroundPosition: "top",
          }}>

        <section className='my-20'>
            <h2 className="text-[50px] text-yellow-500 font-bold text-center bg-white/80">GOLD COIN</h2>
            <p className="text-[18px] text-center font-bold text-yellow-900 bg-white/80">Save Earn & Grow</p>
            <p className="text-[16px] text-center text-yellow-900 bg-white/80">Get 100% Referral Commission on every purchase. </p>
            
            
            <div >
            <img src={GoldCoin} alt="Gold" className=" md:w-[10%] w-[30%]  h-auto mx-auto m-4" />
            
            
            </div>


            <div className="flex w-full items-center justify-center">
     
      </div>


            <div className="px-2 mx-auto flex">
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className={`bg-white rounded-lg shadow-md overflow-hidden ${selectedProduct && selectedProduct.id === product.id ? 'border-2 border-yellow-500' : ''}`} onClick={() => handleProductSelect(product)}>
                            <div className="p-4">
                                <p className="text-[10px] text-white bg-yellow-400 w-14 text-center ">{product.product_catalogue}</p>
                                <p className="text-[10px] text-white bg-yellow-700 w-16 text-center">Weight: {product.weight}g</p>
                                <h3 className="text-[18px] font-semibold mb-2">{product.title}</h3>
                                <p className="text-[12px] font-bold text-gray-900 leading-tight">Purity: 24 karat (99.9)</p>
                               

                                <div className="relative">

      <p className="text-[10px] font-bold text-gray-900 leading-tight mt-2">
        Know More 
        <FontAwesomeIcon 
          icon={faInfoCircle} 
          className="w-3 cursor-pointer ml-1" 
          onClick={handleIconClick} 
        />
      </p>
      {showPopup && (
        <div className="absolute top-1 left-0 bg-white p-2 shadow-lg border border-gray-300 rounded">
        <p className="text-[10px] text-black font-bold  z-10">Charges Includes</p>
        <p className="text-[10px] text-gray-700  z-10">{product.description}</p>
          <button 
            className=" text-xs text-yellow-600"
            onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}
    </div>
                <p className="text-[10px] font-bold text-gray-900 leading-tight">Referral Commission</p>
                                <p className="text-[10px] text-gray-700 mb-2">On each Coin Purchase Get Flat : <br/>{product.referral_commission}% Commission. </p>
                                <p className="text-[10px] font-bold text-gray-900 leading-tight">Price</p>
                                <p className="text-[18px] font-bold text-gray-900 mb-2">{calculateTotalPrice(product)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className=' bg-white/80 p-2'>
            <img src={Guarantee} alt="Gold" className=" md:w-[20%] w-[50%]  h-[50%] mx-auto pt-2" />
            <p className="text-[8px] font-bold text-gray-900 leading-tight text-center pt-2">Introducing the exclusive 0.5 Grams Pure Gold Coin by "The Gold Jar" – a symbol of luxury and refinement. Crafted with precision and elegance, this exquisite coin exudes timeless beauty and sophistication. Properly packed. Elevate your collection with this rare and precious piece, showcasing the finest craftsmanship and purity of gold. Whether as a valuable investment or a cherished gift, experience the epitome of opulence with this exclusive gold coin from "The Gold Jar."</p>
            </div>

            {selectedProduct && (
                <div className="flex z-50 fixed w-full bottom-0 bg-white h-[80px] drop-shadow-xl">


      <div className="w-1/2  flex items-center  justify-center ">
      <div className='text-center'>    
      <Link to="/Store"><div className=' rounded-l-lg text-black'><RiStore3Fill className="h-6 w-8 text-black  mx-auto" /></div></Link>
      <Link to='/Store'><button className='"text-gray-700 text-xs'>BACK TO STORE</button></Link>
      <p className="text-xl font-bold"></p>
      </div></div>

      
      <button className="w-1/2  flex items-center bg-yellow-500 hover:bg-orange-600 transition duration-300  justify-center " onClick={addToCart}>
      <Link to="/Store/cart">
      <button className="flex items-center justify-center text-white ">
         Add to Bag
      </button>
    </Link>
      </button>

    </div>

               
            )}
        </section>

        </section>
    );
}

export default GoldCoins;
