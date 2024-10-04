import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Cart from '@/models/Cart';

export async function GET(req) {
  await connectMongoDB();
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return NextResponse.json(
        { success: false, message: 'Cart not found' },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, cart });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
