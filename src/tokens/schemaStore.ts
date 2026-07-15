import type { ColorSchema, ColorSchemaName } from './colorSchema';
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
