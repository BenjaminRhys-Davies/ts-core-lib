import { hello } from './index';

describe('hello ()', () => {
  it('returns welcome', () => {
    expect(hello()).toEqual('Hello world');
  });
});
