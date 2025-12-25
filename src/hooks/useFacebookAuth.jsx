
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider } from '../Firebase/Firebase';
import { addUser } from './useUsuarios';

export const useFacebookAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithFacebook = async () => {
    setLoading(true);
    setError(null);
    try {
      const facebookCredential = await signInWithPopup(auth, facebookProvider);
      const firebaseUser = facebookCredential.user;
       // Guardar/actualizar usuario en Firestore
        await addUser({
          uid: firebaseUser.uid,
          nombre: firebaseUser.displayName,
          email: firebaseUser.email,
          authProvider: 'facebook',
          rol: 'Usuario', // Asignar rol por defecto
          hasActiveSubscription: false, // Nuevo atributo
          fechaRegistro: new Date(), // Añadir fecha de registro
          plan: null, // Asignar plan inicial como null
        }, { merge: true });
      setLoading(false);
      return facebookCredential;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  };

  return { loginWithFacebook, loading, error };
};
