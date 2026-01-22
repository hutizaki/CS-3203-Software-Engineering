# Assets

This folder contains all static assets for the app.

## Structure

- `images/` - Images, photos, illustrations used in the app
- `icons/` - App icons and small icon graphics
- `fonts/` - Custom font files (if needed)

## Usage

Import assets in your components:

```tsx
import { Image } from 'react-native';

// Local image
<Image source={require('@/assets/images/logo.png')} />

// Or using expo-asset
import logo from '@/assets/images/logo.png';
<Image source={logo} />
```

## App Icons

The following files are referenced in `app.json`:
- `icon.png` - App icon (1024x1024)
- `splash.png` - Splash screen image
- `adaptive-icon.png` - Android adaptive icon
- `favicon.png` - Web favicon
