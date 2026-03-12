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
      path: "/place",
      label: "Place",
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
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white/10 dark:bg-black/30 backdrop-blur-2xl rounded-3xl px-6 py-3 shadow-2xl border border-white/20 dark:border-white/10">
        <div className="flex items-center gap-3">
          {dockItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative group flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ease-out
                ${isActive(item.path) 
                  ? 'bg-gradient-to-br from-blue-500/30 to-blue-600/30 text-white scale-110 shadow-lg shadow-blue-500/25 border border-blue-400/30' 
                  : 'text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:backdrop-blur-sm'
                }
              `}
              title={item.label}
            >
              <div className="w-6 h-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>
              {isActive(item.path) && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg shadow-white/50 animate-pulse" />
              )}
              {!isActive(item.path) && (
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
