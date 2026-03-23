import { useSearchParams, Link, useNavigate } from "react-router";
import { useState, useEffect, useCallback } from "react";
import { Bus, BusFront, ChevronDown, MonitorStop, PersonStanding, SquareStop, StopCircle } from "lucide-react";
import Schedule from "../../components/Schedule";

export default function BusFrom() {
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicle = searchParams.get("vehicle") || "busSeoulTwo";
  const [busData, setBusData] = useState<{ [key: number]: any }>({});
  const [timeUntilNextFetch, setTimeUntilNextFetch] = useState(60);
  
  const fetchStep = async (id: number) => {
    const response = await fetch(`http://localhost:3000/bus/${id}`);
    const responseText = await response.text();
    return responseText;
  }

  const fetchBusData = useCallback(async () => {
    const steps = getProcessSteps(vehicle);
    steps.forEach(async (step) => {
      if (typeof step !== 'string' && 'id' in step) {
        const data = await fetchStep((step as any).id);
        setBusData(prev => ({ ...prev, [(step as any).id]: data }));
      }
    });
    setTimeUntilNextFetch(60);
  }, [vehicle]);

  useEffect(() => {
    if (vehicle?.includes('bus')) {
      fetchBusData();
      const interval = setInterval(fetchBusData, 60000);
      const countdownInterval = setInterval(() => {
        setTimeUntilNextFetch(prev => {
          if (prev <= 1) return 60;
          return prev - 1;
        });
      }, 1000);
      return () => {
        clearInterval(interval);
        clearInterval(countdownInterval);
      };
    }
  }, [vehicle, fetchBusData]);

  const getProcessSteps = (vehicleType: string) => {
    const steps: { [key: string]: (string | { id: number; nameKo: string; nameEn: string })[] } = {
      busSeoulTwo: [
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"},
        {id: 105900057, nameKo: "동안교회", nameEn: "Dongan Church"},
        {id: 105900024, nameKo: "경희중고", nameEn: "Kyunghee Middle/High School"},
        {id: 105900023, nameKo: "경희맨션", nameEn: "Kyunghee Apartment"},
        {id: 105900021, nameKo: "경희대동문", nameEn: "Kyunghee University East Gate"},
        {id: 105900019, nameKo: "외대.경희대후문", nameEn: "Foreign Language University/Kyunghee University Back Gate"},
        {id: 105000561, nameKo: "천장산로33", nameEn: "Cheonjangsan-ro 33"},
        {id: 105000562, nameKo: "삼성래미안", nameEn: "Samsung Raemian"},
        {id: 105000563, nameKo: "래미안라그란데", nameEn: "Raemian Lagrande"},
        {id: 105000044, nameKo: "이문동우체국", nameEn: "Imun-dong Post Office"},
        {id: 105900056, nameKo: "외대앞역", nameEn: "Foreign Language University Front Station"},
        {id: 105000564, nameKo: "래미안라그란데", nameEn: "Raemian Lagrande"},
        {id: 105900016, nameKo: "삼성래미안", nameEn: "Samsung Raemian"},
        {id: 105900060, nameKo: "천장산로33", nameEn: "Cheonjangsan-ro 33"},
        {id: 105900012, nameKo: "외대.경희대후문", nameEn: "Foreign Language University/Kyunghee University Back Gate"},
        {id: 105900011, nameKo: "경희대동문", nameEn: "Kyunghee University East Gate"},
        {id: 105900009, nameKo: "경희맨션", nameEn: "Kyunghee Apartment"},
        {id: 105900007, nameKo: "경희중고", nameEn: "Kyunghee Middle/High School"},
        {id: 105900006, nameKo: "동안교회", nameEn: "Dongan Church"},
        {id: 105900061, nameKo: "시조사삼거리", nameEn: "Sijosa Intersection"},
        {id: 105900027, nameKo: "회기역", nameEn: "Hoegei Station"}
      ],
    };
    return steps[vehicleType] || [];
  };

  const steps = getProcessSteps(vehicle);
  return (
    <div style={styles.mainContainer as React.CSSProperties}>
      <div style={styles.mainContent as React.CSSProperties}>
        <div style={styles.processSection as React.CSSProperties}>
          <h2 style={styles.processTitle as React.CSSProperties}>회기역-외대앞역 02번</h2>
          <Schedule vehicle={vehicle} />
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
          <div style={styles.timelineContainer as React.CSSProperties}>
            <div style={styles.timelineLine as React.CSSProperties}></div>
            <div style={styles.timelineContentBus as React.CSSProperties}>
              {steps.map((step, index) => {
                const stepId = typeof step !== 'string' && 'id' in step ? (step as any).id : null;
                const fetchedData = stepId ? busData[stepId] : null;
                return (
                  <div key={index} style={styles.busStepContainer as React.CSSProperties}>
                    <div style={styles.busIconWrapper as React.CSSProperties}>
                      <div style={styles.busIconInner as React.CSSProperties}>
                        <div style={styles.busStopIcon as React.CSSProperties}>
                          <ChevronDown />
                        </div>
                      </div>
                    </div>
                    <div style={styles.stepTextContainer as React.CSSProperties}>
                      <p style={styles.stepTitle as React.CSSProperties}>
                        {typeof step === 'string' ? step : 'nameKo' in step ? `${step.nameKo} (${step.nameEn})` : JSON.stringify(step)}
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
  refreshContainer: { textAlign: 'center', marginBottom: 16 },
  refreshText: { fontSize: 14, color: '#4b5563', marginBottom: 8, margin: 0 },
  refreshCounter: { fontWeight: 600, color: '#2563eb' },
  refreshButton: { padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, transition: 'background-color 0.2s', cursor: 'pointer' },
  timelineContainer: { position: 'relative' },
  timelineLine: { position: 'absolute', left: 60, top: 0, bottom: 0, width: 4, backgroundColor: '#d1d5db' },
  timelineContentBus: { position: 'relative', display: 'flex', flexDirection: 'column', gap: 32, paddingLeft: 32, paddingTop: 20 },
  busStepContainer: { display: 'flex', gap: 24 },
  busIconWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 64 },
  busIconInner: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
  busStopIcon: { width: 64, height: 64, backgroundColor: '#2563eb', color: 'white', borderRadius: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 18, zIndex: 10 },
  stepTextContainer: { textAlign: 'left', maxWidth: 448, flex: 1 },
  stepTitle: { fontSize: 18, fontWeight: 500, margin: 0 },
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
