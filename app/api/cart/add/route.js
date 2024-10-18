// app/api/cart/[userId]/add.js
import { db } from '@/firebase/firebase';
import { doc, setDoc, collection, getDoc } from 'firebase/firestore';

export async function POST(request, { params }) {
  const { userId } = params;
  const { productId, name, price, quantity } = await request.json();

  try {
    const cartRef = doc(collection(db, 'carts', userId, 'items'), productId);
    const docSnap = await getDoc(cartRef);

    if (docSnap.exists()) {
      // If the item already exists in the cart, update the quantity
      const newQuantity = docSnap.data().quantity + quantity;
      await setDoc(
        cartRef,
        { productId, name, price, quantity: newQuantity },
        { merge: true },
      );
    } else {
      // Add the item if it doesn't exist
      await setDoc(cartRef, { productId, name, price, quantity });
    }

    return new Response(JSON.stringify({ message: 'Item added to cart' }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
