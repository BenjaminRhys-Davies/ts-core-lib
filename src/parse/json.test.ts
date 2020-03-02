// Under test
import { json } from './json';

describe('json ()', () => {
  describe('can gracefully fail', () => {
    ['', '{', '<', '"', ',', '('].forEach(test => {
      it(`with '${test}'`, () => {
        expect(json(test)).toEqual(undefined);
      });
    });
  });
  describe('can parse', () => {
    [
      { test: 'false', type: 'boolean' },
      { test: '11', type: 'number' },
      { test: '"string"', type: 'string' },
      { test: '{}', type: 'object' },
      { test: '{"a":1}', type: 'object' },
    ].forEach(({ test, type }) => {
      it(`with '${test}'`, () => {
        expect(typeof json(test)).toEqual(type);
      });
    });
  });
});
