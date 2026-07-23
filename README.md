# crafted-components

A React Native UI component library with built-in theming support.

## Local installation

In your consuming app, run:

```bash
yarn add file:../crafted-components --ignore-scripts
```

Or with yarn link:

```bash
# Inside crafted-components
yarn link

# Inside your app
yarn link crafted-components
```

### Required peer dependencies

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

### Using `CCIcon` and `CCImage` with an inline source

Both components also accept a `CCImageSource` directly, bypassing the asset store:

```tsx
<CCIcon source={require('./assets/icons/star.png')} width={20} height={20} />
<CCImage source="https://cdn.example.com/photo.jpg" width="100%" aspectRatio={16 / 9} />
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

## Storybook

The package ships its stories so you can run them inside your own app's Storybook to preview every component with your custom theme applied.

## Accessing theme tokens

Use the `useColorSchema` hook inside any component wrapped by `CraftedProvider`:

```tsx
import { useColorSchema } from 'crafted-components';

function MyComponent() {
  const schema = useColorSchema();

  return <View style={{ backgroundColor: schema.background }} />;
}
```
