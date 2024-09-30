import Product from '@/models/Product';

const saveProductsToDB = async () => {
  try {
    for (let product of products) {
      // Transform the product data if needed (e.g., map fields)
      const newProduct = new Product({
        name: product.title,
        price: product.price,
        color: product.color,
        image: product.imageUrl,
      });

      // Save each product to the database
      await newProduct.save();
    }

    console.log('Products imported successfully!');
  } catch (error) {}
};
