# crafted-components

A React Native UI component library with built-in theming support.

## Installation

```bash
# yarn
yarn add crafted-components@github:hvalec427/crafted-components

# npm
npm install crafted-components@github:hvalec427/crafted-components
```

### Peer dependencies

Install these in your app if not already present:

```bash
# yarn
yarn add react-native-safe-area-context react-native-gesture-handler react-native-keyboard-aware-scroll-view

# npm
npm install react-native-safe-area-context react-native-gesture-handler react-native-keyboard-aware-scroll-view
```

## Setup

Wrap your app root with `CraftedProvider`:

```tsx
import { CraftedProvider } from 'crafted-components';

export default function App() {
  return (
    <CraftedProvider>
      <YourApp />
    </CraftedProvider>
  );
}
```

## Initializing

Call `initCraftedComponents` before your app renders to set custom brand colors and register images/icons. All keys are optional — anything you omit falls back to the built-in defaults.

```ts
import { initCraftedComponents } from 'crafted-components';

initCraftedComponents({
  colors: {
    primary: '#E63946',
    secondary: '#457B9D',
  },
  icons: {
    arrow: require('./assets/icons/arrow.png'),
    close: 'https://cdn.example.com/icons/close.png',
    // Vector icons (e.g. react-native-svg components) work too — CCIcon
    // renders them directly instead of through <Image>, and `tintColor`
    // is passed through as their `color` prop.
    star: StarIcon,
  },
  images: {
    logo: require('./assets/images/logo.png'),
    hero: 'https://cdn.example.com/images/hero.jpg',
  },
  components: {
    // Per-token style overrides, merged into the shared `typography` object.
    typography: {
      displayLarge: { fontFamily: 'YourDisplayFont-Bold' },
      body: { fontFamily: 'YourBodyFont-Regular' },
    },
  },
});
```

Color tokens (button states, input borders, header colors, etc.) are automatically derived from the base colors you provide. Icon values are `CCIconSource` — a local `require()` result, a remote URL string, or a vector icon component; image values are `CCImageSource` (`require()` result or URL string).

### Using registered assets

Access assets anywhere inside `CraftedProvider` via the `useAssets` hook:

```tsx
import { useAssets, CCIcon, CCImage } from 'crafted-components';

function MyComponent() {
  const { icons, images } = useAssets();

  return (
    <>
      <CCIcon source={icons.arrow} width={24} height={24} tintColor="#E63946" />
      <CCImage source={images.logo} width={120} aspectRatio={3} />
    </>
  );
}
```

## Switching themes

Three built-in themes are available: `default`, `ocean`, `sunset`.

Call `schemaStore.set()` from anywhere in your app to switch the active theme — all components update automatically:

```ts
import { schemaStore } from 'crafted-components';

schemaStore.set('ocean');
```

## Using components

```tsx
import { CCText, CCMainButton, CCScreenWrapper, CCRow } from 'crafted-components';

export default function HomeScreen() {
  return (
    <CCScreenWrapper>
      <CCRow>
        <CCText>Hello world</CCText>
      </CCRow>
      <CCMainButton label="Press me" onPress={() => {}} />
    </CCScreenWrapper>
  );
}
```

## Accessing theme tokens

Use the `useColorSchema` hook inside any component wrapped by `CraftedProvider`:

```tsx
import { useColorSchema } from 'crafted-components';

function MyComponent() {
  const schema = useColorSchema();

  return <View style={{ backgroundColor: schema.background }} />;
}
```

