import { useState, useEffect } from 'react';
import { Platform } from '../types';
import { defaultPlatforms } from '../data';

export function usePlatforms() {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('intellect_platforms');
    if (saved) {
      try {
        setPlatforms(JSON.parse(saved));
      } catch (e) {
        setPlatforms(defaultPlatforms);
      }
    } else {
      setPlatforms(defaultPlatforms);
    }
    setIsLoaded(true);
  }, []);

  const savePlatforms = (newPlatforms: Platform[]) => {
    setPlatforms(newPlatforms);
    localStorage.setItem('intellect_platforms', JSON.stringify(newPlatforms));
  };

  const addPlatform = (platform: Omit<Platform, 'id'>) => {
    const newPlatform = { ...platform, id: Date.now().toString() };
    savePlatforms([...platforms, newPlatform]);
  };

  const updatePlatform = (updatedPlatform: Platform) => {
    savePlatforms(platforms.map(p => p.id === updatedPlatform.id ? updatedPlatform : p));
  };

  const deletePlatform = (id: string) => {
    savePlatforms(platforms.filter(p => p.id !== id));
  };

  return {
    platforms,
    isLoaded,
    addPlatform,
    updatePlatform,
    deletePlatform,
    savePlatforms // expose if bulk update is needed (e.g. reordering)
  };
}
