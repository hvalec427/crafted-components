import {
  alertBannerService,
  showAlertBanner,
  hideAlertBanner,
} from '../components/CCAlertBanner/alertBannerService';

describe('alertBannerService', () => {
  it('calls the listener with config on show', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    alertBannerService.show({ message: 'Hello', type: 'success' });
    expect(listener).toHaveBeenCalledWith({ message: 'Hello', type: 'success' });
    unsub();
  });

  it('calls the listener with null on hide', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    alertBannerService.hide();
    expect(listener).toHaveBeenCalledWith(null);
    unsub();
  });

  it('does not call the listener after unsubscribe', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    unsub();
    alertBannerService.show({ message: 'Ignored', type: 'error' });
    expect(listener).not.toHaveBeenCalled();
  });

  it('replaces the previous listener when subscribing a second time', () => {
    const first = jest.fn();
    const second = jest.fn();
    const unsub1 = alertBannerService._subscribe(first);
    const unsub2 = alertBannerService._subscribe(second);
    alertBannerService.show({ message: 'Test', type: 'success' });
    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    unsub1();
    unsub2();
  });

  it('forwards duration in the config', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    alertBannerService.show({ message: 'Custom', type: 'error', duration: 5000 });
    expect(listener).toHaveBeenCalledWith({ message: 'Custom', type: 'error', duration: 5000 });
    unsub();
  });

  it('showAlertBanner convenience export delegates to show', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    showAlertBanner({ message: 'Convenience', type: 'error' });
    expect(listener).toHaveBeenCalledWith({ message: 'Convenience', type: 'error' });
    unsub();
  });

  it('hideAlertBanner convenience export delegates to hide', () => {
    const listener = jest.fn();
    const unsub = alertBannerService._subscribe(listener);
    hideAlertBanner();
    expect(listener).toHaveBeenCalledWith(null);
    unsub();
  });
});
