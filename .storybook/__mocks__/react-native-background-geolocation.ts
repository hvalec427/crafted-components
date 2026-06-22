const BackgroundGeolocation = {
  ready: () => Promise.resolve(),
  start: () => Promise.resolve(),
  stop: () => Promise.resolve(),
  onLocation: () => ({ remove: () => {} }),
  getCurrentPosition: () => Promise.resolve({}),
};
export default BackgroundGeolocation;
