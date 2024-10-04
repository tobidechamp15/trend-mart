import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function DELETE(req) {
  await connectMongoDB();
  const { userId } = await req.json();

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 },
      );
    }

    cart.items = [];
    await cart.save();

    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
