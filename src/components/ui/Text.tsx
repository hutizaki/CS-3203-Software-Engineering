import { PropsWithChildren } from "react";
import { Text as RNText, StyleSheet, TextStyle } from "react-native";
import { colors } from "@/src/theme/colors";

type Variant = "body" | "title" | "subtitle";

type Props = PropsWithChildren<{
  variant?: Variant;
  style?: TextStyle;
}>;

const variantStyle: Record<Variant, TextStyle> = {
  body: { fontSize: 16, lineHeight: 22, color: colors.text },
  subtitle: { fontSize: 18, fontWeight: "600", color: colors.text },
  title: { fontSize: 28, fontWeight: "700", color: colors.text },
};

export function Text({ variant = "body", style, children }: Props) {
  return (
    <RNText style={[styles.base, variantStyle[variant], style]}>
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
});
