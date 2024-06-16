import React, { useEffect, useState } from 'react';

function Store() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState(1); // State to manage quantity input

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://batchugold.com/(apis)/ProductPost.php');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        // Load cart items from local storage if they exist
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const addToCart = (product) => {
        const updatedCart = [...cart, { ...product, quantity }]; // Include quantity in cart item
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    return (
        <div className="mt-20">
            <h2>Store</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg shadow-lg p-4">
                        <img
                            src={`data:image/jpeg;base64,${product.image_data}`}
                            alt={product.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold">{product.title}</h3>
                            <p>{product.description}</p>
                            <p className="text-lg font-semibold">${product.price}</p>
                            <p className="text-sm text-gray-600">{product.product_catalogue}</p>
                            <div className="flex items-center mt-4">
                                <label htmlFor={`quantity-${product.id}`} className="mr-2">Quantity:</label>
                                <input
                                    id={`quantity-${product.id}`}
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                onClick={() => addToCart(product)}
                                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
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
