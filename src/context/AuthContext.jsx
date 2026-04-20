import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { updateProfile } from 'firebase/auth';
import { auth } from '../services/firebase';

// AuthContext provides currentUser and auth helpers to the app.
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup using Firebase Auth. If username is provided, update the user's displayName
  // Signature: signup(email, password, username?)
  async function signup(email, password, username) {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    if (username && result?.user) {
      try {
        await updateProfile(result.user, { displayName: username });
        // update local context so UI can reflect displayName immediately
        setCurrentUser({ uid: result.user.uid, email: result.user.email, displayName: username });
      } catch (err) {
        console.error('Failed to updateProfile during signup:', err);
      }
    }

    return result;
  }

  // Login using Firebase Auth
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout
  function logout() {
    return signOut(auth);
  }

  // Track auth state and update currentUser/loading
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      // Keep auth simple: only use Firebase auth user fields (email/displayName).
      setCurrentUser({ uid: user.uid, email: user.email, displayName: user.displayName });
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, signup, login, logout, loading };

  // Only render children once the initial auth state has been resolved
  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : null}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
