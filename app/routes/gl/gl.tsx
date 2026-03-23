export default function PlaceTwo() {
  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.contentWrapper as React.CSSProperties}>
        <h1 style={styles.title as React.CSSProperties}>경희대 국제캠퍼스</h1>
        <p style={styles.subtitle as React.CSSProperties}>
          어디로 떠나볼까요?
        </p>
        <div style={styles.cardsContainer as React.CSSProperties}>
          <div style={styles.grid as React.CSSProperties}>
            <a
              href="/gl/busTo"
              style={{...styles.cardBase, ...styles.cardRed} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconRed} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>외국어대학-사색의 광장</span>
            </a>
            <a
              href="/gl/busFrom"
              style={{...styles.cardBase, ...styles.cardIndigo} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconIndigo} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>사색의 광장-정문 건너편</span>
            </a>
            <a
              href="/gl/commute"
              style={{...styles.cardBase, ...styles.cardPink} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconPink} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>영통역 통학버스</span>
            </a>
            <a
              href="/gl/shuttleGlobal"
              style={{...styles.cardBase, ...styles.cardTeal} as React.CSSProperties}
            >
              <svg style={{...styles.iconBase, ...styles.iconTeal} as React.CSSProperties} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              <span style={styles.cardText as React.CSSProperties}>국제-서울 셔틀버스</span>
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
  cardRed: { backgroundColor: '#fee2e2' },
  cardIndigo: { backgroundColor: '#e0e7ff' },
  cardPink: { backgroundColor: '#fce7f3' },
  cardTeal: { backgroundColor: '#ccfbf1' },
  iconBase: { width: 48, height: 48, marginBottom: 8 },
  iconRed: { color: '#dc2626' },
  iconIndigo: { color: '#4f46e5' },
  iconPink: { color: '#db2777' },
  iconTeal: { color: '#0d9488' },
  cardText: { fontWeight: 500 },
};
