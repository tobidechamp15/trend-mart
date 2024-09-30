'use client';
import { useEffect, useState } from 'react';

const ImportProductsPage = () => {
  const [status, setStatus] = useState('');

  const importProducts = async () => {
    try {
      const response = await fetch('/api/import-products', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to import products');
      }

      const result = await response.json();
      setStatus(`Successfully imported ${result.products.length} products!`);
    } catch (error) {
      console.error('Error importing products:', error);
      setStatus('Error importing products');
    }
  };

  useEffect(() => {
    // Automatically trigger the import when the component loads
    importProducts();
  }, []);

  return (
    <div>
      <h1>Import Products</h1>
      <p>{status}</p>
    </div>
  );
};

export default ImportProductsPage;
