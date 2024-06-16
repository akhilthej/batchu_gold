import React, { useState } from 'react';

function Productpost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [productCatalogue, setProductCatalogue] = useState('Gold Coin');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('product_catalogue', productCatalogue);
        formData.append('image', image);

        try {
            const response = await fetch('https://batchugold.com/(apis)/ProductPost.php', {
                method: 'POST',
                body: formData
            });

            const data = await response.text();
            console.log(data); // Display server response

            // Reset form after successful upload
            setTitle('');
            setDescription('');
            setPrice('');
            setProductCatalogue('Gold Coin');
            setImage(null);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='mt-20'>
            <h2>Upload Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} step="0.01" required />
                </div>
                <div>
                    <label>Product Catalogue:</label>
                    <select value={productCatalogue} onChange={(e) => setProductCatalogue(e.target.value)} required>
                        <option value="Gold Coin">Gold Coin</option>
                        <option value="Silver Coin">Silver Coin</option>
                        <option value="Ear Rings">Ear Rings</option>
                    </select>
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <button type="submit">Upload Product</button>
            </form>
        </div>
    );
}

export default Productpost;
