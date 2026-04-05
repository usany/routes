import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

type CampusType = 'se' | 'gl' | 'gw';

interface CampusContextType {
  campus: CampusType;
  setCampus: (campus: CampusType) => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

interface CampusProviderProps {
  children: ReactNode;
}

export const CampusProvider: React.FC<CampusProviderProps> = ({ children }) => {
  const [campus, setCampus] = useState<CampusType>('se');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCampus = async () => {
      try {
        const savedCampus = await AsyncStorage.getItem('campus');
        if (savedCampus && (savedCampus === 'se' || savedCampus === 'gl' || savedCampus === 'gw')) {
          setCampus(savedCampus);
        }
      } catch (error) {
        console.error('Failed to load campus from storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampus();
  }, []);

  useEffect(() => {
    const saveCampus = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem('campus', campus);
        } catch (error) {
          console.error('Failed to save campus to storage:', error);
        }
      }
    };

    saveCampus();
  }, [campus, isLoading]);

  const value = {
    campus,
    setCampus,
  };

  return (
    <CampusContext.Provider value={value}>
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (context === undefined) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
