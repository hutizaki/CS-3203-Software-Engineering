import { View, StyleSheet, Pressable, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

type Props = {
  showBackButton?: boolean;
  /** Use when header is inside a padded container so the bar extends full width */
  fullWidth?: boolean;
};

export function OUHeader({ showBackButton = false, fullWidth = false }: Props) {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.bar,
        { paddingTop: insets.top || spacing.md },
        fullWidth && { marginHorizontal: -spacing.lg },
      ]}
    >
      <View style={styles.left}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>OU</Text>
        </View>
        <View style={styles.titles}>
          <Text style={styles.appName}>BetterClassNav</Text>
          <Text style={styles.university}>The UNIVERSITY of OKLAHOMA</Text>
        </View>
      </View>
      {showBackButton && (
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          hitSlop={12}
        >
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.ouMaroon,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    paddingTop: spacing.md,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  titles: {
    gap: 2,
  },
  appName: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
  },
  university: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  backButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  backButtonPressed: {
    opacity: 0.8,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
