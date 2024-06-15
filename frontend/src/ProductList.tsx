import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get('/api/products')
      .then(response => setProducts(response.data))
      .catch(err => setError('Failed to fetch products'));
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <strong>{product.name}</strong>: ${product.price.toFixed(2)} - {product.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
