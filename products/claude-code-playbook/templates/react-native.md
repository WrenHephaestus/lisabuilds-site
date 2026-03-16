# [EDIT: App Name]

[EDIT: What this app does, who it's for, one sentence]

## Stack

- **Framework:** Expo (managed workflow) with EAS Build
- **Navigation:** React Navigation 6 (native stack, bottom tabs)
- **Lists:** FlashList (Shopify) — not FlatList
- **Animations:** Reanimated 3 + Gesture Handler
- **State:** [EDIT: Zustand / Jotai / React Query + context]
- **Styling:** [EDIT: NativeWind / Tamagui / StyleSheet.create]
- **Backend:** [EDIT: Supabase / Firebase / custom API]
- **Auth:** [EDIT: Supabase Auth / Firebase Auth / Clerk]
- **Push notifications:** expo-notifications + [EDIT: FCM / APNs directly / OneSignal]
- **OTA updates:** EAS Update
- **Testing:** Jest + React Native Testing Library

## Project Structure

```
[EDIT: app-name]/
├── app.config.ts                # Dynamic Expo config — this is where versioning lives
├── eas.json                     # EAS Build + Update profiles
├── src/
│   ├── navigation/
│   │   ├── RootNavigator.tsx    # Auth gate → main app switch
│   │   ├── MainTabs.tsx         # Bottom tab navigator
│   │   └── linking.ts           # Deep link config (this file matters more than you think)
│   ├── screens/
│   │   ├── [feature]/           # One folder per feature
│   │   │   ├── FeatureScreen.tsx
│   │   │   ├── components/      # Screen-local components
│   │   │   └── hooks/           # Screen-local hooks
│   │   └── ...
│   ├── components/
│   │   ├── ui/                  # Pressable, Text, Card — your design system
│   │   └── shared/              # Cross-feature stuff (avatar, empty state)
│   ├── lib/
│   │   ├── api.ts               # API client with auth header injection
│   │   ├── notifications.ts     # Push notification registration + handlers
│   │   ├── storage.ts           # MMKV or AsyncStorage wrapper
│   │   └── deep-linking.ts      # Universal link / scheme handling
│   ├── hooks/
│   │   ├── useAppState.ts       # Foreground/background lifecycle
│   │   └── useNetworkStatus.ts  # Online/offline detection
│   ├── constants/
│   │   ├── colors.ts            # Semantic tokens, not hex values
│   │   └── layout.ts            # Spacing, radii, standard dimensions
│   └── types.ts
├── assets/
│   ├── fonts/
│   └── images/
└── [EDIT: anything project-specific]
```

## EAS Build Profiles

Your `eas.json` should have three profiles. Not two. Three.

```jsonc
{
  "build": {
    "development": {
      // Internal dev builds. Installs alongside production.
      "developmentClient": true,
      "distribution": "internal",
      "ios": { "simulator": true },
      "env": { "APP_VARIANT": "development" }
    },
    "preview": {
      // TestFlight / internal testing track. Same signing as prod.
      "distribution": "internal",
      "ios": { "buildConfiguration": "Release" },
      "env": { "APP_VARIANT": "preview" }
    },
    "production": {
      "autoIncrement": true,
      "env": { "APP_VARIANT": "production" }
    }
  },
  "submit": {
    "production": {
      "ios": { "ascAppId": "[EDIT: your App Store Connect app ID]" },
      "android": { "track": "production" }
    }
  }
}
```

Use `APP_VARIANT` in `app.config.ts` to change the bundle identifier for dev/preview builds. Otherwise you'll overwrite your production app every time you install a dev build on your phone, and you'll lose your mind wondering why your production notifications stopped working.

## Deep Linking

Deep linking is one of those things where the setup looks simple in the docs but the actual behavior on each platform will surprise you.

```ts
// src/navigation/linking.ts
import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');

export const linking: LinkingOptions<RootParamList> = {
  prefixes: [
    prefix,                                    // [EDIT: app-name]://
    'https://[EDIT: yourdomain.com]',          // Universal links (iOS)
    'https://[EDIT: yourdomain.com]',          // App Links (Android)
  ],
  config: {
    screens: {
      Main: {
        screens: {
          Home: 'home',
          Profile: 'profile/:userId',
          // [EDIT: your screens]
        },
      },
      // Auth screens intentionally excluded — don't deep link into login
    },
  },
};
```

For universal links to work on iOS, you need the `apple-app-site-association` file hosted at `https://yourdomain.com/.well-known/apple-app-site-association`. For Android App Links, it's `assetlinks.json` at `https://yourdomain.com/.well-known/assetlinks.json`. These are NOT optional. Without them you get the custom scheme fallback, which opens a disambiguation dialog that makes your app feel like a side project.

Also: universal links don't fire if the user is already in Safari on your domain. That's an iOS restriction. Not a bug. You'll waste hours debugging this if you don't know.

## Push Notifications

Notifications are a three-part problem: permission, token registration, and handling (foreground, background, killed state). Most tutorials cover part one.

```ts
// src/lib/notifications.ts
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// This runs BEFORE any notification UI — set it at module level
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    // Simulators can't receive push. Don't crash, just bail.
    return null;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    // User said no. Respect it. Maybe prompt again later with context.
    return null;
  }

  // projectId is required for Expo push tokens
  const token = await Notifications.getExpoPushTokenAsync({
    projectId: '[EDIT: your-expo-project-id]',
  });

  if (Platform.OS === 'android') {
    // Android requires a channel. This is not optional.
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
    });
  }

  // Send token.data to your backend. Every time. Tokens rotate.
  return token.data;
}
```

In your root component, set up listeners for notification interactions:

```ts
useEffect(() => {
  // User tapped a notification while app was foregrounded
  const foregroundSub = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const data = response.notification.request.content.data;
      // Navigate based on data. This is your deep link equivalent for push.
    }
  );

  // App was killed, user tapped notification to open it
  Notifications.getLastNotificationResponseAsync().then((response) => {
    if (response) {
      // Same handling as above. This one is easy to forget.
    }
  });

  return () => foregroundSub.remove();
}, []);
```

## App State Lifecycle

The app isn't always in the foreground. When it comes back from background, your auth token might be expired, your websocket is definitely dead, and your cached data could be stale. Handle it.

```ts
// src/hooks/useAppState.ts
import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';

export function useAppState(
  onForeground: () => void,
  onBackground?: () => void,
) {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (next: AppStateStatus) => {
      if (appState.current.match(/inactive|background/) && next === 'active') {
        onForeground();
      }
      if (appState.current === 'active' && next.match(/inactive|background/)) {
        onBackground?.();
      }
      appState.current = next;
    });

    return () => sub.remove();
  }, [onForeground, onBackground]);
}
```

Use this in your root navigator to:
- Refresh the auth token
- Reconnect websockets or re-subscribe to real-time channels
- Invalidate React Query caches (`queryClient.invalidateQueries()`)
- Update badge count

Cold start is different. That's when the app was fully killed and opened fresh. Your splash screen should cover the auth check + initial data fetch so the user doesn't see a skeleton flash.

## OTA Updates (EAS Update)

OTA lets you push JS bundle changes without going through app review. Use it for bug fixes and content changes. Don't use it for native module changes (those need a new binary build).

```bash
# Push an update to the preview channel
eas update --branch preview --message "fix: crash on empty cart"

# Push to production
eas update --branch production --message "fix: currency formatting for CAD"
```

In your app, check for updates on foreground:

```ts
import * as Updates from 'expo-updates';

// Inside your useAppState onForeground callback:
async function checkForUpdates() {
  if (__DEV__) return; // Updates don't work in dev

  const update = await Updates.checkForUpdateAsync();
  if (update.isAvailable) {
    await Updates.fetchUpdateAsync();
    // Restart to apply. Don't do this mid-interaction.
    // Either wait for next cold start or show a gentle prompt.
    await Updates.reloadAsync();
  }
}
```

Be careful with `reloadAsync()`. If you call it while the user is typing a message or filling a form, they'll hate you. Check on foreground, apply on next launch. Or show a non-blocking banner.

## Conventions

### FlashList (not FlatList)

FlashList from Shopify is a drop-in replacement that recycles views instead of creating new ones. On long lists the difference is dramatic. Use it for everything.

```tsx
import { FlashList } from '@shopify/flash-list';

<FlashList
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
  estimatedItemSize={80}  // Required. Measure your actual item height.
  keyExtractor={(item) => item.id}
/>
```

The `estimatedItemSize` prop is not optional and not a suggestion. If you pass a bad estimate, FlashList will still work but you'll see blank frames during fast scrolling. Measure a real item. Put the number in.

### Animations

Reanimated worklets run on the UI thread. That's the whole point. Don't mix Animated API and Reanimated in the same component — pick one.

```ts
// Good: Reanimated shared values for anything interactive
const translateX = useSharedValue(0);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateX: translateX.value }],
}));

// For gestures, always pair with Gesture Handler
const pan = Gesture.Pan().onUpdate((e) => {
  translateX.value = e.translationX;
});
```

Layout animations (`entering`, `exiting` props on `Animated.View`) are free wins for list item add/remove. Use them.

### Keyboard Handling

`KeyboardAvoidingView` is inconsistent across platforms. Use `react-native-keyboard-aware-scroll-view` or handle it with Reanimated + `useAnimatedKeyboard()`. Either way, test on a small phone (iPhone SE, old Android). The keyboard takes half the screen on those devices.

### Images

Use `expo-image`. Not `Image` from React Native, not FastImage (it's unmaintained). `expo-image` handles caching, blurhash placeholders, and content-fit properly.

```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: imageUrl }}
  placeholder={{ blurhash: item.blurhash }}
  contentFit="cover"
  transition={200}
  style={{ width: '100%', aspectRatio: 16 / 9 }}
/>
```

### Storage

Don't use AsyncStorage for anything performance-sensitive. It's async, it serializes to JSON, it's slow. Use `react-native-mmkv` for key-value stuff. It's synchronous and 30x faster.

AsyncStorage is fine for: non-critical preferences, onboarding-complete flags, stuff you read once on startup.

MMKV is for: auth tokens, cached user profile, anything you read on multiple screens.

## App Store Submission Gotchas

Things that will delay your release. Learned the hard way.

### iOS (App Store Connect)

- **Privacy manifest:** Required since Spring 2024. If you use `UserDefaults`, `NSFileManager`, certain tracking APIs — you must declare them in `PrivacyInfo.xcprivacy`. Expo handles some, but third-party libraries might not. Build will succeed; review will reject.
- **Screenshots:** You need them for 6.7" and 5.5" iPhone sizes at minimum. iPad too if you support it. Don't forget landscape if your app supports rotation.
- **App Tracking Transparency:** If ANY SDK (analytics, ads, even some crash reporters) sends device data off-device, you need the ATT prompt. This includes Firebase Analytics with default config. Check.
- **Export compliance:** The "does your app use encryption" question. If you use HTTPS (yes, you do), select "yes" and then declare the standard exemption (CCATS). Set `ITSEncryptionExportComplianceCode` in your config to skip the manual question on every submission.
- **Review notes:** Give the reviewer a test account and clear instructions. "Tap sign in, enter test@example.com / Password123" — that specific. They don't have time to figure out your onboarding.

### Android (Google Play Console)

- **Target SDK requirements:** Google requires targeting the latest or near-latest Android SDK. Expo handles this, but if you eject or use custom native code, check.
- **Data safety form:** Google's version of the privacy manifest. You fill it out manually in Play Console. It asks about every piece of data your app touches. Be accurate — they do audit.
- **Content rating:** You must complete the IARC questionnaire. Takes 5 minutes. Forgetting it blocks publishing.
- **Signing:** Let EAS manage your keystore. If you lose your upload key, Google has a key upgrade process but it takes days and support tickets. Don't manage keys yourself.
- **App bundles:** Play Store requires `.aab` (not `.apk`). EAS produces the right format. Don't override it.

### Both platforms

- Increment `versionCode` (Android) and `buildNumber` (iOS) every submission. EAS `autoIncrement: true` handles this. If you do it manually, you will forget, and the upload will fail with a cryptic error.
- Test your production build locally before submitting. `eas build --profile production --local` works if you have the right native toolchains. Things that work in Expo Go sometimes break in production builds because of missing native modules.

## Key Commands

```bash
# Development
npx expo start                           # Start dev server (press 'i' for iOS, 'a' for Android)
npx expo start --clear                   # Clear bundler cache (when things are weird)

# EAS Build
eas build --profile development --platform ios     # Dev client for iOS simulator
eas build --profile development --platform android # Dev client for Android
eas build --profile preview --platform all         # TestFlight + internal track
eas build --profile production --platform all      # Store-ready builds

# EAS Submit
eas submit --platform ios --latest                 # Submit latest iOS build to App Store Connect
eas submit --platform android --latest             # Submit latest Android build to Play Console

# OTA Updates
eas update --branch preview --message "description"
eas update --branch production --message "description"

# Useful debug
npx expo-doctor                          # Check for common config issues
npx expo install --check                 # Verify dependency version compatibility
eas build:list                           # See recent builds and their status
```

## Important Context

[EDIT: Make this specific to your app]
- Target OS versions: [EDIT: iOS 16+? Android 11+?]
- App Store / Play Store account status and team info
- Which notification types your app sends and when
- Revenue model (free, freemium, paid, subscriptions via RevenueCat?)
- Third-party SDKs with native modules that affect build config
- [EDIT: What's the hardest UX problem in this app? Put it here so Claude knows.]

## Do NOT

- Don't use `FlatList`. Use `FlashList`. FlatList doesn't recycle views and it shows on any list over ~50 items. This isn't a style preference.
- Don't `console.log` in production. It's synchronous, it bridges to native, it slows your app. Use `react-native-logs` or strip console calls with `babel-plugin-transform-remove-console`.
- Don't store sensitive tokens in AsyncStorage. It's unencrypted plaintext on Android. Use `expo-secure-store`.
- Don't call `Updates.reloadAsync()` without warning the user. A silent restart mid-interaction is a crash from the user's perspective.
- Don't hardcode your Expo project ID, API URLs, or signing configs. Use `app.config.ts` with environment variables and `eas.json` profiles.
- Don't skip the Android notification channel setup. Notifications will silently fail on Android 8+ without a channel. No error. Just silence.
- Don't test only in Expo Go. Expo Go doesn't include custom native modules. Your dev client build is the only honest test environment.
- Don't submit to App Store review on Friday afternoon. Rejections take 24-48 hours. You'll spend the weekend not knowing.
- Don't ignore the Hermes engine. It's the default in Expo SDK 49+. If you're debugging and the stack traces look weird, make sure your source maps are configured for Hermes, not JSC.
- Don't assume the splash screen hides the initial render. On slow devices, there's a gap. Use `expo-splash-screen` with `SplashScreen.preventAutoHideAsync()` and explicitly hide it after your auth check and initial data load finish.
- [EDIT: your project-specific landmines]
