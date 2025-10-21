'use client';

/**
 * Firebase Authentication Context
 * 
 * Provides authentication state and methods throughout the app.
 * Handles user quotas, sign-in, sign-up, and quota management.
 */

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  UserCredential
} from 'firebase/auth';
import { auth, db } from './clientApp';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp, 
  onSnapshot,
  Unsubscribe 
} from 'firebase/firestore';

// User quota interface
export interface UserQuotas {
  invoiceParses: number;
  templateDownloads: number;
  generatorUses: number;
  plan: 'free' | 'starter' | 'pro' | 'enterprise';
  subscriptionEnd?: Date;
  email?: string;
  name?: string;
  createdAt?: any;
  lastLoginAt?: any;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string, name: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  userQuotas: UserQuotas | null;
  refreshQuotas: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userQuotas, setUserQuotas] = useState<UserQuotas | null>(null);

  /**
   * Fetch and subscribe to user quotas from Firestore
   */
  const fetchUserQuotas = async (userId: string): Promise<Unsubscribe | null> => {
    if (!db) {
      console.error('[Auth] Firestore not initialized');
      return null;
    }
    
    try {
      const userDocRef = doc(db, 'users', userId);
      
      // Set up real-time listener for quota changes
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data() as UserQuotas;
          setUserQuotas(data);
          console.log('[Auth] User quotas updated:', data);
        } else {
          console.log('[Auth] User document does not exist, will create');
          setUserQuotas(null);
        }
      }, (error) => {
        console.error('[Auth] Error listening to user quotas:', error);
      });

      return unsubscribe;
    } catch (error) {
      console.error('[Auth] Error fetching user quotas:', error);
      return null;
    }
  };

  /**
   * Initialize new user with default quotas
   */
  const initializeNewUser = async (userId: string, email: string, name: string) => {
    if (!db) {
      console.error('[Auth] Firestore not initialized');
      throw new Error('Database not available');
    }
    
    const initialQuotas: UserQuotas = {
      invoiceParses: 10,
      templateDownloads: 3,
      generatorUses: 5,
      plan: 'free',
      email,
      name
    };

    try {
      await setDoc(doc(db, 'users', userId), {
        ...initialQuotas,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });
      setUserQuotas(initialQuotas);
      console.log('[Auth] New user initialized with quotas:', initialQuotas);
    } catch (error) {
      console.error('[Auth] Error initializing new user:', error);
      throw error;
    }
  };

  /**
   * Listen to authentication state changes
   */
  useEffect(() => {
    if (!auth || !db) {
      console.error('[Auth] Firebase not initialized');
      setLoading(false);
      return;
    }
    
    let quotaUnsubscribe: Unsubscribe | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('[Auth] Auth state changed:', firebaseUser ? 'User logged in' : 'No user');
      setUser(firebaseUser);
      
      if (firebaseUser && db) {
        // User is signed in
        try {
          // Check if user document exists
          const userDoc = await getDoc(doc(db!, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            // Existing user - subscribe to quota updates
            quotaUnsubscribe = await fetchUserQuotas(firebaseUser.uid);
            
            // Update last login
            await setDoc(doc(db!, 'users', firebaseUser.uid), {
              lastLoginAt: serverTimestamp()
            }, { merge: true });
          } else {
            // New user - initialize with default quotas
            await initializeNewUser(
              firebaseUser.uid,
              firebaseUser.email || '',
              firebaseUser.displayName || 'User'
            );
            
            // Subscribe to quota updates
            quotaUnsubscribe = await fetchUserQuotas(firebaseUser.uid);
          }
        } catch (error) {
          console.error('[Auth] Error setting up user:', error);
        }
      } else {
        // User is signed out
        setUserQuotas(null);
        
        // Unsubscribe from quota updates
        if (quotaUnsubscribe) {
          quotaUnsubscribe();
          quotaUnsubscribe = null;
        }
      }
      
      setLoading(false);
    });

    // Cleanup function
    return () => {
      unsubscribe();
      if (quotaUnsubscribe) {
        quotaUnsubscribe();
      }
    };
  }, []);

  /**
   * Sign in with email and password
   */
  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    if (!auth) {
      throw new Error('Authentication not initialized');
    }
    
    try {
      console.log('[Auth] Signing in with email:', email);
      const credential = await signInWithEmailAndPassword(auth, email, password);
      return credential;
    } catch (error: any) {
      console.error('[Auth] Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  /**
   * Sign up with email and password
   */
  const signUp = async (email: string, password: string, name: string): Promise<UserCredential> => {
    if (!auth) {
      throw new Error('Authentication not initialized');
    }
    
    try {
      console.log('[Auth] Creating new user:', email);
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Initialize user document (will be created by onAuthStateChanged)
      await initializeNewUser(credential.user.uid, email, name);
      
      return credential;
    } catch (error: any) {
      console.error('[Auth] Sign up error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  };

  /**
   * Sign in with Google OAuth
   */
  const signInWithGoogle = async (): Promise<UserCredential> => {
    if (!auth || !db) {
      throw new Error('Authentication not initialized');
    }
    
    try {
      console.log('[Auth] Signing in with Google');
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      
      // Check if user document exists
      const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
      if (!userDoc.exists()) {
        // New Google user - initialize
        await initializeNewUser(
          credential.user.uid,
          credential.user.email || '',
          credential.user.displayName || 'User'
        );
      }
      
      return credential;
    } catch (error: any) {
      console.error('[Auth] Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  };

  /**
   * Sign out
   */
  const logout = async (): Promise<void> => {
    if (!auth) {
      throw new Error('Authentication not initialized');
    }
    
    try {
      console.log('[Auth] Signing out');
      await signOut(auth);
    } catch (error: any) {
      console.error('[Auth] Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  };

  /**
   * Send password reset email
   */
  const resetPassword = async (email: string): Promise<void> => {
    if (!auth) {
      throw new Error('Authentication not initialized');
    }
    
    try {
      console.log('[Auth] Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('[Auth] Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  };

  /**
   * Manually refresh user quotas
   */
  const refreshQuotas = async (): Promise<void> => {
    if (!user || !db) return;
    
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        setUserQuotas(userDoc.data() as UserQuotas);
        console.log('[Auth] Quotas refreshed');
      }
    } catch (error) {
      console.error('[Auth] Error refreshing quotas:', error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    resetPassword,
    userQuotas,
    refreshQuotas
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access auth context
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
