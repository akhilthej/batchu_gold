import React, { useEffect, useState } from 'react';

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
                    {cart.map((product) => (
                        <div key={product.id} className="flex bg-white rounded-lg shadow-lg mb-4">
                            <img
                                src={`data:image/jpeg;base64,${product.image_data}`}
                                alt={product.title}
                                className="w-32 h-32 object-cover rounded-l-lg"
                            />
                            <div className="flex-1 p-4">
                                <h3 className="text-lg font-semibold">{product.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                                <p className="text-lg font-bold mb-2">${product.price}</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-sm text-gray-600">{product.product_catalogue}</p>
                                    <button
                                        onClick={() => removeFromCart(product)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>

                    
                    ))}
                    <div className="flex justify-end mt-6">
                        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;
