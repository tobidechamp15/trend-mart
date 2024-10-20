import { db } from '@/firebase/firebase';
import {
  updateDoc,
  deleteDoc,
  doc,
  collection,
  setDoc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';

const userId = localStorage.getItem('userID');

export const updateCartItem = async (id, change) => {
  const cartRef = doc(db, 'userCarts', userId, id); //Direct reference to cart item

  try {
    const cartDoc = await getDoc(cartRef); //Get current document
    if (cartDoc.exists()) {
      await updateDoc(cartRef, {
        quantity: cartDoc.data().quantity + change.quantity,
        updatedAt: serverTimestamp(), //Add timestamp for easy tracking of updates
      });
    } else {
      //Handle case where item doesn't exist (e.g., add it)
      console.warn(`Cart item with ID ${id} not found. Creating new item.`);
      await setDoc(cartRef, {
        quantity: change.quantity,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};

export const removeCartItem = async (id) => {
  const cartRef = doc(db, 'userCarts', userId, id);

  try {
    await deleteDoc(cartRef);
  } catch (error) {
    console.error('Error removing cart item:', error);
  }
};
