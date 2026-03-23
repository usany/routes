import { useSearchParams, Link, useNavigate, useLocation } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { Bus, BusFront, ChevronDown, MonitorStop, PersonStanding, SquareStop, StopCircle } from "lucide-react";
import Schedule from "../../components/Schedule";
import { busCollection } from "../../components/busCollection";
import { process } from "../../components/process";
import { useBusData } from "../../hooks/useBusData";
import { getProcessSteps } from "~/components/steps";

export default function BusTo() {
  const location = useLocation();
  const pathname = location.pathname;
  const vehicle = pathname.slice(4, pathname.length);
  const { busData, timeUntilNextFetch, fetchBusData } = useBusData(vehicle, getProcessSteps);
  
  const steps = getProcessSteps(vehicle);

  if (!vehicle) {
    return (
      <div style={styles.errorContainer as React.CSSProperties}>
        <div style={styles.errorContent as React.CSSProperties}>
          <h1 style={styles.errorTitle as React.CSSProperties}>Invalid Request</h1>
          <p style={styles.errorText as React.CSSProperties}>
            Please select a vehicle and destination.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>{process[vehicle]}</h2>
          {vehicle.includes('bus') && <Schedule vehicle={vehicle} />}
          {vehicle.includes('bus') && (
            <div style={styles.refreshContainer as React.CSSProperties}>
              <p style={styles.refreshText as React.CSSProperties}>
                Next data update in: <span style={styles.refreshCounter as React.CSSProperties}>{timeUntilNextFetch}s</span>
              </p>
              <button
                onClick={fetchBusData}
                style={styles.refreshButton as React.CSSProperties}
              >
                Refresh Now
              </button>
            </div>
          )}
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
                        {fetchedData && (() => {
                          const targetDataList = fetchedData.filter((data: any) => data.locationNo1 === 1);
                          return targetDataList.length > 0 ? (
                            <div style={styles.busIncomingContainer as React.CSSProperties}>
                              <div style={styles.busIncomingText as React.CSSProperties}>
                                {targetDataList.map((data: any, idx: number) => (
                                  <div key={idx}>{data.routeName}</div>
                                ))}
                              </div>
                              <BusFront />
                            </div>
                          ) : null;
                        })()}
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
                        fetchedData.map((data: any, dataIndex: number) => {
                          const routeName = data.routeName
                          const predictTime1 = data.predictTime1;
                          const locationNo1 = data.locationNo1
                          const stationNm1 = data.stationNm1
                          return (
                            <p key={dataIndex} style={styles.busSubtitle as React.CSSProperties}>
                              Bus data: {routeName}
                              <br />
                              {predictTime1 ? `${predictTime1}분 (${locationNo1} 정거장) ${stationNm1}` : '대기'}
                              {index === steps.length - 1 && predictTime1 ? `(${stationNm1} ${locationNo1})` : ''}
                            </p>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div style={styles.navContainer as React.CSSProperties}>
          <div style={styles.navInner as React.CSSProperties}>
            <Link
              to={pathname.includes('gw') ? "/gw" : pathname.includes('se') ? "/se" : "/gl"}
              style={styles.navLink as React.CSSProperties}
            >
              ← Back to {pathname.includes('gw') ? "/gw" : pathname.includes('se') ? "/se" : "/gl"}
            </Link>
          </div>
        </div>
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
  
  // Refresh section
  refreshContainer: { textAlign: 'center', marginBottom: 16 },
  refreshText: { fontSize: 14, color: '#4b5563', marginBottom: 8, margin: 0 },
  refreshCounter: { fontWeight: 600, color: '#2563eb' },
  refreshButton: { padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, transition: 'background-color 0.2s', cursor: 'pointer' },

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

  // Link
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
