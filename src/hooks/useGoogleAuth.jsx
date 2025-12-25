
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../Firebase/Firebase';
import { addUser } from './useUsuarios';

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginWithGoogle = async () => {
    setLoading(true);
    setError(null);
    try {
      const googleCredential = await signInWithPopup(auth, googleProvider);
      const firebaseUser = googleCredential.user;
      // Guardar/actualizar usuario en Firestore
      await addUser({
          uid: firebaseUser.uid,
          nombre: firebaseUser.displayName,
          email: firebaseUser.email,
          authProvider: 'google',
          rol: 'Usuario', // Asignar rol por defecto
          hasActiveSubscription: false, // Nuevo atributo
          fechaRegistro: new Date(), // Añadir fecha de registro
          plan: null, // Asignar plan inicial como null
        }, { merge: true }); // Usamos merge para no sobreescribir si ya existe
      setLoading(false);
      return googleCredential;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  };

  return { loginWithGoogle, loading, error };
};
