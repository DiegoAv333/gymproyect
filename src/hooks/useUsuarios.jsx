import { db, auth } from "../Firebase/Firebase";
import { doc, setDoc, updateDoc, collection, query, onSnapshot } from "firebase/firestore";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { useState, useEffect } from 'react';

// FunciÃ³n para crear o fusionar datos de usuario en Firestore
export const addUser = async (user, options) => {
    try {
        const userDocRef = doc(db, "Usuarios", user.uid);
        await setDoc(userDocRef, user, options);
    } catch (e) {
        console.error("Error adding or updating document: ", e);
        throw e;
    }
};

// FunciÃ³n para actualizar el perfil de usuario en Auth y Firestore
export const updateUserProfile = async (uid, data) => {
    try {
        // 1. Actualizar el perfil de Firebase Authentication (si se proporciona displayName)
        if (data.displayName && auth.currentUser) {
            await updateProfile(auth.currentUser, { displayName: data.displayName });
        }

        // 2. Actualizar el documento en Firestore
        const userDocRef = doc(db, "Usuarios", uid);
        const firestoreData = {};
        if (data.displayName) {
            firestoreData.nombre = data.displayName;
        }

        if (Object.keys(firestoreData).length > 0) {
            await updateDoc(userDocRef, firestoreData);
        }

    } catch (e) {
        console.error("Error al actualizar el perfil de usuario: ", e);
        throw e;
    }
};

// FunciÃ³n para enviar correo de restablecimiento de contraseÃ±a
export const requestPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (e) {
        console.error("Error al enviar el correo de restablecimiento: ", e);
        throw e;
    }
};

// Hook para obtener todos los usuarios de la colecciÃ³n "Usuarios"
const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const q = query(collection(db, "Usuarios"));
        const unsubscribe = onSnapshot(q, 
            (querySnapshot) => {
                const usuariosData = [];
                querySnapshot.forEach((doc) => {
                    usuariosData.push({ id: doc.id, ...doc.data() });
                });
                setUsuarios(usuariosData);
                setLoading(false);
            },
            (err) => {
                console.error("Error al obtener usuarios: ", err);
                setError(err);
                setLoading(false);
            }
        );

        // Limpiar la suscripciÃ³n cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    return { usuarios, loading, error };
};

export default useUsuarios;