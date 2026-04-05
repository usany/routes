import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

interface BusData {
  locationNo1: number;
  routeName: string;
}

interface BusIncomingDisplayProps {
  fetchedData: BusData[];
}

export default function BusIncomingDisplay({ fetchedData }: BusIncomingDisplayProps) {
  const targetDataList = fetchedData.filter((data: any) => data.locationNo1 === 1);
  return targetDataList.length > 0 ? (
    <View style={styles.busIncomingContainer}>
      <View style={styles.busIncomingText}>
        {targetDataList.map((data: any, idx: number) => (
          <ThemedText key={idx}>{data.routeName}</ThemedText>
        ))}
      </View>
      <MaterialIcons name="directions-bus" size={24} color="#111827" />
    </View>
  ) : null;
}
const styles = StyleSheet.create({
  // Error state
  errorContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%' },
  errorContent: { textAlign: 'center' },
  errorTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 16, margin: 0 },
  errorText: { fontSize: 18, color: '#4b5563', margin: 0 },

  // Main layout
  mainContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100%', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, padding: 32 },
  processSection: { flexDirection: 'column', gap: 24 },
  processTitle: { fontSize: 24, fontWeight: 600, marginBottom: 24, margin: 0 },
  
  // Info text
  infoContainer: { flexDirection: 'column', alignItems: 'center' },

  // Tabs
  tabContainer: { gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { padding: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#2563eb', color: 'white', cursor: 'pointer' },
  tabInactive: { padding: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#e5e7eb', color: '#374151', cursor: 'pointer' },

  // Timeline
  timelineContainer: { position: 'relative', width: '100%' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20, width: '100%' },
  timelineContentShuttle: { position: 'relative', flexDirection: 'column', gap: 32, paddingLeft: 32 },

  // Timeline item
  stepContainer: { alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', borderRadius: 6, alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', borderRadius: 6, alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },

  // Bus specific
  busStepContainer: { gap: 24, flexDirection: 'row' },
  busIconWrapper: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busIncomingContainer: { height: 64, alignItems: 'center', marginLeft: -80 },
  busIncomingText: { marginRight: 8, textAlign: 'right' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', borderRadius: 9999, alignItems: 'center', justifyContent: 'center', zIndex: 10 },
  busSubtitle: { fontSize: 14, color: '#4b5563', marginTop: 4, margin: 0 },
});
