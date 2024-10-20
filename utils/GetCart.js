const { db } = require('@/firebase/firebase');
import { collection, getDocs } from 'firebase/firestore'; // Firestore imports

const getCartItems = async () => {
  try {
    // Reference to the user's cart collection in Firestore
    const userId = localStorage.getItem('userID'); // Replace this with Firebase Auth if necessary

    const userCartRef = collection(db, 'carts', userId, 'userCart'); // Sub-collection under user's document

    // Fetch all cart items from Firestore
    const cartSnapshot = await getDocs(userCartRef);

    // Map over the documents and return the data
    const cartItems = cartSnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID for future reference (e.g., for updates or deletes)
      ...doc.data(), // Spread the document data (like productId, price, etc.)
    }));
    return cartItems;
  } catch (error) {
    console.error('Error fetching cart items: ', error);
    return [];
  }
};
export default getCartItems;
