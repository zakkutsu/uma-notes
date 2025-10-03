// Firebase utilities - commented out to avoid TypeScript errors
// These functions can be uncommented and used when Firebase is properly installed

/**
 * Initialize Firebase app with configuration
 * @returns Firebase app instance and database
 */
export const initializeFirebase = () => {
  console.log("Firebase utilities available but not initialized - install Firebase SDK first");
  return { app: null, auth: null, db: null };
};

/**
 * Sign in user with custom token or anonymously
 */
export const signInUser = async () => {
  console.log("Firebase auth not available - install Firebase SDK first");
};

/**
 * Get app ID from global variables
 * @returns App ID string
 */
export const getAppId = (): string => {
  return 'default-app-id';
};

// Uncomment below when Firebase is installed:
/*
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

export const initializeFirebase = (): { app: FirebaseApp | null; auth: Auth | null; db: Firestore | null } => {
  try {
    const firebaseConfig = typeof (window as any).__firebase_config !== 'undefined' 
      ? JSON.parse((window as any).__firebase_config) 
      : null;
    
    if (!firebaseConfig) {
      console.warn("Firebase config not found, auth disabled.");
      return { app: null, auth: null, db: null };
    }

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    return { app, auth, db };
  } catch (e) {
    console.error("Firebase initialization failed:", e);
    return { app: null, auth: null, db: null };
  }
};

export const signInUser = async (auth: Auth): Promise<void> => {
  if (auth.currentUser) return;
  
  try {
    const initialAuthToken: string | undefined = typeof (window as any).__initial_auth_token !== 'undefined' 
      ? (window as any).__initial_auth_token 
      : undefined;

    if (initialAuthToken) {
      await signInWithCustomToken(auth, initialAuthToken);
    } else {
      await signInAnonymously(auth);
    }
  } catch (e) {
    console.error("Firebase sign in failed:", e);
  }
};

export const getAppId = (): string => {
  return typeof (window as any).__app_id !== 'undefined' 
    ? (window as any).__app_id 
    : 'default-app-id';
};
*/