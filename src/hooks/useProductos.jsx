import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

const useProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const productosCollection = collection(db, 'productos');
        const productosSnapshot = await getDocs(productosCollection);
        const productosList = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productosList);
      } catch (error) {
        console.error("Error fetching productos: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const getProductById = useCallback(async (id) => {
    setLoading(true);
    try {
      const productDoc = doc(db, 'productos', id);
      const productSnapshot = await getDoc(productDoc);
      if (productSnapshot.exists()) {
        return { id: productSnapshot.id, ...productSnapshot.data() };
      } else {
        console.error("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching product: ", error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { productos, loading, getProductById };
};

export default useProductos;