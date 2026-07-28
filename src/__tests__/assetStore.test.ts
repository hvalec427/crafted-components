import { assetStore, initCraftedAssets } from '../tokens/assetStore';

describe('assetStore', () => {
  it('getAssets includes the built-in arrow icon', () => {
    const assets = assetStore.getAssets();
    expect(assets.icons).toHaveProperty('arrow');
  });

  it('getAssets has an images key', () => {
    expect(assetStore.getAssets()).toHaveProperty('images');
  });

  it('subscribe fires after initCraftedAssets', () => {
    const listener = jest.fn();
    const unsub = assetStore.subscribe(listener);
    initCraftedAssets({ icons: { customIcon: 1 } });
    expect(listener).toHaveBeenCalledTimes(1);
    unsub();
  });

  it('initCraftedAssets merges custom icons while preserving built-ins', () => {
    initCraftedAssets({ icons: { myIcon: 42 } });
    const assets = assetStore.getAssets();
    expect(assets.icons).toHaveProperty('myIcon', 42);
    expect(assets.icons).toHaveProperty('arrow');
  });

  it('initCraftedAssets merges custom images', () => {
    initCraftedAssets({ images: { splash: 99 } });
    expect(assetStore.getAssets().images).toHaveProperty('splash', 99);
  });

  it('does not call the subscriber after it unsubscribes', () => {
    const listener = jest.fn();
    const unsub = assetStore.subscribe(listener);
    unsub();
    initCraftedAssets({ icons: { ignored: 0 } });
    expect(listener).not.toHaveBeenCalled();
  });

  it('multiple subscribers are each notified', () => {
    const a = jest.fn();
    const b = jest.fn();
    const unsubA = assetStore.subscribe(a);
    const unsubB = assetStore.subscribe(b);
    initCraftedAssets({ icons: { multi: 7 } });
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    unsubA();
    unsubB();
  });
});
