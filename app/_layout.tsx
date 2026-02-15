import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ title: "Sign up", headerShown: false }} />
      <Stack.Screen name="log-in" options={{ title: "Log in", headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ title: "Home" }} />
    </Stack>
  );
}
