'use client';
import getCartItems from '@/utils/GetCart';
import React, { useEffect, useState } from 'react';
import Loader from './Loader'; // Assuming you have this function for removing an item
import { removeCartItem, updateCartItem } from '@/utils/CartActions';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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
  const handleAddQuantity = async (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1; // Increment quantity

    // Update local state
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );

    try {
      // Call updateCartItem function to update the quantity in Firestore
      await updateCartItem(id, { quantity: newQuantity });
    } catch (error) {
      console.error('Error updating quantity: ', error);
    }
  };

  // Handle decreasing the quantity of an item
  const handleReduceQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      const newQuantity = currentQuantity - 1; // Decrement quantity

      // Update local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );

      try {
        // Call updateCartItem function to update the quantity in Firestore
        await updateCartItem(id, { quantity: newQuantity });
      } catch (error) {
        console.error('Error updating quantity: ', error);
      }
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = async (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    try {
      await removeCartItem(id); // Remove item from Firestore
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="bg-white min-h-screen py-10">
      <div className="container mx-auto px-4">
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
                className="flex flex-col sm:flex-row items-center justify-between p-4 border rounded-lg shadow-md bg-blue-50"
              >
                {/* Product Image and Info */}
                <div className="flex flex-col sm:flex-row items-center w-full sm:w-1/2">
                  <img
                    src={item.image || '/placeholder.png'}
                    alt={item.name}
                    className="w-20 h-20 sm:w-16 sm:h-16 rounded-md"
                  />
                  <div className="ml-4 mt-2 sm:mt-0">
                    <h2 className="text-lg font-semibold text-blue-700">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Price: ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center mt-4 sm:mt-0 sm:space-x-2">
                  <button
                    onClick={() => handleReduceQuantity(item.id, item.quantity)}
                    className="bg-gray-300 text-black px-3 py-1 rounded-full hover:bg-gray-400"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg text-blue-700 mx-3">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleAddQuantity(item.id, item.quantity)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700"
                  >
                    +
                  </button>
                </div>

                {/* Total Price and Remove Button */}
                <div className="flex flex-col text-right sm:w-1/4 mt-4 sm:mt-0">
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
