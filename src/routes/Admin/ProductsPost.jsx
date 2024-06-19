import React, { useState, useEffect } from 'react';

function Productpost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [makingPercentage, setMakingPercentage] = useState(''); // Updated
    const [productCatalogue, setProductCatalogue] = useState('Gold Coin');
    const [weight, setWeight] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://batchugold.com/(apis)/Store/ProductPost.php');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('making_percentage', makingPercentage); // Updated
        formData.append('product_catalogue', productCatalogue);
        formData.append('weight', weight);
        formData.append('image', image);

        try {
            const response = await fetch('https://batchugold.com/(apis)/Store/ProductPost.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            console.log(data); // Display server response
            fetchProducts(); // Refresh product list after upload

            // Reset form after successful upload
            setTitle('');
            setDescription('');
            setMakingPercentage(''); // Updated
            setProductCatalogue('Gold Coin');
            setWeight('');
            setImage(null);
            document.getElementById('fileInput').value = null;

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`https://batchugold.com/(apis)/Store/ProductPost.php?id=${id}`, {
                method: 'DELETE'
            });

            const data = await response.text();
            console.log(data); // Display server response
            fetchProducts(); // Refresh product list after deletion

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='mt-20 container mx-auto p-4 my-20 grid grid-cols-1 gap-8 sm:grid-cols-2'>
            {/* Left side: Upload Product Form */}
            <div>
                <h2 className='text-2xl font-bold mb-6'>Upload Product</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className='p-2 border rounded'></textarea>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Making Percentage:</label> {/* Updated */}
                        <input type="number" value={makingPercentage} onChange={(e) => setMakingPercentage(e.target.value)} step="0.01" required className='p-2 border rounded' /> {/* Updated */}
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Product Catalogue:</label>
                        <select value={productCatalogue} onChange={(e) => setProductCatalogue(e.target.value)} required className='p-2 border rounded'>
                            <option value="Gold Coin">Gold Coin</option>
                            <option value="Silver Coin">Silver Coin</option>
                            <option value="Ear Rings">Ear Rings</option>
                        </select>
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Weight (g):</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} step="0.01" required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='font-semibold mb-1'>Image:</label>
                        <input id="fileInput" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className='p-2 border rounded' />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Upload Product</button>
                </form>
            </div>

            {/* Right side: Product List Table */}
            <div className='overflow-x-auto'>
                <h2 className='text-2xl font-bold mb-4'>Product List</h2>
                <table className='table-auto w-full'>
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className='p-2'>Title</th>
                            <th className='p-2'>Description</th>
                            <th className='p-2'>Making Percentage</th> {/* Updated */}
                            <th className='p-2'>Product Catalogue</th>
                            <th className='p-2'>Weight (g)</th>
                            <th className='p-2'>Image</th>
                            <th className='p-2'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className='border-b'>
                                <td className='p-2'>{product.title}</td>
                                <td className='p-2'>{product.description}</td>
                                <td className='p-2'>{product.making_percentage}%</td> {/* Updated */}
                                <td className='p-2'>{product.product_catalogue}</td>
                                <td className='p-2'>{product.weight}</td>
                                <td className='p-2'>
                                    <img
                                        src={`data:image/jpeg;base64,${product.image_data}`}
                                        alt={product.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className='p-2'>
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productpost;
