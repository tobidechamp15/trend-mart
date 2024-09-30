import { connectMongoDB } from '@/lib/mongodb';
import Product from '@/models/Product';
import fetchProductsFromAPI from '@/utils/fetchProducts';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await connectMongoDB();

      // Fetch products from the external API
      const fetchedData = await fetchProductsFromAPI();

      if (!fetchedData || fetchedData.length === 0) {
        return res.status(404).json({ message: 'No products found' });
      }

      // Loop through the fetched data and save each product to MongoDB
      const savedProducts = [];
      for (let productData of fetchedData) {
        // Create a new product based on fetched data
        const newProduct = new Product({
          name: productData.name,
          price: productData.price,
          color: productData.color || 'Unknown',
          image: productData.image || 'No image',
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();
        savedProducts.push(savedProduct);
      }

      // Send a success response with the saved products
      return res.status(201).json({
        message: 'Products successfully saved!',
        products: savedProducts,
      });
    } catch (error) {
      console.error('Error saving products to MongoDB:', error);
      return res.status(500).json({ error: 'Failed to save products' });
    }
  } else {
    // If it's not a POST request, return a 405 error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
