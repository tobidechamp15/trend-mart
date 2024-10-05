import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/Cart";
import Product from "@/models/Product"; // Assuming you have a Product model
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  await connectMongoDB();
  const { email, productId, quantity } = await req.json();

  // Validate input
  if (!email || !productId || !quantity) {
    return NextResponse.json(
      { success: false, error: "Email, productId, and quantity are required." },
      { status: 400 }
    );
  }

  try {
    // Convert productId to ObjectId
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Fetch product details from the Product model
    const product = await Product.findById(productObjectId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    // Find existing cart for the email
    let cart = await Cart.findOne({ email });

    // If cart exists, update or add item
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productObjectId.toString()
      );

      if (itemIndex > -1) {
        // Update quantity if item exists
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price = product.price;
      } else {
        // Add new item to cart
        cart.items.push({
          productId: productObjectId,
          itemName: product.name, // Add itemName from product
          quantity,
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
            price: product.price,
          },
        ],
      });
    }

    // Save the cart to the database
    await cart.save();
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
