import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/contexts/theme-context";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, View } from "react-native";

interface Props {
  onSettingsPress: () => void;
}

export function Button({ onSettingsPress }: Props) {
  const { colors } = useTheme();

  return (
    <View style={styles.headerButtons}>
      <ThemedText style={styles.subtitle}>
        어디로 떠나볼까요?
      </ThemedText>
      <Pressable onPress={onSettingsPress} style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  subtitle: { fontSize: 18, color: '#4b5563' },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
  },
});
