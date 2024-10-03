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
        console.log(data, 'data from api');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  const handle = () => {
    return;
  };
  return (
    <>
      <section>
        {session ? (
          <span>{session.user.name}</span>
        ) : (
          <span>Please log in.</span>
        )}
        <Signout />
      </section>
      <section className="flex items-center justify-center  flex-col">
        <h2>Product List</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-50">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-blue-200 bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col items-center"
                style={{ maxWidth: '220px' }} // Smaller width for compact look
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded-lg mb-3 transition-opacity duration-300 hover:opacity-90"
                />
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-base font-semibold text-gray-800 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-gray-700 mb-2 text-sm">
                    Price:
                    <span className="font-bold text-blue-600">
                      ${product.price}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2 text-xs">
                    {product.description.substring(0, 50)}...
                  </p>
                  <p className="text-gray-600 mb-1 text-xs">
                    Category:
                    <span className="font-bold text-blue-600">
                      {product.category}
                    </span>
                  </p>
                  <p className="text-gray-600 mb-2 text-xs">
                    Rating:
                    <span className="font-bold text-blue-600">
                      {product.rating.rate} ({product.rating.count} reviews)
                    </span>
                  </p>

                  <button
                    className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md mt-3 hover:bg-blue-600 transition duration-300"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default UserInfo;
