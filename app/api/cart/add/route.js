import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';
import Product from '@/models/Product'; // Assuming you have a Product model
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

export async function POST(req) {
  await connectMongoDB();

  let data;
  try {
    data = await req.json(); // Try to parse the request body
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON in request body.' },
      { status: 400 },
    );
  }

  const { email, productId, quantity, itemName } = data;

  // Validate input
  if (!email || !productId || !quantity || quantity || !itemName <= 0) {
    return NextResponse.json(
      {
        success: false,
        error: 'Valid email, productId, and a positive quantity are required.',
      },
      { status: 400 },
    );
  }

  // Validate productId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return NextResponse.json(
      { success: false, error: 'Invalid productId.' },
      { status: 400 },
    );
  }

  try {
    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Fetch product details from the Product model
    const product = await Product.findById(productObjectId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found.' },
        { status: 404 },
      );
    }

    // Find existing cart for the email
    let cart = await Cart.findOne({ email });

    // If cart exists, update or add item
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productObjectId.toString(),
      );

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = product.price; // Update price as well
      } else {
        // Add new item to cart
        cart.items.push({
          productId: productObjectId,
          itemName: product.name, // Add itemName from product
          quantity,
          itemName: product.title,
          price: product.price,
        });
      }
    } else {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        email,
        items: [
          {
            productId: productObjectId,
            itemName: product.name, // Add itemName from product
            quantity,
            itemName: product.title,
            price: product.price,
          },
        ],
      });
    }

    // Save the cart to the database
    await cart.save();
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing the request.',
      },
      { status: 500 },
    );
  }
}
