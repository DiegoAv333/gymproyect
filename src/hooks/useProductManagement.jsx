import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase/Firebase';

const useProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const productsCollection = collection(db, 'productos');

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const productsSnapshot = await getDocs(productsCollection);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productsList);
            setError(null);
        } catch (err) {
            console.error("Error fetching products: ", err);
            setError("Failed to fetch products.");
        } finally {
            setLoading(false);
        }
    }, [productsCollection]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = async (productData) => {
        setLoading(true);
        try {
            await addDoc(productsCollection, productData);
            await fetchProducts(); // Refresh list after adding
            return { success: true };
        } catch (err) {
            console.error("Error adding product: ", err);
            setError("Failed to add product.");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, updatedData) => {
        setLoading(true);
        const productDoc = doc(db, 'productos', id);
        try {
            await updateDoc(productDoc, updatedData);
            await fetchProducts(); // Refresh list after updating
            return { success: true };
        } catch (err) {
            console.error("Error updating product: ", err);
            setError("Failed to update product.");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        const productDoc = doc(db, 'productos', id);
        try {
            await deleteDoc(productDoc);
            await fetchProducts(); // Refresh list after deleting
            return { success: true };
        } catch (err) {
            console.error("Error deleting product: ", err);
            setError("Failed to delete product.");
            return { success: false, error: err };
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, addProduct, updateProduct, deleteProduct, refetch: fetchProducts };
};

export default useProductManagement;
