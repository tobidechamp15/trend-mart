import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';
import { NextResponse } from 'next/server';

export async function PUT(req) {
  await connectMongoDB();
  const { userId, productId, quantity } = await req.json();

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 },
      );
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Product not in cart' },
        { status: 404 },
      );
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
