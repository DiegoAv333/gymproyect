import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import './ProductDetail.css';
import LoadingIndicator from '../../ui/LoadingIndicator/LoadingIndicator';
import useProductos from '../../../hooks/useProductos';
import RecommendedProducts from '../RecommendedProducts/RecommendedProducts';
import { useCart } from '../../../context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { productos: allProducts } = useProductos();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, 'productos', productId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProducto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [productId]);

  useEffect(() => {
    if (producto && allProducts.length > 0) {
      const sameCategory = allProducts.filter(
        p => p.category === producto.category && p.id !== producto.id
      );
      const otherProducts = allProducts.filter(
        p => p.category !== producto.category && p.id !== producto.id
      );

      const recommendations = [...sameCategory, ...otherProducts].slice(0, 4);
      setRecommendedProducts(recommendations);
    }
  }, [producto, allProducts]);

  const handleAddToCart = () => {
    if (producto) {
      addToCart(producto);
      // Optionally, provide feedback to the user, e.g., a toast notification
      console.log(`${producto.name} added to cart`);
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (!producto) {
    return <div>Producto no encontrado.</div>;
  }

  return (
    <div className="product-detail-page">
        <div className="product-detail-container">
          <div className="product-detail-image">
            <img src={producto.imagen} alt={producto.nombre} />
          </div>
          <div className="product-detail-info">
            <h1 className="product-name">{producto.name}</h1>
            <p className="price">${producto.price}</p>
            <p className="description">{producto.description}</p>
            <button className="buy-now-btn" onClick={handleAddToCart}>Agregar al Carrito</button>
          </div>
        </div>
        <RecommendedProducts products={recommendedProducts} />
    </div>
  );
};

export default ProductDetail;