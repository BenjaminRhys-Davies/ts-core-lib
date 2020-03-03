// Under test
import { params } from './params';

describe('params ()', () => {
  describe('should', () => {
    describe('handle', () => {
      ['', '?', '#', '"', ',', '(', '<'].forEach(test => {
        it(`with '${test}'`, () => {
          expect(params(test)).toMatchObject({});
        });
      });
    });
    describe('return', () => {
      [
        { expected: { a: [] }, name: 'param with no value', test: 'a' },
        { expected: { bb: ['1'] }, name: 'param with single value', test: 'bb=1' },
        {
          expected: { bb: ['1 + 2 = 3'] },
          name: 'param with encoded value',
          test: `bb=${encodeURIComponent('1 + 2 = 3')}`,
        },
        { expected: { ccc: ['1', '2', '3'] }, name: 'param with delimited values', test: 'ccc=1,2,3' },
        { expected: { dddd: ['1', '2', '-3'] }, name: 'param with multiple values', test: 'dddd=1&dddd=2&dddd=-3' },
        {
          expected: { a: ['aa'], b: ['bb'], c: ['cc'] },
          name: 'multiple params with single values',
          test: 'a=aa&b=bb&c=cc',
        },
        {
          expected: { a: ['a', 'aa'], b: ['b', 'bb'], c: ['c', 'cc', 'ccc'] },
          name: 'multiple params with multiple values',
          test: 'a=a&b=b&b=bb&c=c,cc,ccc&a=aa',
        },
      ].forEach(({ expected, name, test }) => {
        it(name, () => {
          expect(params(`?${test}`)).toMatchObject(expected);
        });
      });
    });
  });
});
