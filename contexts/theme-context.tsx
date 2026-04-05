import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  colors: {
    background: string;
    text: string;
    card: string;
    border: string;
    primary: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
}

const tintColorLight = '#0a7ea4';
const tintColorDark = '#753753';

const lightColors = {
  background: '#ffffff',
  text: '#000000',
  card: '#f3f4f6',
  border: '#e5e7eb',
  primary: '#3b82f6',
  tint: tintColorLight,
  icon: '#687076',
  tabIconDefault: '#687076',
  tabIconSelected: tintColorLight,
};

const darkColors = {
  background: '#1f2937',
  text: '#ffffff',
  card: '#374151',
  border: '#4b5563',
  primary: '#60a5fa',
  tint: tintColorDark,
  icon: '#9BA1A6',
  tabIconDefault: '#9BA1A6',
  tabIconSelected: tintColorDark,
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceTheme = useColorScheme() as Theme;
  const [theme, setTheme] = useState<Theme>(deviceTheme);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
          setTheme(savedTheme);
        } else {
          setTheme(deviceTheme);
        }
      } catch (error) {
        console.error('Failed to load theme from storage:', error);
        setTheme(deviceTheme);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, [deviceTheme]);

  useEffect(() => {
    const saveTheme = async () => {
      if (!isLoading) {
        try {
          await AsyncStorage.setItem('theme', theme);
        } catch (error) {
          console.error('Failed to save theme to storage:', error);
        }
      }
    };

    saveTheme();
  }, [theme, isLoading]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';
  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
