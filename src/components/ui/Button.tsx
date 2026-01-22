import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

type Variant = "primary" | "secondary" | "outline";

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: ViewStyle;
};

const variantStyles: Record<Variant, { container: ViewStyle; text: TextStyle }> = {
  primary: {
    container: {
      backgroundColor: colors.text,
      borderWidth: 0,
    },
    text: {
      color: colors.background,
    },
  },
  secondary: {
    container: {
      backgroundColor: colors.muted,
      borderWidth: 0,
    },
    text: {
      color: colors.background,
    },
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1,
      borderColor: colors.text,
    },
    text: {
      color: colors.text,
    },
  },
};

export function Button({ title, onPress, variant = "primary", disabled = false, style }: Props) {
  const variantStyle = variantStyles[variant];
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  // Animate scale on press
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.95, { damping: 80, stiffness: 300 });
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, { damping: 80, stiffness: 300 });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.base,
          variantStyle.container,
          disabled && styles.disabled,
          style,
          animatedStyle,
        ]}
      >
        <Text style={[styles.text, variantStyle.text, disabled && styles.disabledText]}>
          {title}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
