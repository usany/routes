import { Button } from "@/components/Button";
import { SettingsModal } from "@/components/settings-modal";
import { ThemedText } from "@/components/themed-text";
import { useLanguage } from "@/contexts/language-context";
import { useTheme } from "@/contexts/theme-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
export default function PlaceOne() {
  const [showSettings, setShowSettings] = useState(false);
  const { colors } = useTheme();
  const { text } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <ThemedText style={styles.title}>{text('app.title')}</ThemedText>
        <Button onSettingsPress={() => setShowSettings(true)} />
        <View style={styles.cardsContainer}>
          <View style={styles.grid}>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardBlue]}
              onPress={() => router.push(`${pathname}/busOne` as any)}
            >
              {/* <Ionicons name="information-circle" size={48} color="#2563eb" style={styles.iconBase} /> */}
              <MaterialIcons name="airport-shuttle" size={53.5} color="#2563eb" style={styles.iconBase}/>
              <Text style={styles.cardText}>{text('bus.hoegi01')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardGreen]}
              onPress={() => router.push(`${pathname}/busTwo` as any)}
            >
              {/* <Ionicons name="swap-horizontal" size={48} color="#16a34a" style={styles.iconBase} /> */}
              <MaterialIcons name="directions-car" size={53.5} color="#16a34a" style={styles.iconBase} />
              <Text style={styles.cardText}>{text('bus.hoegi02')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardYellow]}
              onPress={() => router.push(`${pathname}/busThree` as any)}
            >
              <Ionicons name="navigate" size={48} color="#ca8a04" style={styles.iconBase} />
              <Text style={styles.cardText}>{text('bus.autonomous')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cardBase, styles.cardPurple]}
              onPress={() => router.push(`${pathname}/shuttle` as any)}
            >
              <Ionicons name="swap-horizontal" size={48} color="#9333ea" style={styles.iconBase} />
              <Text style={styles.cardText}>{text('bus.shuttle')}</Text>
            </TouchableOpacity>
            <SettingsModal
              visible={showSettings} 
              onClose={() => setShowSettings(false)} />
          </View>
        </View>
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
  cardYellow: { backgroundColor: '#fef08a' },
  cardPurple: { backgroundColor: '#f3e8ff' },
  iconBase: { marginBottom: 8 },
  cardText: { fontWeight: 500, textAlign: 'center' },
});
