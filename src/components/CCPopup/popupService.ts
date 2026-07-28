import type React from 'react';

export type PopupRenderFn<P = void> = (payload: P) => React.ReactNode;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PopupRegistration = Record<string, PopupRenderFn<any>>;

export interface PopupEntry {
  route: string;
  payload: unknown;
}

export type PopupPayloadOf<T extends PopupRegistration, K extends keyof T> =
  T[K] extends PopupRenderFn<infer P> ? P : never;

export type TypedShowPopup<T extends PopupRegistration> = <K extends keyof T>(
  ...args: [PopupPayloadOf<T, K>] extends [void | undefined]
    ? [route: K, payload?: PopupPayloadOf<T, K>]
    : [route: K, payload: PopupPayloadOf<T, K>]
) => void;

type Listener = (entry: PopupEntry | null) => void;

let _popups: PopupRegistration = {};
let _listener: Listener | null = null;

export const popupStore = {
  register(popups: PopupRegistration): void {
    _popups = popups;
  },
  getRegistered(): PopupRegistration {
    return _popups;
  },
  show(route: string, payload?: unknown): void {
    _listener?.({ route, payload });
  },
  hide(): void {
    _listener?.(null);
  },
  _subscribe(fn: Listener): () => void {
    _listener = fn;
    return () => {
      if (_listener === fn) _listener = null;
    };
  },
};

export const showPopup = (route: string, payload?: unknown) => popupStore.show(route, payload);
export const hidePopup = () => popupStore.hide();
