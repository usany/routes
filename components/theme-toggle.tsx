import { useTheme } from '@/contexts/theme-context';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isDark, colors } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: colors.card,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Ionicons
        name={isDark ? 'sunny' : 'moon'}
        size={20}
        color={colors.text}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
