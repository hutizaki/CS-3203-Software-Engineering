# AI Context: React Native + Expo + TypeScript Project

You are an expert Expo + React Native + TypeScript engineer working on this project. Follow these rules and patterns.

## Tech Stack

### Core Framework
- **Expo** ~54.0.0
- **React Native** 0.81.5
- **React** 19.1.0
- **TypeScript** ~5.9.2
- **Expo Router** ~6.0.22 (file-based routing)

### Animation
- **React Native Reanimated** ~4.1.1 (configured with Babel plugin)
- **react-native-worklets** 0.5.1 (required for Reanimated 4.x)
- **react-native-worklets-core** ^1.6.2 (required for Reanimated 4.x)
- Animations run on native thread for performance
- Use `withSpring` and `withTiming` for animations
- **Important**: Reanimated v4 requires React Native New Architecture (automatically enabled in Expo Go SDK 54)

### Development Tools
- **ESLint** + **Prettier** (code quality)
- **Babel** with module-resolver (path aliases `@/`)

## Architecture Rules

### Route vs Feature Separation

**Routes (`/app`):**
- Thin wrappers (10-20 lines max)
- Only handle navigation structure
- Import and render feature components
- Example: `app/(tabs)/home.tsx` imports `ComponentDemo` from features

**Features (`/src/features`):**
- Contains all business logic
- Contains feature-specific components
- Self-contained modules
- Example: `src/features/ComponentDemo.tsx` has the actual implementation

**UI Components (`/src/components/ui`):**
- Reusable primitives
- Used across multiple features
- Examples: Button, Input, Text, Toggle, Screen

### Folder Structure

```
app/                    → Routes (expo-router file-based routing)
  _layout.tsx           → Root layout
  (tabs)/               → Tab group
    _layout.tsx         → Tabs layout
    home.tsx            → Home route (thin wrapper)

src/
  components/ui/        → Reusable UI primitives
  features/            → Feature modules (business logic)
  theme/               → Design system (colors, spacing)
  lib/                 → Utilities
  types/               → TypeScript definitions
```

## Naming Conventions (Industry Standard)

### Files
- **Component files**: PascalCase → `Button.tsx`, `UserProfile.tsx`
- **Route files**: lowercase or kebab-case → `home.tsx`, `user-profile.tsx`
- **Utility files**: camelCase → `logger.ts`, `env.ts`
- **Type files**: PascalCase or kebab-case → `navigation.d.ts`

### Code
- **Components**: PascalCase → `function Button()`, `function UserProfile()`
- **Variables/Functions**: camelCase → `handleClick`, `isLoading`, `userData`
- **Types/Interfaces**: PascalCase → `type Props`, `interface UserData`, `type Variant`
- **Constants**: UPPER_SNAKE_CASE → `API_BASE_URL`, `MAX_RETRIES`
- **Folders**: lowercase or kebab-case → `components/`, `user-profile/`

### Examples

```tsx
// Component file: Button.tsx (PascalCase)
export function Button({ title, onPress }: Props) { ... }

// Type definition: PascalCase
type Props = { title: string; onPress: () => void; }
type Variant = "primary" | "secondary";

// Variable: camelCase
const handleClick = () => {};
const isDisabled = true;
const variantStyles = { ... };

// Constant: UPPER_SNAKE_CASE
const API_BASE_URL = "https://api.example.com";
```

## Code Patterns

### Component Structure

```tsx
import { StyleSheet } from "react-native";
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

type Props = {
  // Props defined here
};

export function ComponentName({ prop1, prop2 }: Props) {
  // Component logic
  return (
    // JSX
  );
}

const styles = StyleSheet.create({
  // Styles
});
```

### Animation Pattern (Reanimated)

```tsx
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

// In handler
scale.value = withSpring(0.95, { damping: 80, stiffness: 300 });
```

### Theme Usage

Always use theme values, never hardcode:

```tsx
import { colors } from "@/src/theme/colors";
import { spacing } from "@/src/theme/spacing";

// Good
padding: spacing.lg
color: colors.text

// Bad
padding: 16
color: "#111111"
```

## Path Aliases

Use `@/` prefix for all imports:

```tsx
// Good
import { Button } from "@/src/components/ui/Button";
import { colors } from "@/src/theme/colors";

// Bad
import { Button } from "../../components/ui/Button";
```

## Constraints

1. **Keep routes thin** - Routes should only import and render features
2. **Put logic in features** - Business logic belongs in `/src/features`
3. **Use UI components** - Leverage components from `/src/components/ui`
4. **Follow TypeScript** - All files must be properly typed, avoid `any`
5. **Use theme system** - Never hardcode colors or spacing
6. **Follow naming conventions** - Use correct case for each type
7. **Run linter** - Code must pass `npm run lint`

## Existing Components

### UI Components (`src/components/ui/`)
- **Button**: Variants (primary, secondary, outline), animated with Reanimated
- **Toggle**: Switch component with label, animated on value change
- **Input**: Text input with label and error state support
- **Text**: Typography component with variants (title, subtitle, body)
- **Screen**: SafeAreaView wrapper with consistent padding

### Theme (`src/theme/`)
- **colors.ts**: `text`, `background`, `muted`
- **spacing.ts**: `xs: 4`, `sm: 8`, `md: 12`, `lg: 16`, `xl: 24`

## Git Workflow

- Branch naming: `{your-name}/{feature-or-fix-description}`
- `main` branch is protected - requires PR and code review
- All changes must go through pull requests
- Run `npm run lint` and `npm run format` before committing

## Animation Guidelines

- Use React Native Reanimated for all animations
- Animations should be subtle and performant
- Button: Scale + opacity on press (damping: 80, stiffness: 300)
- Toggle: Scale animation on value change
- Keep animations consistent across components

## TypeScript Rules

- No `any` types unless absolutely necessary (with explanation comment)
- All props must be typed
- Use proper TypeScript types for React Native components
- Export types when reused

## Code Quality

- All code must pass ESLint
- Format with Prettier before committing
- Follow the established patterns in existing components
- Keep components focused and single-purpose
