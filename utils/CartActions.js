import { db } from '@/firebase/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

// Function to update cart item quantity
export const updateCartItem = async (cartItemId, updatedData) => {
  try {
    let userId = localStorage.getItem('userID'); // or use Firebase Auth to get the user ID

    if (!userId) throw new Error('User ID is not found'); // Ensure userId exists

    // Convert userId and cartItemId to strings
    userId = String(userId);
    cartItemId = String(cartItemId);

    // Reference to the specific cart item document in Firestore
    const cartItemRef = doc(db, 'carts', userId, 'userCart', cartItemId);

    // Update the document with the new data
    await updateDoc(cartItemRef, updatedData);
  } catch (error) {
    return `Error updating cart item: ${error.message}`; // Return error message
  }
};

// Function to remove a cart item
export const removeCartItem = async (cartItemId) => {
  try {
    let userId = localStorage.getItem('userID'); // or use Firebase Auth to get the user ID

    if (!userId) throw new Error('User ID is not found'); // Ensure userId exists

    // Convert userId and cartItemId to strings
    userId = String(userId);
    cartItemId = String(cartItemId);

    // Reference to the specific cart item document in Firestore
    const cartItemRef = doc(db, 'carts', userId, 'userCart', cartItemId);

    // Delete the document from Firestore
    await deleteDoc(cartItemRef);

    console.log('Cart item successfully removed!');
  } catch (error) {
    return `Error updating cart item: ${error.message}`; // Return error message
  }
};
