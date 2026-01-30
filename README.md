# CS-3203-Software-Engineering

A React Native mobile application built with Expo, TypeScript, and Expo Router. This project follows a feature-based architecture with reusable UI components and smooth animations.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Builds](#development-builds)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Git Workflow](#git-workflow)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (LTS version recommended)
- **npm** or **yarn**
- **Git** (for version control)
- **Expo Go** app (optional, for mobile testing)

### Clone the Repository

**Step 1: Set Up GitHub Credentials (If Needed)**

If you haven't set up GitHub authentication on your laptop:

- Search YouTube for "GitHub SSH setup" or "GitHub authentication setup"
- Use ChatGPT or other resources to guide you through the process
- You'll need to generate SSH keys or set up a personal access token

**Step 2: Clone the Repository**

Clone the repository using either HTTPS or SSH:

**Using HTTPS:**
```bash
git clone https://github.com/hutizaki/CS-3203-Software-Engineering.git
```

**Using SSH:**
```bash
git clone git@github.com:hutizaki/CS-3203-Software-Engineering.git
```

**Step 3: Navigate to Project Directory**

```bash
cd CS-3203-Software-Engineering
```

### Installation

Install all project dependencies:

```bash
npm i
```

### Running the Application

Start the Expo development server:

```bash
npm start
```

A QR code will appear in your terminal, along with several options for viewing your app.

> **Important:** Hot reload is automatically enabled for all platforms. Your changes will appear instantly when you save files (Ctrl + S / Cmd + S).

#### Viewing Options

**Option A: Mobile Device (Physical Testing)**

1. Install **Expo Go** from the App Store (iOS) or Google Play (Android)
2. Open your device's camera app (iOS) or Expo Go app (Android)
3. Scan the QR code displayed in your terminal
4. The app will load on your device

![QR Code](doc-assets/QRCode.png)

**Option B: Web Browser (Recommended for Development)**

1. Press `w` in the terminal to launch the web version
2. Open browser developer tools (F12)
3. Enable mobile device emulation in dev tools
4. Experience instant hot reload as you code

**Option C: Emulators**

- Press `i` for iOS simulator (macOS only)
- Press `a` for Android emulator
- Requires Xcode (iOS) or Android Studio (Android) to be installed

---

## Development Builds

Development builds are standalone app binaries you can install on physical devices (or simulators) without Expo Go. They support native modules and let teammates test on real devices. Builds are created in the cloud with **EAS (Expo Application Services)**.

### Prerequisites

- **Expo account** – [Sign up](https://expo.dev/signup) (free).
- **EAS CLI** – Run builds with `npx eas-cli` (no global install required).
- **iOS only:** An **Apple Developer Program** membership is required. To let teammates install on their devices, either:
  - Add their **device UDIDs** to your Apple Developer account (App IDs → Devices), or
  - Add them as **team members** to your Apple Developer team (recommended; they use their Apple ID and do not need their own paid membership).

### One-time project setup

1. Log in to EAS and link the project (run in the repo root):

   ```bash
   npx eas-cli login
   npx eas-cli build:configure
   ```

   Use the defaults when prompted. This ensures the project is linked to your Expo account.

2. **iOS:** In [Expo Dashboard](https://expo.dev) → your project → **Credentials**, configure your Apple Developer account (or let EAS create a managed Apple Developer account for you).

### Building a development build

From the project root (after `npm i`):

```bash
# iOS (device; requires Apple Developer setup)
npm run build:dev:ios

# Android (APK for internal install)
npm run build:dev:android
```

Or use EAS CLI directly: `npx eas-cli build --profile development --platform ios` (same for `android`).

Builds run in the cloud. When a build finishes, EAS shows a **build page** with a link to install.

### Installing the build (teammates)

- **iOS:** Open the build page link on the device (or scan the QR code). The device must be registered (UDID) in the Apple Developer account used for the build, or the teammate must be in your Apple Developer team.
- **Android:** Download the APK from the build page link and install it on the device (allow “Install from unknown sources” if prompted).

### Using the development build

1. Install the built app on your device (or simulator) using the link from the EAS build page.
2. From the project root, start the dev server: `npm start`.
3. Open the development build app and scan the QR code (or enter the URL) to connect to the dev server. You get the same hot reload experience as with Expo Go.

Build profiles in `eas.json`:

- **development** – For day-to-day dev (includes dev client, internal distribution).
- **preview** – Internal testing without dev client (e.g. APK for Android).
- **production** – For store submissions (not used for dev builds).

---

## Project Structure

This project follows a **feature-based architecture** that separates routing from business logic. Understanding this structure is crucial for effective development.

### Architecture Overview

```
app/                    → Routes (thin wrappers, like pages)
src/
  ├── components/ui/    → Reusable UI primitives
  ├── features/         → Feature modules with logic
  ├── theme/           → Design system (colors, spacing)
  ├── lib/             → Utility functions
  └── types/            → TypeScript definitions
```

### Key Concepts

**Routes vs Features**

- **`/app`** contains route files that define navigation and screen structure
- **`/src/features`** contains the actual component logic and business rules
- Routes should be **lean** (10-20 lines), features contain the real work

### Example: Home Screen

The home screen demonstrates this separation:

**Route File: `app/(tabs)/home.tsx`**

This is a thin wrapper that imports and displays a feature:

```tsx
import { Screen } from "@/src/components/ui/Screen";
import { ComponentDemo } from "@/src/features/ComponentDemo";

export default function HomeScreen() {
  return (
    <Screen>
      <ComponentDemo />
    </Screen>
  );
}
```

**Feature Component: `src/features/ComponentDemo.tsx`**

This contains the actual implementation:

```tsx
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Text } from "@/src/components/ui/Text";
import { Toggle } from "@/src/components/ui/Toggle";
import { Input } from "@/src/components/ui/Input";

export function ComponentDemo() {
  const [toggleValue, setToggleValue] = useState(true);

  return (
    <>
      <Text variant="title">Home (This is a title)</Text>
      <Text variant="subtitle">Components Below (This is a subtitle)</Text>
      <Text variant="body">Button (This is a body)</Text>
      <Button title="Click me" onPress={() => console.log("Button pressed")} />
      <Text variant="body">Toggle</Text>
      <Toggle value={toggleValue} onValueChange={setToggleValue} />
      <Text variant="body">Input Field</Text>
      <Input label="First Name" value="Your mom" onChangeText={(text) => console.log("Input changed", text)} />
      <Text variant="body">Input Field with Error</Text>
      <Input label="Last Name" value="You are a chud" onChangeText={(text) => console.log("Input changed", text)} error="This is an input error" />
    </>
  );
}
```

**Visual Result:**

![Basic Components](doc-assets/BasicComponents.png)

### Component Organization

- **`/src/components/ui`** - Reusable UI primitives (Button, Input, Text, etc.)
- **`/src/features`** - Feature-specific components and logic
- **`/src/theme`** - Design tokens (colors, spacing) used throughout the app

---

## Development Workflow

### Code Quality Tools

This project includes automated code quality tools:

**Linting:**
```bash
npm run lint
```

**Formatting:**
```bash
npm run format
```

### Best Practices

1. **Keep routes thin** - Routes should only handle navigation structure
2. **Put logic in features** - Business logic belongs in `/src/features`
3. **Use UI components** - Leverage components from `/src/components/ui`
4. **Follow TypeScript** - All files should be properly typed
5. **Run linter** - Fix linting errors before committing

---

## Git Workflow

### Creating a New Branch

**Step 1: Ensure You're on Main**

Always start from the main branch to get the latest changes:

```bash
git checkout main
git pull
```

**Step 2: Create Your Branch**

Use the following naming convention:

```
{your-name}/{feature-or-fix-description}
```

Examples:
- `john/feature-user-authentication`
- `jane/bugfix-login-error`
- `alex/refactor-button-component`

**Step 3: Choose Your Method**

**Method A: Using Git UI (Recommended for Beginners)**

The Git UI provides a visual way to manage branches:

- View your current branch
- Sync with remote (pull latest changes)
- Create new branches from existing ones
- Switch between branches easily

![Branch View](doc-assets/Branches.png)

**Method B: Using Command Line**

```bash
git checkout -b 'your-name/feature-description'
```

### Making Changes

**Staging and Committing:**

Use the Changes view to:

- Write descriptive commit messages
- Stage files for commit
- Review changes before committing
- Undo changes if needed

![Changes View](doc-assets/ChangesButton.png)

**Best Practices:**

- Write clear, descriptive commit messages
- Commit related changes together
- Review your changes before committing
- Keep commits focused and atomic

### Syncing with Remote

**Git Options Menu:**

Access a comprehensive set of Git operations:

- **Push** - Upload your local commits to the remote repository
- **Pull** - Download and merge remote changes into your local branch
- **Fetch** - Download remote changes without merging
- Additional Git commands and operations

![Git Options](doc-assets/GitOptions.png)

**Workflow:**

1. Create your branch
2. Make your changes
3. Commit your changes with a clear message
4. Push your branch to remote
5. Create a pull request for review
6. **Wait for code review approval** before merging

### Pull Requests and Code Reviews

**Important: Code Review Required**

This repository has branch protection enabled on the `main` branch. **All changes must be reviewed and approved before they can be merged into main.**

**Process:**

1. After pushing your branch, create a Pull Request (PR) on GitHub
2. Request review from at least one team member
3. Address any feedback or requested changes
4. Once approved, your PR can be merged into `main`

**You cannot directly push to `main`** - all changes must go through the pull request and code review process. This ensures code quality and gives team members visibility into changes.

---

## Additional Resources

### Path Aliases

This project uses path aliases for cleaner imports:

- `@/` maps to the project root
- Example: `import { Button } from "@/src/components/ui/Button"`

### Theme System

Colors and spacing are centralized in `/src/theme`:

- `colors.ts` - Color palette
- `spacing.ts` - Spacing scale (xs, sm, md, lg, xl)

### Animation Library

This project uses **React Native Reanimated** for smooth, performant animations:

- Animations run on the native thread
- Components like Button and Toggle include built-in animations
- See component files for animation examples

---

## Getting Help

If you encounter issues:

1. Check the terminal for error messages
2. Ensure all dependencies are installed (`npm i`)
3. Try clearing the cache: `npm start -- --clear`
4. Review the component files in `/src/components/ui` for usage examples
