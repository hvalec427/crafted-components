# crafted-components

A React Native UI component library with built-in theming support.

## Installation

Add the following to your project's `.npmrc`:

```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
@hvalec427:registry=https://npm.pkg.github.com
always-auth=true
```

Then install:

```bash
yarn add @hvalec427/crafted-components
```

### Peer dependencies

Install these in your app if not already present:

```bash
yarn add react-native-safe-area-context react-native-gesture-handler react-native-keyboard-aware-scroll-view
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
  },
  images: {
    logo: require('./assets/images/logo.png'),
    hero: 'https://cdn.example.com/images/hero.jpg',
  },
});
```

Color tokens (button states, input borders, header colors, etc.) are automatically derived from the base colors you provide. Icon and image values are `CCImageSource` — either a local `require()` result or a remote URL string.

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

