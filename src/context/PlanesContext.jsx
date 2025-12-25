import React, { createContext, useState, useContext } from 'react';

const PlanesContext = createContext();

export const usePlanes = () => useContext(PlanesContext);

export const PlanesProvider = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const selectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  return (
    <PlanesContext.Provider value={{ selectedPlan, selectPlan }}>
      {children}
    </PlanesContext.Provider>
  );
};
