import { useSearchParams, Link, useLocation } from "react-router";
import { useState } from "react";
import { getProcessSteps } from "~/components/steps";

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

export default function Shuttle() {
  // const [searchParams] = useSearchParams();
  // const vehicle = searchParams.get("vehicle") || "shuttleSeoul";
  // const [activeShuttleTab, setActiveShuttleTab] = useState<'seoul' | 'global'>('seoul');
  const activeShuttleTab = useLocation().pathname.includes('se') ? 'seoul' : 'global';
  const steps = getProcessSteps(activeShuttleTab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal');
  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>
            {activeShuttleTab === 'seoul' ? '서울-국제 셔틀버스' : '국제-서울 셔틀버스'}
          </h2>
          <div style={styles.infoContainer as React.CSSProperties}>
            <div>공휴일, 휴무일을 제외한 평일</div>
            <div>요금: 페이코 승차권 예약 2000원</div>
          </div>
          <div style={styles.tabContainer as React.CSSProperties}>
            <Link
              to={`/se/shuttle`}
              style={(activeShuttleTab === 'seoul' ? styles.tabActive : styles.tabInactive) as React.CSSProperties}
            >
              서울-국제 셔틀
            </Link>
            <Link
              to={`/gl/shuttle`}
              style={(activeShuttleTab === 'global' ? styles.tabActive : styles.tabInactive) as React.CSSProperties}
            >
              국제-서울 셔틀
            </Link>
          </div>
          <div style={styles.timelineContainer as React.CSSProperties}>
            <div style={styles.timelineLine as React.CSSProperties}></div>
            <div style={styles.timelineContentShuttle as React.CSSProperties}>
              {steps.map((step, index) => {
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
                  <div key={index} style={styles.stepContainer as React.CSSProperties}>
                    <div style={(nextBus <= index ? styles.stepIconShuttleActive : styles.stepIconShuttleInactive) as React.CSSProperties}>
                      {step.clock}
                    </div>
                    <div style={styles.stepTextContainer as React.CSSProperties}>
                      <p style={styles.stepTitle as React.CSSProperties}>
                        {step.routeKo}
                      </p>
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
              to="/se"
              style={styles.navLink as React.CSSProperties}
            >
              ← Back to Seoul Campus
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  mainContainer: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  mainContent: { textAlign: 'center', maxWidth: 672, margin: '0 auto', padding: 32 },
  processSection: { display: 'flex', flexDirection: 'column', gap: 24 },
  processTitle: { fontSize: 24, fontWeight: 600, marginBottom: 24, margin: 0 },
  infoContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  tabContainer: { display: 'flex', gap: 8, marginBottom: 24, justifyContent: 'center' },
  tabActive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#2563eb', color: 'white', border: 'none', cursor: 'pointer' },
  tabInactive: { padding: '8px 16px', borderRadius: 8, transition: 'background-color 0.2s', backgroundColor: '#e5e7eb', color: '#374151', border: 'none', cursor: 'pointer' },
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentShuttle: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32 },
  stepContainer: { display: 'flex', alignItems: 'center', gap: 24 },
  stepIconShuttleActive: { width: 72, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepIconShuttleInactive: { width: 72, height: 64, backgroundColor: '#4b5563', color: 'white', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 16, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
