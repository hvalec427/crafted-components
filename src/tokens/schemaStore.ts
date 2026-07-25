import type { CCImageSource } from '../utils/CCImageSource';
import type { BaseColors, ColorSchema, ColorSchemaName, DeepPartial, ExtraColors, RawColorSchema } from './colorSchema';
import type { BuiltInIcons, BuiltInImages } from './assetSchema';
import type { ComponentSchema } from './componentSchema';
import { CCMainButtonConstants } from '../components/CCButton/CCMainButtonStyle';
import { CCBoxConstants } from '../components/CCBox/CCBoxConstants';
import { initCraftedAssets } from './assetStore';
import { useAssets as _useAssets } from './AssetContext';
import { useTheme as _useTheme } from './ColorSchemaContext';
import defaultSchema from './schemas/default.json';
import oceanSchema from './schemas/ocean.json';
import sunsetSchema from './schemas/sunset.json';

// Base color keys, longest first to avoid prefix-matching ambiguity
const BASE_KEYS = ['background', 'secondary', 'primary', 'surface', 'success', 'warning', 'border', 'error', 'info', 'text'] as const;
const HEX2 = /^[0-9A-Fa-f]{2}$/;

function resolveTokens(raw: Record<string, unknown>): ColorSchema {
  const base = Object.fromEntries(BASE_KEYS.map(k => [k, raw[k] as string]));

  function resolve(v: unknown): unknown {
    if (typeof v === 'string' && v.startsWith('$')) {
      const token = v.slice(1);
      const key = BASE_KEYS.find(k => token.startsWith(k));
      if (!key) throw new Error(`Unknown color token: ${v}`);
      const suffix = token.slice(key.length);
      if (suffix.length === 0) return base[key];
      if (HEX2.test(suffix)) return base[key] + suffix.toUpperCase();
      throw new Error(`Invalid token format: ${v}`);
    }
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      return Object.fromEntries(
        Object.entries(v as Record<string, unknown>).map(([k, val]) => [k, resolve(val)])
      );
    }
    return v;
  }

  return resolve(raw) as ColorSchema;
}

function deepMerge(base: Record<string, unknown>, overrides: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const [key, val] of Object.entries(overrides)) {
    if (val && typeof val === 'object' && !Array.isArray(val) && typeof result[key] === 'object' && result[key] !== null) {
      result[key] = deepMerge(result[key] as Record<string, unknown>, val as Record<string, unknown>);
    } else {
      result[key] = val;
    }
  }
  return result;
}

const schemas: Record<ColorSchemaName, ColorSchema> = {
  default: resolveTokens(defaultSchema as Record<string, unknown>),
  ocean:   resolveTokens(oceanSchema as Record<string, unknown>),
  sunset:  resolveTokens(sunsetSchema as Record<string, unknown>),
};

let _current: ColorSchema = schemas.default;

const _listeners = new Set<(schema: ColorSchema) => void>();

export const schemaStore = {
  getSchema(): ColorSchema {
    return _current;
  },

  set(name: ColorSchemaName): void {
    _current = schemas[name];
    _listeners.forEach(fn => fn(_current));
  },

  subscribe(fn: (schema: ColorSchema) => void): () => void {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};

export function initCraftedComponents<
  TIcons extends Record<string, CCImageSource> = Record<never, never>,
  TImages extends Record<string, CCImageSource> = Record<never, never>,
  TColors extends DeepPartial<RawColorSchema> = Record<never, never>
>({ colors, icons, images, components }: {
  colors?: TColors;
  icons?: TIcons;
  images?: TImages;
  components?: Partial<ComponentSchema>;
} = {}): {
  useAssets: () => { icons: BuiltInIcons & TIcons; images: BuiltInImages & TImages };
  useTheme: () => ColorSchema & ExtraColors<TColors>;
} {
  if (colors) {
    const merged = deepMerge(defaultSchema as Record<string, unknown>, colors as Record<string, unknown>);
    _current = resolveTokens(merged);
    _listeners.forEach(fn => fn(_current));
  }

  if (icons || images) {
    initCraftedAssets({ icons, images });
  }

  if (components?.CCMainButton?.sizes) {
    const sizes = components.CCMainButton.sizes;
    for (const [size, overrides] of Object.entries(sizes) as [string, { height?: number; paddingHorizontal?: number }][]) {
      if (CCMainButtonConstants[size]) {
        Object.assign(CCMainButtonConstants[size], overrides);
      }
    }
  }

  if (components?.CCBox?.borderRadius) {
    Object.assign(CCBoxConstants.borderRadius, components.CCBox.borderRadius);
  }

  return {
    useAssets: _useAssets as () => { icons: BuiltInIcons & TIcons; images: BuiltInImages & TImages },
    useTheme: _useTheme as () => ColorSchema & ExtraColors<TColors>,
  };
}
