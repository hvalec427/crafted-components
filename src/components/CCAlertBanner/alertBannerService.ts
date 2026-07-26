export type AlertBannerType = 'success' | 'error';

export interface AlertBannerConfig {
  message: string;
  type: AlertBannerType;
  /** Auto-dismiss delay in ms. Defaults to 3000. */
  duration?: number;
}

type Listener = (config: AlertBannerConfig | null) => void;

let _listener: Listener | null = null;

export const alertBannerService = {
  show(config: AlertBannerConfig) {
    _listener?.(config);
  },
  hide() {
    _listener?.(null);
  },
  _subscribe(fn: Listener): () => void {
    _listener = fn;
    return () => {
      if (_listener === fn) _listener = null;
    };
  },
};

export const showAlertBanner = (config: AlertBannerConfig) => alertBannerService.show(config);
export const hideAlertBanner = () => alertBannerService.hide();
