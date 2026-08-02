export interface ToastConfig {
  message: string;
  /** Auto-dismiss delay in ms. Defaults to 2400. */
  duration?: number;
}

type Listener = (config: ToastConfig | null) => void;

let _listener: Listener | null = null;

export const toastService = {
  show(config: ToastConfig) {
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

export const showToast = (config: ToastConfig) => toastService.show(config);
export const hideToast = () => toastService.hide();
