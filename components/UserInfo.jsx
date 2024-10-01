'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import fetchProductsFromAPI from '@/utils/fetchProducts';
import Signout from './SignOut';

const UserInfo = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // Default products to an empty array
  const { data: session } = useSession();
  console.log('session', session);
  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await fetchProductsFromAPI();
        console.log(data, 'data fro api');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);
  return (
    <>
      <section>
        <h2>User Information</h2>
        {session ? (
          <span>{session.user.name}</span>
        ) : (
          <span>Please log in.</span>
        )}
        <Signout />
      </section>
      <section>
        <h2>Product List</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6 bg-white">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white rounded-lg shadow-md p-6 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                onClick={handle}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 transition-opacity duration-300 hover:opacity-90"
                />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {product.title}
                </h3>
                <p className="text-gray-700 mb-2">
                  Price:{' '}
                  <span className="font-bold text-gray-900">
                    ${product.price}
                  </span>
                </p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-gray-700 mb-2">
                  Category:{' '}
                  <span className="font-bold text-gray-900">
                    {product.category}
                  </span>
                </p>
                <p className="text-gray-700">
                  Rating:{' '}
                  <span className="font-bold text-gray-900">
                    {product.rating.rate}{' '}
                  </span>
                  ({product.rating.count} reviews)
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default UserInfo;
