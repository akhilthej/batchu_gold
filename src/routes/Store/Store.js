import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Store() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://batchugold.com/(apis)/Store/ProductPost.php');
                const data = await response.json();
                setProducts(data);
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
        const updatedCart = [...cart, { ...product, quantity: quantities[product.id] || 1 }];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    return (
        <div className="my-20 container mx-auto p-4">
            <h2 className="text-3xl font-bold m-6 text-center">Store</h2>
            <div className="flex justify-end mb-4">
                <Link to='/Store/cart' className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">View Cart</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`data:image/jpeg;base64,${product.image_data}`}
                            alt={product.title}
                            className="w-56 h-56 object-contain bg-center justify-center"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                            <p className="text-gray-700 mb-2">{product.description}</p>
                            <p className="text-lg font-bold text-gray-900 mb-2">₹{Number(product.price).toFixed(2)}</p>
                            <p className="text-sm text-gray-600 mb-2">Weight: {product.weight}g</p>
                            <p className="text-sm text-gray-600 mb-4">{product.product_catalogue}</p>
                            <div className="flex items-center mb-4">
                                <label className="mr-2 text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[product.id] || 1}
                                    onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
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
