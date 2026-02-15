import { useRouter } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Text } from "@/src/components/ui/Text";
import { Button } from "@/src/components/ui/Button";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

export function LandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.wrapper}>
      <View style={styles.hero}>
        <View style={styles.accent} />
        <Text variant="title" style={styles.headline}>
          Your advising, on your terms.
        </Text>
        <Text variant="body" style={styles.subtext}>
          Plan courses, track progress, and stay on top of your degree—all in one place. Self-service advising built for students.
        </Text>
      </View>

      <View style={styles.actions}>
        <Button
          title="Sign up"
          onPress={() => router.push("/sign-up")}
          variant="primary"
        />
        <Button
          title="Log in"
          onPress={() => router.push("/log-in")}
          variant="outline"
        />
        <Button
          title="Dev: Skip login"
          onPress={() => router.push("/dashboard")}
          variant="outline"
          style={styles.devButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: spacing.xl,
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    paddingRight: spacing.lg,
  },
  accent: {
    width: 48,
    height: 4,
    backgroundColor: colors.blue,
    borderRadius: 2,
    marginBottom: spacing.lg,
  },
  headline: {
    marginBottom: spacing.md,
  },
  subtext: {
    color: colors.muted,
    maxWidth: "90%",
  },
  actions: {
    gap: spacing.md,
  },
  devButton: {
    marginTop: spacing.lg,
    opacity: 0.8,
  },
});
