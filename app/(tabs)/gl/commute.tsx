import { ThemedText } from "@/components/themed-text";
import { usePathname } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import Previous from "../../components/Previous";
import { process } from "../../components/process";
import { getProcessSteps } from "../../components/steps";

export default function Commute() {
  const pathname = usePathname();
  const vehicle = pathname.slice(4, pathname.length);
  
  const steps = getProcessSteps(vehicle);

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
      <View style={styles.mainContent}>
        <View style={styles.processSection}>
          <ThemedText style={styles.processTitle}>{process[vehicle]}</ThemedText>
          <View style={styles.infoContainer}>
            <ThemedText>학기 중 공휴일, 휴무일을 제외한 평일</ThemedText>
            <ThemedText>요금: 무료</ThemedText>
          </View>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine}></View>
            <View style={vehicle.includes('bus') ? styles.timelineContentBus : styles.timelineContentShuttle}>
              {steps.map((step: any, index: number) => {
                  const currentHour = new Date().getHours();
                  const currentMinute = new Date().getMinutes();
                  let nextBus = 4
                  if (currentHour >= 6 && currentHour <= 8) {
                    if (currentHour === 8 && currentMinute >= 45) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 8 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour >= 10 && currentHour < 13) {
                    nextBus = 2
                  } else if (currentHour >= 13 && currentHour < 18) {
                    nextBus = 3
                  }
                  return (
                    <View key={index} style={styles.stepContainer}>
                      <View style={nextBus <= index ? styles.stepIconShuttleActive : styles.stepIconShuttleInactive}>
                        <ThemedText style={styles.stepIconText}>{step.clock}</ThemedText>
                      </View>
                      <View style={styles.stepTextContainer}>
                        <ThemedText style={styles.stepTitle}>
                          {step.routeKo}
                        </ThemedText>
                      </View>
                    </View>
                  )
              })}
            </View>
          </View>
        </View>
        <Previous />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: { flex: 1, minHeight: '100%' },
  scrollContent: { alignItems: 'center', justifyContent: 'center', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, marginHorizontal: 'auto', padding: 32 },
  processSection: { flexDirection: 'column', gap: 24, alignItems: 'center' },
  processTitle: { fontSize: 24, fontWeight: '600', marginBottom: 24, margin: 0 },
  infoContainer: { flexDirection: 'column', alignItems: 'center' },
  tabContainer: { flexDirection: 'row', gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#2563eb' },
  tabInactive: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, backgroundColor: '#e5e7eb' },
  tabActiveText: { color: 'white', fontWeight: '600' },
  tabInactiveText: { color: '#374151', fontWeight: '600' },
  timelineContainer: { position: 'relative', width: '100%' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20 },
  timelineContentShuttle: { position: 'relative', flexDirection: 'column', gap: 32, paddingLeft: 32 },
  stepContainer: { flexDirection: 'row', alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 6, alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: 16, zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', color: 'white', borderRadius: 6, alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: 16, zIndex: 10 },
  stepIconText: { color: 'white', fontWeight: '600', fontSize: 16 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: '500', margin: 0 },
  navContainer: { marginTop: 32, flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecorationLine: 'underline' }
});
