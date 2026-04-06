import { ThemedText } from "@/components/themed-text";
import { usePathname, useRouter } from "expo-router";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { getProcessSteps } from "./steps";

export const shuttleSeoul = [
  "07:10",
  "10:00",
  "11:55",
  "13:30",
  "16:40",
] as string[];

export const shuttleGlobal = [
  "07:20",
  "10:00",
  "13:00",
  "16:40",
  "18:00",
] as string[];

export default function ShuttleDisplay() {
  const router = useRouter();
  const pathname = usePathname()
  const activeShuttleTab = pathname.includes('se') ? 'seoul' : 'global'
  const steps = getProcessSteps(`shuttle${activeShuttleTab.charAt(0).toUpperCase() + activeShuttleTab.slice(1)}`);
  return (
    <ScrollView style={styles.mainContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.mainContent}>
        <View style={styles.processSection}>
          <ThemedText type="title" style={styles.processTitle}>
            {activeShuttleTab === 'seoul' ? '서울-국제 셔틀버스' : '국제-서울 셔틀버스'}
          </ThemedText>
          <View style={styles.infoContainer}>
            <ThemedText>공휴일, 휴무일을 제외한 평일</ThemedText>
            <ThemedText>요금: 페이코 승차권 예약 2000원</ThemedText>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => router.push('/se/shuttle')}
              style={activeShuttleTab === 'seoul' ? styles.tabActive : styles.tabInactive}
            >
              <ThemedText style={activeShuttleTab === 'seoul' ? styles.tabInactiveText : styles.tabActiveText}>
                서울-국제 셔틀
              </ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push('/gl/shuttle')}
              style={activeShuttleTab === 'global' ? styles.tabActive : styles.tabInactive}
            >
              <ThemedText style={activeShuttleTab === 'global' ? styles.tabInactiveText : styles.tabActiveText}>
                국제-서울 셔틀
              </ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine}></View>
            <View style={styles.timelineContentShuttle}>
              {steps.map((step: any, index: number) => {
                const currentHour = new Date().getHours();
                const currentMinute = new Date().getMinutes();
                let nextBus = 5;
                
                if (activeShuttleTab === 'seoul') {
                  if (currentHour >= 6 && currentHour <= 7) {
                    if (currentHour === 7 && currentMinute >= 10) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 7 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour > 10 && currentHour <= 11) {
                    if (currentHour === 11 && currentMinute >= 55) {
                      nextBus = 3
                    } else {
                      nextBus = 2
                    }
                  } else if (currentHour > 11 && currentHour <= 13) {
                    if (currentMinute >= 30) {
                      nextBus = 4
                    } else {
                      nextBus = 3
                    }
                  } else if (currentHour > 13 && currentHour <= 16) {
                    if (currentHour === 16 && currentMinute >= 40) {
                      nextBus = 5
                    } else {
                      nextBus = 4
                    }
                  }
                } else if (activeShuttleTab === 'global') {
                  if (currentHour >= 6 && currentHour <= 7) {
                    if (currentHour === 7 && currentMinute >= 20) {
                      nextBus = 1
                    } else {
                      nextBus = 0
                    }
                  } else if (currentHour > 7 && currentHour < 10) {
                    nextBus = 1
                  } else if (currentHour > 10 && currentHour < 13) {
                    nextBus = 2
                  } else if (currentHour >= 13 && currentHour <= 16) {
                    if (currentMinute >= 40) {
                      nextBus = 4
                    } else {
                      nextBus = 3
                    }
                  } else if (currentHour > 16 && currentHour < 18) {
                    nextBus = 4
                  }
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
        <View style={styles.navContainer}>
          <View style={styles.navInner}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/' + (activeShuttleTab === 'seoul' ? 'gl' : 'se') as any)}>
              <ThemedText style={styles.navLink}>← Back to {activeShuttleTab === 'seoul' ? 'Global activeShuttleTab' : 'Seoul activeShuttleTab'}</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
