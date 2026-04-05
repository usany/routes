import { Button } from "@/components/Button";
import { SettingsModal } from "@/components/settings-modal";
import { ThemedText } from "@/components/themed-text";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Place() {
  const [showSettings, setShowSettings] = useState(false);
  const { colors } = useTheme();
  const { text } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <ThemedText style={styles.title}>{text('app.title.gwangneung')}</ThemedText>
        <Button onSettingsPress={() => setShowSettings(true)} />
        <View style={styles.cardsContainer}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardBlue]}
              onPress={() => router.push(`${pathname}/busN` as any)}
            >
              {/* <Ionicons name="information-circle" size={48} color="#2563eb" style={styles.iconBase} />
              <Ionicons name="walk" size={48} color="#2563eb" style={styles.iconBase} /> */}
              <MaterialIcons name="directions-bus" size={53.5} color="#2563eb" style={styles.iconBase}/>
              {/* <MaterialIcons name="subway" size={48} color="#2563eb" />
              <MaterialIcons name="tram" size={48} color="#2563eb" />
              <MaterialIcons name="commute" size={48} color="#2563eb" />
              <MaterialIcons name="directions-car" size={48} color="#2563eb" />
              <MaterialIcons name="directions-bike" size={48} color="#2563eb" /> */}
              <Text style={styles.cardText}>{text('bus.bongsa_nesan')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardGreen]}
              onPress={() => router.push(`${pathname}/busJ` as any)}
            >
              {/* <Ionicons name="home" size={48} color="#16a34a" style={styles.iconBase} /> */}
              <MaterialIcons name="directions-bus-filled" size={53.5} color="#16a34a" style={styles.iconBase}/>
              {/* <MaterialIcons name="directions-walk" size={48} color="#16a34a" />
              <MaterialIcons name="directions-run" size={48} color="#16a34a" />
              <MaterialIcons name="directions-transit" size={48} color="#16a34a" />
              <MaterialIcons name="directions-subway" size={48} color="#16a34a" />
              <MaterialIcons name="directions-ferry" size={48} color="#16a34a" />
              <MaterialIcons name="directions-railway" size={48} color="#16a34a" /> */}
              <Text style={styles.cardText}>{text('bus.bongsa_terminal')}</Text>
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
  cardsContainer: { flexDirection: 'column', gap: 24, width: '100%', maxWidth: 800 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, width: '100%', justifyContent: 'center' },
  cardBase: { flexDirection: 'column', alignItems: 'center', padding: 17, borderRadius: 8, width: '45%', minWidth: 140 },
  cardBlue: { backgroundColor: '#dbeafe' },
  cardGreen: { backgroundColor: '#dcfce7' },
  iconBase: { marginBottom: 8 },
  cardText: { fontWeight: 500, textAlign: 'center', width: '100%' },
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
