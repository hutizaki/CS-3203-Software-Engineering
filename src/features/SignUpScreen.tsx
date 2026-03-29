import { useRef, useState } from "react";
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

export function SignUpScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const latestValuesRef = useRef({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  });

  const validateField = (
    field: "firstName" | "lastName" | "email" | "password",
    value: string,
  ) => {
    const trimmedValue = value.trim();
    if (!trimmedValue) {
      return "This field is required";
    }

    if (field === "email" && !trimmedValue.includes("@")) {
      return "Please enter a valid email";
    }

    if (field === "password" && trimmedValue.length < 8) {
      return "Password must be at least 8 characters";
    }

    return "";
  };

  const updateFieldError = (
    field: "firstName" | "lastName" | "email" | "password",
    value: string,
  ) => {
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value),
    }));
  };

  const markTouched = (
    field: "firstName" | "lastName" | "email" | "password",
  ) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateAllFields = () => {
    const nextErrors = {
      firstName: validateField("firstName", firstName),
      lastName: validateField("lastName", lastName),
      email: validateField("email", email),
      password: validateField("password", password),
    };
    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const isFormValid =
    !validateField("firstName", firstName) &&
    !validateField("lastName", lastName) &&
    !validateField("email", email) &&
    !validateField("password", password);

  const handleSubmit = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
    });

    if (!validateAllFields()) {
      return;
    }

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

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
      Alert.alert(
        "Sign up failed",
        e instanceof Error ? e.message : "Something went wrong.",
      );
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
              latestValuesRef.current.firstName = value;
              setFirstName(value);
              if (touched.firstName) {
                updateFieldError("firstName", value);
              }
            }}
            onBlur={() => {
              markTouched("firstName");
              updateFieldError("firstName", latestValuesRef.current.firstName);
            }}
            placeholder="First name"
            autoCapitalize="words"
            autoCorrect={false}
            error={touched.firstName ? errors.firstName : undefined}
          />
          <Input
            label="Last name"
            value={lastName}
            onChangeText={(value) => {
              latestValuesRef.current.lastName = value;
              setLastName(value);
              if (touched.lastName) {
                updateFieldError("lastName", value);
              }
            }}
            onBlur={() => {
              markTouched("lastName");
              updateFieldError("lastName", latestValuesRef.current.lastName);
            }}
            placeholder="Last name"
            autoCapitalize="words"
            autoCorrect={false}
            error={touched.lastName ? errors.lastName : undefined}
          />
          <Input
            label="Email"
            value={email}
            onChangeText={(value) => {
              latestValuesRef.current.email = value;
              setEmail(value);
              if (touched.email) {
                updateFieldError("email", value);
              }
            }}
            onBlur={() => {
              markTouched("email");
              updateFieldError("email", latestValuesRef.current.email);
            }}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={touched.email ? errors.email : undefined}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={(value) => {
              latestValuesRef.current.password = value;
              setPassword(value);
              if (touched.password) {
                updateFieldError("password", value);
              }
            }}
            onBlur={() => {
              markTouched("password");
              updateFieldError("password", latestValuesRef.current.password);
            }}
            placeholder="Choose a password"
            secureTextEntry
            autoCapitalize="none"
            error={touched.password ? errors.password : undefined}
          />
          <Button
            title={loading ? "Creating account…" : "Sign up"}
            onPress={handleSubmit}
            variant="primary"
            disabled={loading || !isFormValid}
          />
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
