'use client';

import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import fetchProductsFromAPI from '@/utils/fetchProducts';

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
        <button
          className="btn btn-outline-danger fixed top-0 right-0 m-3"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </section>
      <section>
        <h2>Product List</h2>
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product, index) => (
            <section>
              <h2 className="text-2xl font-bold mb-4">Product List</h2>
              {isLoading ? (
                <p className="text-lg text-gray-600">Loading products...</p>
              ) : products.length === 0 ? (
                <p className="text-lg text-gray-600">No products available.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 m-2">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="border shadow-lg rounded-lg p-4 transition-transform duration-200 hover:scale-105"
                    >
                      <img
                        src={product.productImage}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-2"
                      />
                      <h3 className="text-xl font-semibold">{product.title}</h3>
                      <p className="text-gray-700">
                        Price:{' '}
                        <span className="font-bold">${product.price}</span>
                      </p>
                      <p className="text-gray-500">Color: {product.color}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </section>
    </>
  );
};

export default UserInfo;
