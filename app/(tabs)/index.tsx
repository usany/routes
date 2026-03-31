import Button from "@/components/Button";
import { SettingsModal } from "@/components/settings-modal";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/contexts/theme-context";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";


export default function HomeScreen() {
  const { colors } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>경희대 서울캠퍼스</Text>
        <View style={styles.headerButtons}>
          <Pressable onPress={() => setShowSettings(true)} style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={colors.text} />
          </Pressable>
          <ThemeToggle />
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Text style={{ color: colors.text }}>어디로 떠나볼까요?</Text>
      </View>
      <View style={styles.footerContainer}>
        <Button theme='primary' label="Choose a photo" />
        <Button label="Use this photo" />
      </View>
      <SettingsModal
        visible={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: { textAlign: 'center', width: '100%' },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 32, margin: 0 },
  cardsContainer: { display: 'flex', flexDirection: 'column', gap: 24 },
  cardBlue: { backgroundColor: '#dbeafe' },
  cardGreen: { backgroundColor: '#dcfce7' },
  cardYellow: { backgroundColor: '#fef08a' },
  cardPurple: { backgroundColor: '#f3e8ff' },
  iconBase: { width: 48, height: 48, marginBottom: 8 },
  iconBlue: { color: '#2563eb' },
  iconGreen: { color: '#16a34a' },
  iconYellow: { color: '#ca8a04' },
  iconPurple: { color: '#9333ea' },
  cardText: { fontWeight: 500 },
  // container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  // grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, maxWidth: 672, margin: '0 auto' },
  // cardBase: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, borderRadius: 8, transition: 'background-color 0.2s', textDecoration: 'none', color: 'inherit' },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
