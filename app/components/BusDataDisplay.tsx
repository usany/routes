import { ThemedText } from '@/components/themed-text';
import { StyleSheet } from 'react-native';
import { useSeoulBus } from './BusTimeline';
interface BusData {
  routeName: string;
  predictTime1: number | null;
  locationNo1: number;
  stationNm1: string;
}

interface BusDataDisplayProps {
  fetchedData: BusData[];
  isLastStep: boolean;
  index: number;
}

export default function BusDataDisplay({ fetchedData, isLastStep, index }: BusDataDisplayProps) {
  const isuseSeoulBus = useSeoulBus()
  // if (!fetchedData || fetchedData.length === 0) {
  //   return <ThemedText>로딩 중...</ThemedText>;
  // }
  if (isuseSeoulBus) {
    console.log(fetchedData[index])
    const arrmsg = fetchedData[index].arrmsg1;
    const routeName = fetchedData[index].rtNm;
    const predictTime1 = arrmsg.indexOf('분') < 0 ? arrmsg : arrmsg.slice(0, arrmsg.indexOf('분')+1);
    const locationNo1 = arrmsg.indexOf('분') < 0 ? 1 : parseInt(arrmsg.slice(arrmsg.indexOf('[')+1, arrmsg.indexOf('번')))+1;
    const stationNm1 = fetchedData[index-locationNo1 < 0 ? 0 : index-locationNo1]?.stNm;
    return (
      <ThemedText key={index} style={styles.busSubtitle}>
        Bus data: {routeName}
        {predictTime1 !== '출발대기' && predictTime1 !== '운행종료' ? `${predictTime1} (${locationNo1} 정거장) ${stationNm1}` : predictTime1}
        {isLastStep && predictTime1 !== '출발대기' && predictTime1 !== '운행종료' ? `(${stationNm1} ${locationNo1})` : ''}
      </ThemedText>
    );
  }

  return (
    <>
      {fetchedData.map((data: any, dataIndex: number) => {
        const routeName = data.routeName;
        const predictTime1 = data.predictTime1;
        const locationNo1 = data.locationNo1;
        const stationNm1 = data.stationNm1;

        return (
          <ThemedText key={dataIndex} style={styles.busSubtitle}>
            {`Bus data: ${routeName}\n`}
            {predictTime1 ? `${predictTime1}분 (${locationNo1} 정거장) ${stationNm1}` : '대기'}
            {isLastStep && predictTime1 ? `(${stationNm1} ${locationNo1})` : ''}
          </ThemedText>
        );
      })}
    </>
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
  busSubtitle: { fontSize: 14, marginTop: 4, margin: 0 },
});