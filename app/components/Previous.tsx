import { Link, useLocation } from "react-router";

export default function Previous() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
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
  )
;
}
const styles = {
  // Link
  navContainer: { marginTop: 32, display: 'flex', flexDirection: 'column', gap: 16 },
  navInner: { marginTop: 16 },
  navLink: { color: '#4b5563', textDecoration: 'underline' }
};
