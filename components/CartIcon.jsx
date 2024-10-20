'use client';
import getCartItems from '@/utils/GetCart';
import Image from 'next/image';
import cart from '../src/cart.svg';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const CartIcon = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
  }, [cartItems]);

  return (
    <Link
      href="/cart"
      className="cart-section relative inline-block cursor-pointer"
    >
      <Image src={cart} className="w-[28px] h-[28px]" alt="cart" />
      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-sm text-white flex items-center justify-center w-6 h-6 bg-blue-600 rounded-full ">
        {cartItems.reduce(
          (accumulator, item) => accumulator + item.quantity,
          0,
        )}
      </span>
    </Link>
  );
};

export default CartIcon;
