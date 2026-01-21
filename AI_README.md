# React Native + Expo + TypeScript Team Starter (Blank Slate)

This repo is a beginner-friendly, team-scalable starter for a React Native app using Expo + TypeScript.
Goal: **max boilerplate + clean structure** while keeping the actual app UI as a **blank slate**.

---

## 0) Team Rules (read this first)

### Branching
- `main` is protected (no direct pushes).
- Work on `feature/<yourname>-<task>`.
- Open a PR and get **1 approval** before merge.
- Keep PRs small and focused.

### Code Style
- Don’t fight formatting.
- Use TypeScript everywhere.
- No `any` unless absolutely necessary (and explain why in a comment).

### Ownership (suggestion for 7 people)
- 1 repo captain: CI + tooling + merge rules
- 2 UI/components: design system primitives
- 2 features: screens + navigation flows
- 1 data/auth: storage, API patterns
- 1 QA: test scaffolding + bug bash checklist

---

## 1) Setup (local)

### Prereqs
- Node.js LTS
- Git
- (Optional) Expo Go app on your phone

### Install
```bash
npm install
````

### Run

```bash
npm run start
```

* Press `i` for iOS simulator (mac only)
* Press `a` for Android emulator
* Or scan QR with Expo Go

---

## 2) What You Should See (Blank Slate)

* A single screen with a header title “Home”
* No real features yet
* No UI decisions forced

---

## 3) Architecture (high-level)

### Tech

* Expo + React Native
* TypeScript
* expo-router (file-based routing)
* ESLint + Prettier

### Folder layout

```
app/
  _layout.tsx
  index.tsx
  (tabs)/
    _layout.tsx
    home.tsx
src/
  components/
    ui/
      Screen.tsx
      Text.tsx
  lib/
    env.ts
    logger.ts
  theme/
    colors.ts
    spacing.ts
  types/
    navigation.d.ts
  features/
    README.md
```

* `app/` = routes (expo-router)
* `src/components/ui` = reusable UI primitives
* `src/features` = future feature modules (each feature gets its own folder)
* Keep screens minimal; put logic in features/components.

---

## 4) AI Instructions (copy into your IDE assistant)

You are an expert Expo + React Native + TypeScript engineer.

### Constraints

* Keep the app UI a blank slate:

  * Home screen should remain simple (title + empty space).
  * Do NOT add visual-heavy components or product features unless asked.
* Focus on:

  * correct project structure
  * safe defaults
  * beginner readability
  * team collaboration patterns
* Prefer simple, boring solutions.

### Tasks

1. Create the folder structure exactly as described in this README.
2. Add all code files listed below with the provided contents.
3. Ensure `npm run lint` passes (after we add lint scripts).
4. Do not add extra dependencies unless absolutely necessary.

---

## 5) Boilerplate Code (create these files)

> If any of these files already exist, update them to match the contents below.

### 5.1 `package.json` scripts (add/ensure these)

Add these scripts (merge with existing):

```json
{
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

---

### 5.2 `app/_layout.tsx`

```tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
      }}
    />
  );
}
```

---

### 5.3 `app/index.tsx`

Redirect to tabs (keeps future growth clean).

```tsx
import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}
```

---

### 5.4 `app/(tabs)/_layout.tsx`

We start with 1 tab. You can add more later without refactoring.

```tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />
    </Tabs>
  );
}
```

---

### 5.5 `app/(tabs)/home.tsx` (Blank Slate Screen)

```tsx
import { Screen } from "@/src/components/ui/Screen";
import { Text } from "@/src/components/ui/Text";

export default function HomeScreen() {
  return (
    <Screen>
      <Text variant="title">Home</Text>
      {/* Blank slate: build features later */}
    </Screen>
  );
}
```

---

## 6) UI Primitives (minimal, team-safe)

### 6.1 `src/components/ui/Screen.tsx`

```tsx
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
```

### 6.2 `src/components/ui/Text.tsx`

```tsx
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
  return <RNText style={[styles.base, variantStyle[variant], style]}>{children}</RNText>;
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
});
```

---

## 7) Theme

### 7.1 `src/theme/colors.ts`

```ts
export const colors = {
  text: "#111111",
  background: "#FFFFFF",
  muted: "#666666",
};
```

### 7.2 `src/theme/spacing.ts`

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};
```

---

## 8) Lib Utilities (tiny but useful)

### 8.1 `src/lib/logger.ts`

```ts
export const logger = {
  info: (...args: unknown[]) => console.log("[info]", ...args),
  warn: (...args: unknown[]) => console.warn("[warn]", ...args),
  error: (...args: unknown[]) => console.error("[error]", ...args),
};
```

### 8.2 `src/lib/env.ts`

(placeholder for later; keep it empty-ish)

```ts
export const env = {
  // Add public env vars later (EXPO_PUBLIC_*)
};
```

---

## 9) Feature Modules (future-proofing)

### 9.1 `src/features/README.md`

```md
# Features

Each feature gets its own folder here later, e.g.

- `src/features/auth`
- `src/features/profile`
- `src/features/feed`

Rule: screens in `/app` should be thin. Put logic + components inside `src/features/...`
```

---

## 10) Path Aliases (so imports stay sane)

### 10.1 `tsconfig.json` (ensure these compilerOptions)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### 10.2 `babel.config.js`

Ensure module resolver is set so `@/` works.

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./",
          },
        },
      ],
    ],
  };
};
```

> If `module-resolver` is not installed, install it:

```bash
npm i -D babel-plugin-module-resolver
```

---

## 11) Lint + Format (minimal)

### 11.1 Install

```bash
npm i -D eslint prettier eslint-config-prettier eslint-plugin-prettier @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

### 11.2 `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: { es2021: true },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  ignorePatterns: ["node_modules/", "dist/", ".expo/"],
  rules: {
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
```

### 11.3 `.prettierrc`

```json
{
  "singleQuote": false,
  "semi": true
}
```

---

## 12) Contribution Workflow (do this every task)

1. Pull latest main:

```bash
git checkout main
git pull
```

2. Create a feature branch:

```bash
git checkout -b feature/<name>-<task>
```

3. Work + commit.

4. Before PR:

```bash
npm run lint
npm run format
```

5. Open PR, request review, merge when approved.

---

## 13) Roadmap (don’t start yet)

* Add a second tab once the first feature exists.
* Add a real data layer (Supabase/Firebase/REST) after UI patterns are stable.
* Add tests once at least one feature exists.

---

## Done ✅

If you can run `npm run start` and see the “Home” blank slate screen, the boilerplate is complete.

```

---

If you want, I can also paste a **ready-to-run `npx create-expo-app` command** (with the right template) that matches this structure, plus a GitHub PR checklist you can add to `.github/pull_request_template.md`.
::contentReference[oaicite:0]{index=0}
```
