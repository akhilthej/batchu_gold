import React, { useEffect, useState } from 'react';
import { GOLD_LIVE_PRICE } from '../../hooks/APIHooks';

function Store() {
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
                // Assuming the API response has a structure like { price: 8000 }
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
                const response = await fetch('https://batchugold.com/(apis)/Store/ProductPost.php');
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
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + (quantities[product.id] || 1) }
                    : item
            );
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            const updatedCart = [...cart, { ...product, quantity: quantities[product.id] || 1 }];
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

        // Calculate total price including making charges and GST
        const goldPricePerGram = goldPrice / 1; // Assuming Live goldPrice is per gram
        const OriginalProductPrice = goldPricePerGram*product.weight; // Assuming goldPrice is per gram

        const makingCharges = (product.making_percentage / 100) *OriginalProductPrice;

        const gst = 0.03 * (OriginalProductPrice + makingCharges);

        const totalPrice = OriginalProductPrice + makingCharges + gst;

        return `₹${totalPrice.toFixed(2)}`;
    };

    return (
        <div className="my-20 container mx-auto p-4 flex">
            <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`data:image/jpeg;base64,${product.image_data}`}
                            alt={product.title}
                            className="w-full h-56 object-contain bg-center"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-lg font-bold text-gray-900 mb-2">Making Charges: {product.making_percentage} %</p>

                            <div className="flex flex-row">
                                <span className="text-black font-bold text-[9px] sm:text-xs leading-tight">
                                    {'Live Gold Price'}
                                </span>
                                <span className="text-red-500 font-bold text-[12px] md:text-sm leading-tight pl-2">
                                    {goldPrice !== null ? `₹${goldPrice.toFixed(2)}/gm` : 'Loading...'}
                                </span>
                            </div>

                            <p className="text-lg font-bold text-gray-900 mb-2">
                                Price: {calculateTotalPrice(product)}
                            </p>

                            <p className="text-sm text-gray-600 mb-2">Weight: {product.weight}g</p>
                            <p className="text-sm text-gray-600 mb-4">{product.product_catalogue}</p>
                            <div className="flex items-center mb-4">
                                <label className="mr-2 text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Store;
