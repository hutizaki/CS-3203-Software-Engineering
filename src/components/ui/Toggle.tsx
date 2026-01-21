import { Switch, StyleSheet, View, Text, ViewStyle } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

type Props = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  style?: ViewStyle;
};

export function Toggle({ value, onValueChange, label, disabled = false, style }: Props) {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
      )}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.muted, true: colors.text }}
        thumbColor={colors.background}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    marginRight: spacing.md,
  },
  labelDisabled: {
    opacity: 0.5,
  },
});
