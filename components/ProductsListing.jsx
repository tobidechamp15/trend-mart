'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import fetchProductsFromAPI from '@/utils/fetchProducts';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const ProductsListing = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { data: session } = useSession();
  // Check if user is authenticated
  const email = session?.user?.email; // Assuming session holds user data

  console.log(email);
  //
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductsFromAPI();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    getCartItems();
  }, []);
  // Function to handle adding a product to the cart
  const handleAddToCart = async (product) => {
    // Validate that the user is authenticated
    if (!session || !session.user?.email) {
      console.error('User is not authenticated');
      alert('You must be logged in to add products to the cart.');
      return;
    }

    // Validate product details
    if (!product || !product.id) {
      console.error('Invalid product details:', product);
      alert('Invalid product details. Please try again.');
      return;
    }

    // Fetch user ID (from localStorage or session)
    const userId = localStorage.getItem('userID'); // Replace this with Firebase Auth if necessary
    if (!userId) {
      console.error('No user ID found');
      alert('An error occurred. Please log in again.');
      return;
    }

    // Reference to the user's cart collection in Firestore
    const userCartRef = collection(db, 'carts', userId, 'userCart'); // Reference to sub-collection under user's document

    // Prepare the product details to be stored in the cart
    const userCartDetails = {
      productId: product.id, // Ensure this is the correct identifier
      quantity: 1, // Starting with a quantity of 1
      price: product.price,
      itemName: product.title,
    };

    try {
      // Add product details to the user's cart in Firestore
      const newDocRef = await addDoc(userCartRef, userCartDetails);
      console.log('Product added to cart with ID: ', newDocRef.id);
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const getCartItems = async () => {
    try {
      // Reference to the user's cart collection in Firestore
      const userId = localStorage.getItem('userID'); // Replace this with Firebase Auth if necessary

      const userCartRef = collection(db, 'carts', userId, 'userCart');

      // Fetch all cart items from Firestore
      const cartSnapshot = await getDocs(userCartRef);

      // Map over the documents and return the data
      const cartItems = cartSnapshot.docs.map((doc) => ({
        id: doc.id, // Include the document ID for future reference (e.g., for updates or deletes)
        ...doc.data(), // Spread the document data (like productId, price, etc.)
      }));
      console.log(cartItems);
      return cartItems;
    } catch (error) {
      console.error('Error fetching cart items: ', error);
      return [];
    }
  };

  return (
    <>
      <section className="flex items-center justify-center flex-col my-3">
        <h2>Product List</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap justify-center gap-4 p-6 bg-gray-50">
            {products.map((product, index) => (
              <div
                key={index}
                className="border border-blue-200 bg-white rounded-lg shadow-md p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col items-center justify-between"
                style={{ maxWidth: '220px' }}
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

export default ProductsListing;
