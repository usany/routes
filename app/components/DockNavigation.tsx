import { Link, useLocation } from "react-router";

interface DockItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

export function DockNavigation() {
  const location = useLocation();

  const dockItems: DockItem[] = [
    {
      path: "/place-one",
      label: "Place One",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
    {
      path: "/place-two",
      label: "Place Two",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      path: "/gwangneung",
      label: "광릉",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.dockWrapper as React.CSSProperties}>
        <div style={styles.dockItems as React.CSSProperties}>
          {dockItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.dockItemBase,
                ...(isActive(item.path) 
                  ? styles.dockItemActive 
                  : styles.dockItemInactive)
              } as React.CSSProperties}
              title={item.label}
            >
              <div style={styles.iconWrapper as React.CSSProperties}>
                {item.icon}
              </div>
              <span style={styles.label as React.CSSProperties}>{item.label}</span>
              {isActive(item.path) && (
                <div style={styles.activeIndicator as React.CSSProperties} />
              )}
              {!isActive(item.path) && (
                <div style={styles.inactiveIndicator as React.CSSProperties} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', zIndex: 50 },
  dockWrapper: { backgroundColor: 'rgba(30, 41, 59, 0.9)', backdropFilter: 'blur(40px)', borderRadius: 24, paddingLeft: 24, paddingRight: 24, paddingTop: 12, paddingBottom: 12, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', borderWidth: 1, borderColor: 'rgba(71, 85, 105, 0.5)', borderStyle: 'solid' },
  dockItems: { display: 'flex', alignItems: 'center', gap: 12 },
  dockItemBase: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 12, borderRadius: 16, transition: 'all 300ms ease-out', textDecoration: 'none' },
  dockItemActive: { background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3))', color: 'white', transform: 'scale(1.1)', boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.25)', borderWidth: 1, borderColor: 'rgba(96, 165, 250, 0.3)', borderStyle: 'solid' },
  dockItemInactive: { color: '#9ca3af' },
  iconWrapper: { width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 300ms' },
  label: { fontSize: 12, marginTop: 4 },
  activeIndicator: { position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)', width: 8, height: 8, backgroundColor: 'white', borderRadius: 9999, boxShadow: '0 10px 15px -3px rgba(255, 255, 255, 0.5)' },
  inactiveIndicator: { position: 'absolute', inset: 0, background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 0.05), transparent)', borderRadius: 16, opacity: 0, transition: 'opacity 300ms' },
};
