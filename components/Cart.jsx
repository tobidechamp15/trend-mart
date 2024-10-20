'use client';
import getCartItems from '@/utils/GetCart';
import { updateCartItem, removeCartItem } from '@/utils/CartActions'; // Assume these are the utility functions for updating and removing items
import React, { useEffect, useState } from 'react';
import Loader from './Loader';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Cart Items from Firestore
  useEffect(() => {
    const fetchCartItems = async () => {
      setIsLoading(true); // Set loading to true before fetching
      try {
        const data = await getCartItems();
        setCartItems(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchCartItems();
  }, []);

  // Handle increasing the quantity of an item
  const handleAddQuantity = async (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );

    await updateCartItem(id, { quantity: 1 }); // Update quantity in Firestore
  };

  // Handle decreasing the quantity of an item
  const handleReduceQuantity = async (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );

    await updateCartItem(id, { quantity: -1 }); // Update quantity in Firestore
  };

  // Handle removing an item from the cart
  const handleRemoveItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    await removeCartItem(id); // Remove item from Firestore
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-blue-50"
              >
                <div className="flex items-center">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold text-blue-700">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleReduceQuantity(item.id)}
                    className="bg-gray-300 text-black px-3 py-1 rounded-full hover:bg-gray-400"
                  >
                    -
                  </button>
                  <span className="text-lg text-blue-700">{item.quantity}</span>
                  <button
                    onClick={() => handleAddQuantity(item.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>

                <div className="text-right">
                  <p className="text-lg text-blue-600 font-semibold">
                    Total: ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
