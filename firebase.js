// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Replace with your actual config from Firebase Console > Project Settings > General > Your apps
const firebaseConfig = {
  apiKey: "AIzaSyBxk3tbYfwmsGXhUEGOptxugL1i0zcetAw",
  authDomain: "native-app-33063.firebaseapp.com",
  databaseURL: "https://native-app-33063-default-rtdb.firebaseio.com",
  projectId: "native-app-33063",
  storageBucket: "native-app-33063.firebasestorage.app",
  messagingSenderId: "866184759156",
  appId: "1:866184759156:web:c0ce8c6d7572b07b544e21",
  measurementId: "G-VF68NMYDSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});