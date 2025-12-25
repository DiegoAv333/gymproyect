import React, { createContext, useState, useContext } from 'react';

const ClasesContext = createContext();

export const useClases = () => useContext(ClasesContext);

export const ClasesProvider = ({ children }) => {
  const [reservedClasses, setReservedClasses] = useState([]);

  const reserveClass = (classToReserve) => {
    if (!reservedClasses.some(c => c.id === classToReserve.id)) {
      setReservedClasses([...reservedClasses, classToReserve]);
    }
  };

  const cancelClass = (classId) => {
    setReservedClasses(reservedClasses.filter(c => c.id !== classId));
  };

  return (
    <ClasesContext.Provider value={{ reservedClasses, reserveClass, cancelClass }}>
      {children}
    </ClasesContext.Provider>
  );
};
