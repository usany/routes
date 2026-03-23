import { ChevronDown } from "lucide-react";
import BusDataDisplay from "./BusDataDisplay";
import BusIncomingDisplay from "./BusIncomingDisplay";
import { getProcessSteps } from "./steps";
import { useBusData } from "~/hooks/useBusData";
import { useLocation } from "react-router";


export default function BusTimeline() {
  const location = useLocation();
  const pathname = location.pathname;
  const vehicle = pathname.slice(4, pathname.length);
  const steps = getProcessSteps(vehicle);
  const { busData, timeUntilNextFetch, fetchBusData } = useBusData(vehicle, getProcessSteps);
  
  return (
    <div style={styles.timelineContainer as React.CSSProperties}>
      <div style={styles.timelineLine as React.CSSProperties}></div>
      <div style={styles.timelineContentBus as React.CSSProperties}>
        {steps.map((step, index) => {
          // For bus steps, we can access the fetched data from state
          const stepId = typeof step !== 'string' && 'id' in step ? (step as any).id : null;
          const fetchedData = stepId ? busData[stepId] : null;
          return (
            <div key={index} style={styles.busStepContainer as React.CSSProperties}>
              <div style={styles.busIconWrapper as React.CSSProperties}>
                <div style={styles.busIconInner as React.CSSProperties}>
                  {fetchedData && (
                    <BusIncomingDisplay fetchedData={fetchedData} styles={styles} />
                  )}
                  <div style={styles.busStopIcon as React.CSSProperties}>
                    <ChevronDown />
                  </div>
                </div>
              </div>
              <div style={styles.stepTextContainer as React.CSSProperties}>
                <p style={styles.stepTitle as React.CSSProperties}>
                  {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
                </p>
                {fetchedData && (
                  <BusDataDisplay 
                    fetchedData={fetchedData} 
                    isLastStep={index === steps.length - 1}
                    styles={styles}
                  />
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
const styles = {
  // Error state
  errorContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' },
  errorContent: { textAlign: 'center' },
  errorTitle: { fontSize: 36, fontWeight: 'bold', marginBottom: 16, margin: 0 },
  errorText: { fontSize: 18, color: '#4b5563', margin: 0 },

  // Main layout
  mainContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, margin: '0 auto', padding: 32 },
  processSection: { display: 'flex', flexDirection: 'column', gap: 24 },
  processTitle: { fontSize: 24, fontWeight: 600, marginBottom: 24, margin: 0 },
  
  // Info text
  infoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },

  // Tabs
  tabContainer: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' },
  tabInactive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', cursor: 'pointer' },

  // Timeline
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20 },
  timelineContentShuttle: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32 },

  // Timeline item
  stepContainer: { display: 'flex', alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },

  // Bus specific
  busStepContainer: { display: 'flex', gap: 24 },
  busIconWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busIncomingContainer: { display: 'flex', height: 64, alignItems: 'center', marginLeft: -80 },
  busIncomingText: { marginRight: 8, textAlign: 'right' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, zIndex: 10 },
  busSubtitle: { fontSize: 14, color: '#4b5563', marginTop: 4, margin: 0 },

}