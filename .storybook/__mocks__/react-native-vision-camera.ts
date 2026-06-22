export const Camera = () => null;
export const useCameraDevice = () => undefined;
export const useCameraDevices = () => ({});
export const useCodeScanner = () => ({});
export const getCameraPermissionStatus = () => 'not-determined';
export const requestCameraPermission = () => Promise.resolve('denied');
export const CameraPermissionStatus = {};
export const CameraRuntimeError = class {};
