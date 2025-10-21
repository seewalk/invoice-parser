/**
 * Firebase Client-Side Configuration
 * 
 * This file initializes the Firebase SDK for client-side usage.
 * Used in browser/client components for authentication and Firestore operations.
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAnalytics, Analytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa7VFLFoC-nA5uUbPlQjYWR2bFBgy8JeM",
  authDomain: "invoicer-7a7d0.firebaseapp.com",
  projectId: "invoicer-7a7d0",
  storageBucket: "invoicer-7a7d0.firebasestorage.app",
  messagingSenderId: "632147472223",
  appId: "1:632147472223:web:6997a7d2916a75746b90ea",
  measurementId: "G-7Y749QE0TT"
};

// Initialize Firebase (singleton pattern)
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let analytics: Analytics | null = null;

if (typeof window !== 'undefined') {
  // Client-side only
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Initialize Analytics (only in browser and if supported)
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app!);
      console.log('[Firebase] Analytics initialized');
    }
  }).catch((error) => {
    console.warn('[Firebase] Analytics not supported:', error);
  });
  
  console.log('[Firebase] Client app initialized');
}

// These exports will only be used on the client side where they are guaranteed to be initialized
export { auth, db, analytics };
export default app as FirebaseApp;
