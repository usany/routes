import { useSearchParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { Bus, BusFront, ChevronDown, MonitorStop, PersonStanding, SquareStop, StopCircle } from "lucide-react";
import Schedule from "../components/Schedule";
import { steps } from "~/components/steps";

export const busCollection = {
  seoul: {
    '01': 105900003,
    '02': 105900002,
    'A01': 100000025,
  },
  gwangneung: {
    '2': 241348004,
    '21': 222000170,
    '2-2A': 241348002,
    '2A': 241348001,
    '2-2': 241348005
  },
  global: {
    'M5107': 234001243,
    '5100': 200000115,
    '1112(reserved)': 200000333,
    '1112': 234000016,
    'P9242(퇴근)': 233000335,
    '28-3': 241425038,
    '900': 200000010,
    '7-2': 200000040,
    '53': 241425010,
    '18-1': 241425018,
    '9-1': 200000186,
    '1560A': 234000884,
    '7000': 200000112,
    '9': 200000103,
    '310': 200000024,
    '5': 200000076,
    'M5107(예약)': 200000335,
    '1550-1(예약)': 223000151,
    '1560B': 228000433,
    '1550-1': 234000324,
    '32': 241425007
  },
}
export const process = {
  busSeoulOne: '회기역-경희대 01번',
  busSeoulTwo: '회기역-외대앞역 02번',
  busThree: '자율주행 A01번',
  busTo: '외국어대학-사색의 광장',
  busFrom: '사색의 광장-정문 건너편',
  shuttleSeoul: '서울-국제 셔틀버스',
  shuttleGlobal: '국제-서울 셔틀버스',
  commute: '영통역 통학버스',
  busGwangneungOne: '봉선사입구-내산정 방면',
  busGwangneungTwo: '봉선사입구-종점 방면',
} as { [key: string]: string };

export default function Process() {
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle");
  // const navigate = useNavigate();
  // const from = searchParams.get("from");
  // const destination = searchParams.get("destination");
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  const [activeShuttleTab, setActiveShuttleTab] = useState<'seoul' | 'global'>('seoul');
  
  const handleShuttleTabChange = (tab: 'seoul' | 'global') => {
    setActiveShuttleTab(tab);
    const newVehicle = tab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal';
    setSearchParams({ vehicle: newVehicle });
  };
  
  useEffect(() => {
    if (vehicle?.includes('shuttle')) {
      setActiveShuttleTab(vehicle === 'shuttleSeoul' ? 'seoul' : 'global');
    }
  }, [vehicle]);
  
  const fetchStep = async (id: number) => {
    let response
    if (vehicle === 'busSeoulOne' || vehicle === 'busSeoulTwo') {
      response = await fetch(`http://localhost:3000/bus/${id}`)
      const responseText = await response.text();
      return responseText
    } else {
      response = await fetch(`https://apis.data.go.kr/6410000/busarrivalservice/v2/getBusArrivalListv2?serviceKey=2285040a0cf11847ddd747ab39d20eb723e34a91e8d5fb404b9034c8e6e71d97&stationId=${id}&format=json`);
    }
      const data = await response.json()
      const res = data.response.msgBody.busArrivalList;
      return res;
  }
  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    steps.forEach(async (step) => {
      if (typeof step !== 'string' && 'id' in step) {
        const data = await fetchStep((step as any).id);
        const vehId1Match = data.match(/<arrmsg1>(.*?)<\/arrmsg1>/);
        console.log(data)
        console.log(vehId1Match)
        setBusData(prev => ({ ...prev, [(step as any).id]: data }));
      }
    });
    // const dataBus = await fetchBus()
    // console.log(dataBus)
    // Reset countdown when fetch completes
    setTimeUntilNextFetch(60);
  }, [vehicle]);

  useEffect(() => {
    // if (vehicle === 'busTo' || vehicle === 'busFrom' || vehicle === 'busGwangneungOne' || vehicle === 'busGwangneungTwo') {
    if (vehicle?.includes('bus')) {
      // Fetch immediately
      fetchBusData();
      
      // Then fetch every minute (60000 milliseconds)
      const interval = setInterval(fetchBusData, 60000);

      // Countdown timer - update every second
      const countdownInterval = setInterval(() => {
        setTimeUntilNextFetch(prev => {
          if (prev <= 1) return 60; // Reset when reaching 0
          return prev - 1;
        });
      }, 1000);

      // Cleanup intervals on component unmount
      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [vehicle, fetchBusData]);

  const getProcessSteps = (vehicleType: string) => {
    return steps[vehicleType] || [];
  };

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

  const steps = getProcessSteps(vehicle.includes('shuttle') ? (activeShuttleTab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal') : vehicle);
  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>{vehicle.includes('shuttle') ? process[activeShuttleTab === 'seoul' ? 'shuttleSeoul' : 'shuttleGlobal'] : process[vehicle]}</h2>
          {vehicle === 'commute' && (
            <div style={styles.infoContainer as React.CSSProperties}>
              <div>학기 중 공휴일, 휴무일을 제외한 평일</div>
              <div>요금: 무료</div>
            </div>
          )}
          <div style={styles.timelineContainer as React.CSSProperties}>
            <div style={styles.timelineLine as React.CSSProperties}></div>
            <div style={(vehicle.includes('bus') ? styles.timelineContentBus : styles.timelineContentShuttle) as React.CSSProperties}>
              {steps.map((step, index) => {
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
              to={vehicle.includes('Gwangneung') ? "/gwangneung" : vehicle.includes('Seoul') ? "/place-one" : "/place-two"}
              style={styles.navLink as React.CSSProperties}
            >
              ← Back to {vehicle.includes('Gwangneung') ? "/gwangneung" : vehicle.includes('Seoul') ? "/place-one" : "/place-two"}
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
