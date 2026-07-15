import type { ColorSchema, ColorSchemaName } from './colorSchema';
import { makeSchema } from './colorSchema';
import defaultBase from './schemas/default.json';
import oceanBase from './schemas/ocean.json';
import sunsetBase from './schemas/sunset.json';

const bases: Record<ColorSchemaName, typeof defaultBase> = {
  default: defaultBase,
  ocean:   oceanBase,
  sunset:  sunsetBase,
};

let _current: ColorSchema = makeSchema(defaultBase);

const _listeners = new Set<(schema: ColorSchema) => void>();

export const schemaStore = {
  getSchema(): ColorSchema {
    return _current;
  },

  set(name: ColorSchemaName): void {
    _current = makeSchema(bases[name]);
    _listeners.forEach(fn => fn(_current));
  },

  subscribe(fn: (schema: ColorSchema) => void): () => void {
    _listeners.add(fn);
    return () => _listeners.delete(fn);
  },
};
