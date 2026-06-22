export const CCTextButtonConstants: {
  [key in string]: {
    height: number | 'auto';
    paddingHorizontal: number;
  };
} = {
  auto: {
    height: 'auto',
    paddingHorizontal: 12,
  },
  small: {
    height: 40,
    paddingHorizontal: 12,
  },
  medium: {
    height: 50,
    paddingHorizontal: 12,
  },
  large: {
    height: 56,
    paddingHorizontal: 16,
  },
};
