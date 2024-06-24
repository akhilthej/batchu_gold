import React, { useEffect, useState } from 'react';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';
import { GoldCoin } from '../../assets/data/Imagedata';
import '../../components/Tools/Buttons.scss';

function GoldCoins() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [goldPrice, setGoldPrice] = useState(null);
    const goldpricelive = GOLD_LIVE_PRICE;

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

    const addToCart = (product) => {
        const existingProduct = cart.length > 0 ? cart[0] : null;
        if (existingProduct) {
            if (existingProduct.id !== product.id) {
                // If a different product exists in the cart, replace it with the new product
                const updatedCart = [{ ...product, quantity: quantities[product.id] || 1 }];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            } else {
                // If the same product exists, update its quantity
                const updatedCart = [{ ...existingProduct, quantity: existingProduct.quantity + (quantities[product.id] || 1) }];
                setCart(updatedCart);
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }
        } else {
            // If the cart is empty, add the new product
            const updatedCart = [{ ...product, quantity: quantities[product.id] || 1 }];
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

        const totalPrice = originalProductPrice + makingCharges + gst;

        return `₹${totalPrice.toFixed(2)}`;
    };

    return (
        <section className='my-20'>
            <h2 className="text-3xl font-bold mb-6 text-center">Gold Coins</h2>
            <img src={GoldCoin} alt="Gold" className=" md:w-[10%] w-[30%]  h-auto mx-auto pb-4" />
            <div className="container px-2 mx-auto flex">
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                            <div className="p-4">
                                <p className="text-[10px] text-white bg-yellow-400 w-14 text-center ">{product.product_catalogue}</p>
                                <p className="text-[10px] text-white bg-yellow-700 w-16 text-center">Weight: {product.weight}g</p>
                                <h3 className="text-[18px] font-semibold mb-2">{product.title}</h3>
                                <p className="text-[10px] font-bold text-gray-900 leading-tight">Know More</p>
                                <p className="text-[10px] text-gray-700 mb-2">{product.description}</p>
                                <p className="text-[10px] font-bold text-gray-900 leading-tight">Price</p>
                                <p className="text-[18px] font-bold text-gray-900 mb-2">{calculateTotalPrice(product)}</p>
                                <button className="button btn-cart" onClick={() => addToCart(product)}><span><span>Add to My Bag</span></span></button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default GoldCoins;
