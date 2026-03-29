import { View, Text, StyleSheet } from "react-native";
import { spacing } from "@/src/theme/spacing";

type Props = {
  message: string | null;
};

export function FormErrorBanner({ message }: Props) {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container} accessibilityRole="alert">
      <Text style={styles.icon} importantForAccessibility="no">
        ⚠
      </Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: "#FFF5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#FFCCCC",
    gap: spacing.sm,
  },
  icon: {
    fontSize: 18,
    lineHeight: 22,
    color: "#CC0000",
  },
  text: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#CC0000",
    fontWeight: "500",
  },
});
