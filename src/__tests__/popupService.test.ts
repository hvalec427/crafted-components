import {
  popupStore,
  showPopup,
  hidePopup,
} from '../components/CCPopup/popupService';

afterEach(() => {
  popupStore.register({});
});

describe('popupStore.register / getRegistered', () => {
  it('round-trips a popup map', () => {
    const popups = { alert: () => null };
    popupStore.register(popups);
    expect(popupStore.getRegistered()).toBe(popups);
  });

  it('replaces any previous registrations', () => {
    popupStore.register({ a: () => null });
    const second = { b: () => null };
    popupStore.register(second);
    expect(popupStore.getRegistered()).toBe(second);
  });
});

describe('popupStore subscription', () => {
  it('calls the listener with route and payload on show', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    popupStore.show('alert', { title: 'Hi' });
    expect(listener).toHaveBeenCalledWith({ route: 'alert', payload: { title: 'Hi' } });
    unsub();
  });

  it('calls the listener with undefined payload when none is provided', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    popupStore.show('confirm');
    expect(listener).toHaveBeenCalledWith({ route: 'confirm', payload: undefined });
    unsub();
  });

  it('calls the listener with null on hide', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    popupStore.hide();
    expect(listener).toHaveBeenCalledWith(null);
    unsub();
  });

  it('does not call the listener after unsubscribe', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    unsub();
    popupStore.show('alert');
    expect(listener).not.toHaveBeenCalled();
  });

  it('replaces previous listener on second subscribe', () => {
    const first = jest.fn();
    const second = jest.fn();
    const unsub1 = popupStore._subscribe(first);
    const unsub2 = popupStore._subscribe(second);
    popupStore.show('x');
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    unsub1();
    unsub2();
  });
});

describe('showPopup / hidePopup convenience exports', () => {
  it('showPopup delegates to popupStore.show', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    showPopup('confirm', 'payload-data');
    expect(listener).toHaveBeenCalledWith({ route: 'confirm', payload: 'payload-data' });
    unsub();
  });

  it('hidePopup delegates to popupStore.hide', () => {
    const listener = jest.fn();
    const unsub = popupStore._subscribe(listener);
    hidePopup();
    expect(listener).toHaveBeenCalledWith(null);
    unsub();
  });
});
