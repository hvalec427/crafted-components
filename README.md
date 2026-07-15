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

## Initializing with custom brand colors

Call `initCraftedComponents` before your app renders to set custom brand colors. Any keys you omit fall back to the default theme.

```ts
import { initCraftedComponents } from 'crafted-components';

initCraftedComponents({
  primary: '#E63946',
  secondary: '#457B9D',
});
```

All component-level tokens (button states, input borders, header colors, etc.) are automatically derived from the base colors you provide.

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
