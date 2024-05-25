
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as geofirestore from 'geofirestore';
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Initializes and returns an instance of Firebase with the provided configuration.
 *
 * @return {Object} An object containing the initialized Firebase app, auth, firestore, and geofirestore instances.
 */
const intanceFirebase = () => {
  const APP = initializeApp(firebaseConfig);
  const AUTH = initializeAuth(APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  const DB = getFirestore(APP);
  const GEO = geofirestore.initializeApp(DB);
  return { APP, AUTH, DB, GEO };
}

export const { APP, AUTH, DB, GEO } = intanceFirebase()
