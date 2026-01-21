import { PropsWithChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { spacing } from "@/src/theme/spacing";

export function Screen({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
});
