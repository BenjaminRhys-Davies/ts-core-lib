// Under test
import { json } from './json';

describe('json ()', () => {
  describe('should', () => {
    describe('handle failure', () => {
      ['', '{', '<', '"', ',', '('].forEach(test => {
        it(`with '${test}'`, () => {
          expect(json(test)).toEqual(undefined);
        });
      });
    });
    describe('parse', () => {
      [
        { expected: false, test: 'false', type: 'boolean' },
        { expected: 11, test: '11', type: 'number' },
        { expected: 'string', test: '"string"', type: 'string' },
        { expected: {}, test: '{}', type: 'object' },
        { expected: { a: 1 }, test: '{"a":1}', type: 'object' },
      ].forEach(({ expected, test, type }) => {
        describe(`'${test}' returns expected`, () => {
          it('type', () => {
            expect(typeof json(test)).toEqual(type);
          });
          it('value', () => {
            expect(json(test)).toEqual(expected);
          });
        });
      });
    });
  });
});
