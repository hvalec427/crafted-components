// Break the circular dep: schemaStore.ts → ColorSchemaContext.tsx → schemaStore.ts
// Without this mock, ColorSchemaContext calls schemaStore.getSchema() before schemaStore
// has finished initialising, because schemaStore.ts is the module being loaded first.
jest.mock('../tokens/ColorSchemaContext', () => ({
  useTheme: jest.fn(),
  ColorSchemaProvider: jest.fn(({ children }: { children: unknown }) => children),
}));

import { schemaStore, initCraftedComponents } from '../tokens/schemaStore';

beforeEach(() => schemaStore.set('default'));

describe('schemaStore', () => {
  it('getSchema returns a schema with a hex primary color', () => {
    const schema = schemaStore.getSchema();
    expect(typeof schema.primary).toBe('string');
    expect(schema.primary).toMatch(/^#[0-9A-Fa-f]{6}$/);
  });

  it('set("ocean") produces a different primary than default', () => {
    const defaultPrimary = schemaStore.getSchema().primary;
    schemaStore.set('ocean');
    expect(schemaStore.getSchema().primary).not.toBe(defaultPrimary);
  });

  it('set("sunset") produces a different primary than default', () => {
    const defaultPrimary = schemaStore.getSchema().primary;
    schemaStore.set('sunset');
    expect(schemaStore.getSchema().primary).not.toBe(defaultPrimary);
  });

  it('notifies subscribers when the schema changes', () => {
    const listener = jest.fn();
    const unsub = schemaStore.subscribe(listener);
    schemaStore.set('ocean');
    expect(listener).toHaveBeenCalledWith(schemaStore.getSchema());
    unsub();
  });

  it('does not notify a subscriber after it unsubscribes', () => {
    const listener = jest.fn();
    const unsub = schemaStore.subscribe(listener);
    unsub();
    schemaStore.set('ocean');
    expect(listener).not.toHaveBeenCalled();
  });

  it('notifies all active subscribers independently', () => {
    const a = jest.fn();
    const b = jest.fn();
    const unsubA = schemaStore.subscribe(a);
    const unsubB = schemaStore.subscribe(b);
    schemaStore.set('sunset');
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    unsubA();
    unsubB();
  });
});

describe('resolveTokens (via initCraftedComponents color override)', () => {
  afterEach(() => schemaStore.set('default'));

  it('resolves a plain $primary token to the overridden primary color', () => {
    initCraftedComponents({ colors: { primary: '#AABBCC' } });
    expect(schemaStore.getSchema().button.primaryBg).toBe('#AABBCC');
  });

  it('resolves a $primary<HH> token to primary + the 2-hex suffix', () => {
    initCraftedComponents({ colors: { primary: '#FF0000' } });
    // $primaryD1 → '#FF0000' + 'D1'
    expect(schemaStore.getSchema().button.primaryPressedBg).toBe('#FF0000D1');
  });

  it('resolves $primary<HH> suffix in upper-case regardless of input case', () => {
    initCraftedComponents({ colors: { primary: '#FF0000' } });
    // $primary47 → '#FF0000' + '47'
    expect(schemaStore.getSchema().button.primaryDisabledBg).toBe('#FF000047');
  });

  it('does not overwrite non-overridden keys', () => {
    const defaultSurface = schemaStore.getSchema().surface;
    initCraftedComponents({ colors: { primary: '#123456' } });
    expect(schemaStore.getSchema().surface).toBe(defaultSurface);
  });

  it('overriding a base color also updates resolved nested tokens', () => {
    initCraftedComponents({ colors: { primary: '#00FF00' } });
    // Both the base and a nested token derived from it must reflect the override
    expect(schemaStore.getSchema().primary).toBe('#00FF00');
    expect(schemaStore.getSchema().button.primaryBg).toBe('#00FF00');
  });
});
