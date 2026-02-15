import { View, StyleSheet } from "react-native";
import { Text } from "@/src/components/ui/Text";
import { spacing } from "@/src/theme/spacing";

export function AppHomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="title" style={styles.text}>
        Features coming soon
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  text: {
    textAlign: "center",
  },
});
