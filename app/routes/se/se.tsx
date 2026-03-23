export default function PlaceOne() {
  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.contentWrapper as React.CSSProperties}>
        <h1 style={styles.title as React.CSSProperties}>경희대 서울캠퍼스</h1>
        <p style={styles.subtitle as React.CSSProperties}>
          어디로 떠나볼까요?
        </p>
        <div style={styles.cardsContainer as React.CSSProperties}>
          <div style={styles.grid as React.CSSProperties}>
            <a
              href="/se/busOne"
              style={{...styles.cardBase, ...styles.cardBlue} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconBlue} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>회기역-경희대 01번</span>
            </a>
            <a
              href="/se/busTwo"
              style={{...styles.cardBase, ...styles.cardGreen} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconGreen} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>회기역-외대앞역 02번</span>
            </a>
            <a
              href="/se/busThree"
              style={{...styles.cardBase, ...styles.cardYellow} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconYellow} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>자율주행 A01번</span>
            </a>
            <a
              href="/se/shuttle"
              style={{...styles.cardBase, ...styles.cardPurple} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconPurple} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>서울-국제 셔틀버스</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', paddingBottom: 96 },
  contentWrapper: { textAlign: 'center', width: '100%' },
  title: { fontSize: 36, fontWeight: 'bold', marginBottom: 32, margin: 0 },
  subtitle: { fontSize: 18, color: '#4b5563', marginBottom: 32, margin: 0 },
  cardsContainer: { display: 'flex', flexDirection: 'column', gap: 24 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 16, maxWidth: 672, margin: '0 auto' },
  cardBase: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 24, borderRadius: 8, transition: 'background-color 0.2s', textDecoration: 'none', color: 'inherit' },
  cardBlue: { backgroundColor: '#dbeafe' },
  cardGreen: { backgroundColor: '#dcfce7' },
  cardYellow: { backgroundColor: '#fef08a' },
  cardPurple: { backgroundColor: '#f3e8ff' },
  iconBase: { width: 48, height: 48, marginBottom: 8 },
  iconBlue: { color: '#2563eb' },
  iconGreen: { color: '#16a34a' },
  iconYellow: { color: '#ca8a04' },
  iconPurple: { color: '#9333ea' },
  cardText: { fontWeight: 500 },
};
