import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

const useMiembros = () => {
  const [miembros, setMiembros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMiembros = async () => {
      try {
        const miembrosCollection = collection(db, 'Usuarios');
        const miembrosSnapshot = await getDocs(miembrosCollection);
        const miembrosList = miembrosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMiembros(miembrosList);
      } catch (error) {
        console.error("Error fetching miembros: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMiembros();
  }, []);

  return { miembros, loading };
};

export default useMiembros;
