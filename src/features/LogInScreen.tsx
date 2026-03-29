import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Text } from "@/src/components/ui/Text";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { spacing } from "@/src/theme/spacing";
import { loginWithCredentials, setCurrentUser } from "@/src/lib/auth";
import { mapLoginErrorToUserMessage } from "@/src/lib/loginErrorMessages";
import { FormErrorBanner } from "@/src/components/ui/FormErrorBanner";

export function LogInScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearSubmitError = () => {
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      Alert.alert(
        "Missing information",
        "Please enter your email and password.",
      );
      return;
    }

    setSubmitError(null);
    setLoading(true);
    try {
      await loginWithCredentials(trimmedEmail, trimmedPassword);
      await setCurrentUser(trimmedEmail);
      router.replace("/dashboard");
    } catch (e) {
      setSubmitError(mapLoginErrorToUserMessage(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text variant="title" style={styles.title}>
          Log in
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Enter your email and password.
        </Text>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={(value) => {
              clearSubmitError();
              setEmail(value);
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => {
              clearSubmitError();
              setPassword(value);
            }}
            placeholder="Your password"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            title={loading ? "Logging in…" : "Log in"}
            onPress={handleSubmit}
            variant="primary"
            disabled={loading}
          />
          <FormErrorBanner message={submitError} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
  },
  subtitle: {
    marginBottom: spacing.xl,
  },
  form: {
    gap: 0,
  },
});
