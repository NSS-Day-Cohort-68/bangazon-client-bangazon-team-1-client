import React, { useEffect, useState } from 'react';
import { getProducts } from '../../data/products';

function MyStore({ storeId }) {
    const [sellingProducts, setSellingProducts] = useState([]);
    const [soldProducts, setSoldProducts] = useState([]);

    useEffect(() => {
        getProducts(storeId, 'selling').then(data => {
            setSellingProducts(data);
        });

       getProducts(storeId, 'sold').then(data => {
            setSoldProducts(data);
        });
    }, [storeId]);

    return (
        <div>
            <h2>Selling</h2>
            <ul>
                {sellingProducts.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
            <h2>Sold</h2>
            <ul>
                {soldProducts.map(product => (
                    <li key={product.id}>{product.name} - Sold for ${product.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default MyStore;