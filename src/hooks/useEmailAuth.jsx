
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile, // Importar updateProfile
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { addUser } from './useUsuarios';

export const useEmailAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (nombre, email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Actualizar el perfil de autenticación con el displayName
      await updateProfile(firebaseUser, { displayName: nombre });

      // Guardar información adicional en Firestore
      await addUser({
        uid: firebaseUser.uid,
        nombre: nombre,
        email: firebaseUser.email,
        authProvider: 'local',
        rol: 'Usuario', // Asignar rol por defecto
        hasActiveSubscription: false, // Nuevo atributo
      });
      setLoading(false);
      return userCredential;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      return userCredential;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  };

  return { signup, login, loading, error };
};
