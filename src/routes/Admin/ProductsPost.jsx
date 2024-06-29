import React, { useState, useEffect } from 'react';

function Productpost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [makingPercentage, setMakingPercentage] = useState('');
    const [referralCommission, setReferralCommission] = useState('');
    const [productCatalogue, setProductCatalogue] = useState('Gold Coin');
    const [weight, setWeight] = useState('');
    const [image, setImage] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://batchugold.com/apis/Store/ProductPost.php');
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
        formData.append('making_percentage', makingPercentage);
        formData.append('referral_commission', referralCommission);
        formData.append('product_catalogue', productCatalogue);
        formData.append('weight', weight);
        formData.append('image', image);

        try {
            const response = await fetch('https://batchugold.com/apis/Store/ProductPost.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            console.log(data);
            fetchProducts();
            resetForm();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`https://batchugold.com/apis/Store/ProductPost.php?id=${id}`, {
                method: 'DELETE'
            });

            const data = await response.text();
            console.log(data);
            fetchProducts();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setMakingPercentage('');
        setReferralCommission('');
        setProductCatalogue('Gold Coin');
        setWeight('');
        setImage(null);
        document.getElementById('fileInput').value = null;
    };

    return (
        <section className="p-4 my-20">
            <div className="mb-4">
                <h2 className='text-2xl font-bold mb-2'>Upload Product</h2>
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required className='p-2 border rounded'></textarea>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Making Percentage:</label>
                        <input type="number" value={makingPercentage} onChange={(e) => setMakingPercentage(e.target.value)} step="0.01" required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Referral Commission:</label>
                        <input type="number" value={referralCommission} onChange={(e) => setReferralCommission(e.target.value)} step="0.01" required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Product Catalogue:</label>
                        <select value={productCatalogue} onChange={(e) => setProductCatalogue(e.target.value)} required className='p-2 border rounded'>
                            <option value="Gold Coin">Gold Coin</option>
                            <option value="Silver Coin">Silver Coin</option>
                            <option value="Chains">Chains</option>
                            <option value="Blackbeads">Blackbeads</option>
                            <option value="Ear Tops and Hangings">Ear Tops and Hangings</option>
                            <option value="Finger Rings">Finger Rings</option>
                            <option value="Bangles">Bangles</option>
                            <option value="Bracelets and Kadas">Bracelets and Kadas</option>
                            <option value="Bajubandh">Bajubandh</option>
                            <option value="Necklaces">Necklaces</option>
                            <option value="Haram">Haram</option>
                            <option value="Vaddanam">Vaddanam</option>
                            <option value="Jadas">Jadas</option>
                            <option value="Light weight">Light weight</option>
                            <option value="Nose pin">Nose pin</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Bridal">Bridal</option>
                            <option value="Platinum">Platinum</option>
                            <option value="Ear Rings">Ear Rings</option>
                        </select>
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Weight (g):</label>
                        <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} step="0.01" required className='p-2 border rounded' />
                    </div>
                    <div className='flex flex-col mb-2'>
                        <label className='font-semibold'>Image:</label>
                        <input id="fileInput" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required className='p-2 border rounded' />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>Upload Product</button>
                </form>
            </div>

            <div className='mb-4'>
                <h2 className='text-2xl font-bold mb-2'>Product List</h2>
                <div className='overflow-x-auto'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='p-2'>Title</th>
                                <th className='p-2'>Description</th>
                                <th className='p-2'>Making Percentage</th>
                                <th className='p-2'>Referral Commission</th>
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
                                    <td className='p-2'>{product.making_percentage}%</td>
                                    <td className='p-2'>{product.referral_commission}%</td>
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
        </section>
    );
}

export default Productpost;
