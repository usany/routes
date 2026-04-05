import { ThemedText } from "@/components/themed-text";
import { usePathname } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BusTimeline from "../components/BusTimeline";
import Previous from "../components/Previous";
import RefreshCounter from "../components/RefreshCounter";
import { process } from "../components/process";
import Schedule from "./Schedule";

export default function BusDisplay() {
  const pathname = usePathname();
  const vehicle = pathname.slice(4, pathname.length);  

  if (!vehicle) {
    return (
      <View style={styles.errorContainer}>
        <View style={styles.errorContent}>
          <Text style={styles.errorTitle}>Invalid Request</Text>
          <Text style={styles.errorText}>
            Please select a vehicle and destination.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mainContent}>
          <View style={styles.processSection}>
            <ThemedText style={styles.processTitle}>{process[vehicle]}</ThemedText>
            {vehicle.includes('bus') && <Schedule />}
            {vehicle.includes('bus') && <RefreshCounter />}
            <BusTimeline />
          </View>
          <Previous />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Error state
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  errorContent: { alignItems: 'center' },
  errorTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 16 },
  errorText: { fontSize: 18, color: '#4b5563' },

  // Main layout
  mainContainer: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1, alignItems: 'center', paddingBottom: 96 },
  mainContent: { alignItems: 'center', maxWidth: 672, padding: 32, width: "100%" },
  processSection: { alignItems: 'center', width: "100%" },
  processTitle: { fontSize: 24, fontWeight: '600', marginBottom: 24 },
  
  // Info text
  infoContainer: { alignItems: 'center' },

  // Tabs
  tabContainer: { flexDirection: 'row', gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: '#2563eb' },
  tabInactive: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, backgroundColor: '#e5e7eb' },

  // Timeline
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { paddingLeft: 32, paddingTop: 20 },
  timelineContentShuttle: { paddingLeft: 32 },

  // Timeline item
  stepContainer: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', borderRadius: 6, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', borderRadius: 6, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  stepTextContainer: { maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: '500' },

  // Bus specific
  busStepContainer: { flexDirection: 'row', gap: 24 },
  busIconWrapper: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busIncomingContainer: { flexDirection: 'row', height: 64, alignItems: 'center', marginLeft: -80 },
  busIncomingText: { marginRight: 8, textAlign: 'right' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', borderRadius: 50, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  busSubtitle: { fontSize: 14, color: '#4b5563', marginTop: 4 },
});