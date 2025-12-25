import { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase'; // Assuming firebase.js is in src/Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { fixedPlans } from '../data/planData';

const usePlanes = () => {
  const [planes, setPlanes] = useState([]);
  const planesCollectionRef = collection(db, 'planes');

  const getPlanes = async () => {
    const data = await getDocs(planesCollectionRef);
    const dbPlanes = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const combinedPlanes = [...fixedPlans, ...dbPlanes];
    setPlanes(combinedPlanes);
  };

  useEffect(() => {
    getPlanes();
  }, []);

  const createPlan = async (newPlan) => {
    await addDoc(planesCollectionRef, { 
      name: newPlan.name,
      price: newPlan.price,
      description: newPlan.description
    });
    getPlanes();
  };

  const updatePlan = async (id, updatedFields) => {
    const planDoc = doc(db, 'planes', id);
    await updateDoc(planDoc, updatedFields);
    getPlanes();
  };

  const deletePlan = async (id) => {
    const planDoc = doc(db, 'planes', id);
    await deleteDoc(planDoc);
    getPlanes();
  };

  return { planes, createPlan, updatePlan, deletePlan };
};

export default usePlanes;
