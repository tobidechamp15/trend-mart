// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBV7LyIYuA1nNMUij0-XBaatMZYv4LMYDM',
  authDomain: 'trend-mart-tobiloba.firebaseapp.com',
  projectId: 'trend-mart-tobiloba',
  storageBucket: 'trend-mart-tobiloba.appspot.com',
  messagingSenderId: '117505231451',
  appId: '1:117505231451:web:ad5cf1024e60e8d4404d7e',
  measurementId: 'G-X007WK4GEV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
const userId = localStorage.getItem('userID');

export { userId };
