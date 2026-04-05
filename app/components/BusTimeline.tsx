import { ThemedText } from "@/components/themed-text";
import { MaterialIcons } from "@expo/vector-icons";
import { usePathname } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useBusData } from "../hooks/useBusData";
import BusDataDisplay from "./BusDataDisplay";
import BusIncomingDisplay from "./BusIncomingDisplay";
import { getProcessSteps } from "./steps";

export const BusTimelineSkeleton = () => {
  const skeletonItems = Array.from({ length: 3 }, (_, i) => i);
  
  return (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineLine} />
      <View style={styles.timelineContentBus}>
        {skeletonItems.map((index) => (
          <View key={index} style={styles.busStepContainer}>
            <View style={styles.busIconWrappeaar}>
              <View style={styles.busIconInner}>
                <View style={[styles.busStopIcon, styles.skeletonIcon]} />
              </View>
            </View>
            <View style={styles.stepTextContainer}>
              <View style={[styles.skeletonText, styles.skeletonTitle]} />
              <View style={[styles.skeletonText, styles.skeletonSubtitle]} />
              <View style={[styles.skeletonText, styles.skeletonData]} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const useSeoulBus = () => {
  const pathname = usePathname();
  return pathname.includes('busOne') || pathname.includes('busTwo') || pathname.includes('busThree');
}

export default function BusTimeline() {
  const pathname = usePathname();
  const vehicle = pathname.slice(4, pathname.length);
  const steps = getProcessSteps(vehicle);
  const { busData, timeUntilNextFetch, fetchBusData } = useBusData(pathname, getProcessSteps);
  const isuseSeoulBus = useSeoulBus();
  const parsedBusData = typeof busData === 'string' ? JSON.parse(busData) : busData;
  let itemList
  if (isuseSeoulBus && parsedBusData?.response?.msgBody?.itemList) {
    itemList = parsedBusData.response.msgBody.itemList;
  } else {
    itemList = []
  }
  if ((!isuseSeoulBus && !Object.keys(busData).length) || (isuseSeoulBus && itemList.length === 0)) {
    return <BusTimelineSkeleton />;
  }

  return (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineLine} />
      <View style={styles.timelineContentBus}>
        {steps.map((step, index) => {
          // For bus steps, we can access the fetched data from state
          const stepId = typeof step !== 'string' && 'id' in step ? (step as any).id : null;
          const fetchedData = !isuseSeoulBus ? busData[stepId] : itemList;
          return (
            <View key={index} style={styles.busStepContainer}>
              <View style={styles.busIconWrapper}>
                <View style={styles.busIconInner}>
                  {fetchedData && (
                    <BusIncomingDisplay fetchedData={fetchedData} />
                  )}
                  <View style={styles.busStopIcon}>
                    <MaterialIcons name="keyboard-arrow-down" size={28} color="#fff" />
                  </View>
                </View>
              </View>
              <View style={styles.stepTextContainer}>
                <ThemedText style={styles.stepTitle}>
                  {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
                </ThemedText>
                <BusDataDisplay 
                  fetchedData={fetchedData} 
                  isLastStep={index === steps.length - 1}
                  index={index}
                />
              </View>
            </View>
          )
        })}
      </View>
    </View>
  );
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

  // Skeleton loading
  skeletonIcon: { backgroundColor: '#e5e7eb' },
  skeletonText: { backgroundColor: '#e5e7eb', borderRadius: 4 },
  skeletonTitle: { width: 200, height: 20, marginBottom: 8 },
  skeletonSubtitle: { width: 150, height: 16, marginBottom: 8 },
  skeletonData: { width: 100, height: 14 },
});