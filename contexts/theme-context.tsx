import React, { createContext, useContext, useEffect, useState } from 'react';
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
  };
}

const lightColors = {
  background: '#ffffff',
  text: '#000000',
  card: '#f3f4f6',
  border: '#e5e7eb',
  primary: '#3b82f6',
};

const darkColors = {
  background: '#1f2937',
  text: '#ffffff',
  card: '#374151',
  border: '#4b5563',
  primary: '#60a5fa',
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

  useEffect(() => {
    setTheme(deviceTheme);
  }, [deviceTheme]);

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
