import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase-config';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  };
  const logout = () => 
  {
    return signOut(auth);
  }
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const deleteAccount = () => {
    return deleteUser(auth.currentUser);
  };
  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log(currentUser);
      }
      
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const value =
  {
    user,
    logout,
    login,
    register,
    deleteAccount,
    loginWithGoogle,
  };
 
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);


