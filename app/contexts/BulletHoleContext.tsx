// BulletHoleContext.tsx
import React, { createContext, useState, useCallback } from 'react';

interface BulletHole {
  id: number;
  x: number;
  y: number;
}

interface BulletHoleContextType {
  bulletHoles: BulletHole[];
  addBulletHole: (x: number, y: number) => void;
}

export const BulletHoleContext = createContext<BulletHoleContextType | undefined>(undefined);

export const BulletHoleProvider: React.FC = ({ children }) => {
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);

  const addBulletHole = useCallback((x: number, y: number) => {
    const newBulletHole = { id: Date.now(), x, y };
    setBulletHoles(prev => [...prev, newBulletHole]);
    setTimeout(() => {
      setBulletHoles(prev => prev.filter(hole => hole.id !== newBulletHole.id));
    }, 5000);
  }, []);

  return (
    <BulletHoleContext.Provider value={{ bulletHoles, addBulletHole }}>
      {children}
    </BulletHoleContext.Provider>
  );
};