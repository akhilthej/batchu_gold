import React, { useEffect, useState } from 'react';

function Store() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [sortOrder, setSortOrder] = useState('');
    const [catalogueFilter, setCatalogueFilter] = useState('');
    const [weightFilter, setWeightFilter] = useState('');

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

    const handleSortOrderChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        let sortedProducts = [...filteredProducts];

        if (order === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (order === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(sortedProducts);
    };

    const handleCatalogueFilterChange = (e) => {
        const catalogue = e.target.value;
        setCatalogueFilter(catalogue);
        filterProducts(catalogue, weightFilter);
    };

    const handleWeightFilterChange = (e) => {
        const weight = e.target.value;
        setWeightFilter(weight);
        filterProducts(catalogueFilter, weight);
    };

    const filterProducts = (catalogue, weight) => {
        let filtered = [...products];

        if (catalogue) {
            filtered = filtered.filter(product => product.product_catalogue === catalogue);
        }

        if (weight) {
            filtered = filtered.filter(product => product.weight === parseInt(weight, 10));
        }

        setFilteredProducts(filtered);
    };

    useEffect(() => {
        filterProducts(catalogueFilter, weightFilter);
    }, [products, catalogueFilter, weightFilter]);

    return (
        <div className="my-20 container mx-auto p-4 flex">
            <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Filters</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Sort by Price</label>
                    <select
                        value={sortOrder}
                        onChange={handleSortOrderChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select</option>
                        <option value="low-to-high">Low to High</option>
                        <option value="high-to-low">High to Low</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Product Catalogue</label>
                    <select
                        value={catalogueFilter}
                        onChange={handleCatalogueFilterChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    >
                        <option value="">All</option>
                        {[...new Set(products.map(product => product.product_catalogue))].map(catalogue => (
                            <option key={catalogue} value={catalogue}>{catalogue}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Weight (g)</label>
                    <input
                        type="number"
                        value={weightFilter}
                        onChange={handleWeightFilterChange}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
            <div className="w-3/4 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <p className="text-lg font-bold text-gray-900 mb-2">₹{Number(product.price).toFixed(2)}</p>
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
