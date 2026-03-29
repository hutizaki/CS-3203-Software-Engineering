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
import { saveUser, setCurrentUser } from "@/src/lib/auth";
import { mapSignUpErrorToUserMessage } from "@/src/lib/signUpErrorMessages";
import { FormErrorBanner } from "@/src/components/ui/FormErrorBanner";

export function SignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const clearSubmitError = () => {
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !trimmedPassword) {
      Alert.alert("Missing information", "Please fill in all fields.");
      return;
    }

    setSubmitError(null);
    setLoading(true);
    try {
      await saveUser({
        firstName: trimmedFirst,
        lastName: trimmedLast,
        email: trimmedEmail,
        password: trimmedPassword,
      });
      await setCurrentUser(trimmedEmail);
      router.replace("/dashboard");
    } catch (e) {
      setSubmitError(mapSignUpErrorToUserMessage(e));
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
          Create account
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Enter your details to get started.
        </Text>

        <View style={styles.form}>
          <Input
            label="First name"
            value={firstName}
            onChangeText={(value) => {
              clearSubmitError();
              setFirstName(value);
            }}
            placeholder="First name"
            autoCapitalize="words"
            autoCorrect={false}
          />
          <Input
            label="Last name"
            value={lastName}
            onChangeText={(value) => {
              clearSubmitError();
              setLastName(value);
            }}
            placeholder="Last name"
            autoCapitalize="words"
            autoCorrect={false}
          />
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
            placeholder="Choose a password"
            secureTextEntry
            autoCapitalize="none"
          />
          <Button
            title={loading ? "Creating account…" : "Sign up"}
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
