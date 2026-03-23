import { useBusData } from "~/hooks/useBusData";
import { getProcessSteps } from "./steps";
import { useLocation } from "react-router";

export default function RefreshCounter() {
  const location = useLocation();
  const pathname = location.pathname;
  const vehicle = pathname.slice(4, pathname.length);
  const { busData, timeUntilNextFetch, fetchBusData } = useBusData(vehicle, getProcessSteps);
  return (
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
  );
}

const styles = {
  refreshContainer: { textAlign: 'center', marginBottom: 16 },
  refreshText: { fontSize: 14, color: '#4b5563', marginBottom: 8, margin: 0 },
  refreshCounter: { fontWeight: 600, color: '#2563eb' },
  refreshButton: { padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: 8, fontSize: 14, transition: 'background-color 0.2s', cursor: 'pointer' }
};
