import { Switch, StyleSheet, Text, ViewStyle, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
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
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  // Animate when value changes
  useEffect(() => {
    if (!disabled) {
      scale.value = withSpring(0.97, { damping: 15, stiffness: 300 });
      const timer = setTimeout(() => {
        scale.value = withSpring(1, { damping: 15, stiffness: 300 });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, disabled]);

  const handleLabelPress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <Animated.View style={[styles.container, style, animatedStyle]}>
      {label ? (
        <Pressable onPress={handleLabelPress} disabled={disabled}>
          <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        </Pressable>
      ) : (
        <Text style={[styles.label, disabled && styles.labelDisabled]} />
      )}
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.muted, true: colors.text }}
        thumbColor={colors.background}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginRight: spacing.md,
  },
  labelDisabled: {
    opacity: 0.5,
  },
});
