import { testProps } from '../utils/CCTestingId';

describe('testProps', () => {
  it('returns testID matching the provided id', () => {
    expect(testProps('my-button')).toEqual({ testID: 'my-button' });
  });

  it('returns MISSING_LABEL when id is undefined', () => {
    expect(testProps(undefined)).toEqual({ testID: 'MISSING_LABEL' });
  });

  it('returns MISSING_LABEL when id is omitted', () => {
    expect(testProps()).toEqual({ testID: 'MISSING_LABEL' });
  });

  it('preserves empty string id', () => {
    expect(testProps('')).toEqual({ testID: '' });
  });
});
