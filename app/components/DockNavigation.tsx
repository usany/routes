import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/theme-context";

interface DockItem {
  path: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

export function DockNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { colors } = useTheme();

  const dockItems: DockItem[] = [
    {
      path: "/se",
      label: "se",
      iconName: "time-outline",
    },
    {
      path: "/gl",
      label: "gl",
      iconName: "home-outline",
    },
    {
      path: "/gw",
      label: "gw",
      iconName: "location-outline",
    },
  ];

  const isActive = (path: string) => {
    return pathname.startsWith(path);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.dockWrapper, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={styles.dockItems}>
          {dockItems.map((item) => (
            <TouchableOpacity
              key={item.path}
              onPress={() => router.push(item.path as any)}
              style={[
                styles.dockItemBase,
                isActive(item.path) && [styles.dockItemActive, { backgroundColor: colors.primary + '30', borderColor: colors.primary + '50'}]
              ]}
            >
              {isActive(item.path) && (
                <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />
              )}
              <View style={styles.iconWrapper}>
                <Ionicons 
                  name={item.iconName} 
                  size={24} 
                  color={isActive(item.path) ? colors.primary : colors.icon} 
                />
              </View>
              <Text style={[
                styles.label,
                { color: isActive(item.path) ? colors.primary : colors.icon }
              ]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 16,
    zIndex: 50 
  },
  dockWrapper: { 
    borderRadius: 24, 
    paddingHorizontal: 24, 
    paddingVertical: 12, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.25,
    shadowRadius: 50,
    elevation: 25,
    borderWidth: 1, 
  },
  dockItems: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 12 
  },
  dockItemBase: { 
    position: 'relative', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 12, 
    borderRadius: 16, 
    gap: 5
  },
  dockItemActive: { 
    transform: [{ scale: 1.1 }], 
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    borderWidth: 1, 
  },
  iconWrapper: { 
    width: 24, 
    height: 24, 
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  label: { 
    fontSize: 12, 
  },
  activeIndicator: { 
    width: 8, 
    height: 8, 
    borderRadius: 9999,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
    alignSelf: 'center',
  },
  inactiveIndicator: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    borderRadius: 16, 
    opacity: 0, 
  },
});
