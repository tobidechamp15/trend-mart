'use client';
import Navbar from '@/components/Navbar';
import ProductsListing from '@/components/ProductsListing';
import fetchProductsFromAPI from '@/utils/fetchProducts';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [products, setProducts] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
      <Navbar />
      <ProductsListing product={products} isLoading={isLoading} />
    </>
  );
};

export default page;
