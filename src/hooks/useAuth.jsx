import { createContext, useContext, useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        const userDocRef = doc(db, 'Usuarios', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
        };

        if (userDoc.exists()) {
          const data = userDoc.data();
          userData.role = data.rol || 'SIN_ROL';
          userData.hasActiveSubscription = data.hasActiveSubscription || false;
          userData.plan = data.plan || null; // AÃ±adir los detalles del plan
        } else {
          // Asigna valores por defecto si no existe el documento
          userData.role = 'SIN_ROL';
          userData.hasActiveSubscription = false;
          userData.plan = null;
        }
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
