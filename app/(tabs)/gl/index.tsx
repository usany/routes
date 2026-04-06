import { Button } from "@/components/Button";
import { SettingsModal } from "@/components/settings-modal";
import { ThemedText } from "@/components/themed-text";
import { useLanguage } from "@/contexts/language-context";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function PlaceTwo() {
  const [showSettings, setShowSettings] = useState(false);
  const { text } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <ThemedText style={styles.title}>{text('app.title.global')}</ThemedText>
        <Button onSettingsPress={() => setShowSettings(true)} />
        <View style={styles.cardsContainer}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardRed]}
              onPress={() => router.push(`${pathname}/busTo` as any)}
            >
              <Ionicons name="arrow-down" size={48} color="#dc2626" style={styles.iconBase} />
              {/* <Ionicons name="arrow-forward" size={48} color="#dc2626" style={styles.iconBase} /> */}
              <Text style={styles.cardText}>{text('bus.foreign_lang')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardIndigo]}
              onPress={() => router.push(`${pathname}/busFrom` as any)}
            >
              <Ionicons name="arrow-up" size={48} color="#4f46e5" style={styles.iconBase} />
              {/* <Ionicons name="arrow-back" size={48} color="#4f46e5" style={styles.iconBase} /> */}
              <Text style={styles.cardText}>{text('bus.sasak')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardPink]}
              onPress={() => router.push(`${pathname}/commute` as any)}
            >
              <Ionicons name="location" size={48} color="#db2777" style={styles.iconBase} />
              <Text style={styles.cardText}>{text('bus.yeongtong')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardTeal]}
              onPress={() => router.push(`${pathname}/shuttle` as any)}
            >
              <Ionicons name="swap-horizontal" size={48} color="#0d9488" style={styles.iconBase} />
              {/* <Ionicons name="home" size={48} color="#0d9488" style={styles.iconBase} /> */}
              <Text style={styles.cardText}>{text('bus.global_shuttle')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <SettingsModal
          visible={showSettings} 
          onClose={() => setShowSettings(false)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 96 },
  contentWrapper: { alignItems: 'center', width: '100%' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 32 },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 32 },
  cardsContainer: { flexDirection: 'column', gap: 24, width: '100%', maxWidth: 800 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, width: '100%', justifyContent: 'center' },
  cardBase: { flexDirection: 'column', alignItems: 'center', padding: 17, borderRadius: 8, width: '45%', minWidth: 140 },
  cardRed: { backgroundColor: '#fee2e2' },
  cardIndigo: { backgroundColor: '#e0e7ff' },
  cardPink: { backgroundColor: '#fce7f3' },
  cardTeal: { backgroundColor: '#ccfbf1' },
  iconBase: { marginBottom: 8 },
  cardText: { fontWeight: 500, textAlign: 'center' },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
});
