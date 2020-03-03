// Under test
import { csv, LineDecorator } from './csv';

type Line = {
  [s: string]: string;
};

type TestDataCSV<T> = {
  decorators?: LineDecorator<T>[];
  expected: string;
  lines?: T[];
  name: string;
};

describe('csv ()', () => {
  describe('should handle', () => {
    const testData: TestDataCSV<Line>[] = [
      {
        expected: '\r\n',
        name: 'nothing',
      },
      {
        expected: '\r\n\r\n',
        lines: [{}],
        name: 'one empty line',
      },
      {
        decorators: [{ header: 'h1' }, { header: 'h2' }, { header: 'h3' }, { header: 'h4' }],
        expected: 'h1,h2,h3,h4\r\n',
        name: 'multiple headers',
      },
      {
        decorators: [
          { header: 'h1', decorator: () => 'HARDCODED' },
          { header: 'h2', decorator: ({ a }) => a },
          { header: 'h3', decorator: ({ b }) => b },
          { header: 'h4', decorator: ({ c }) => c },
        ],
        expected:
          'h1,h2,h3,h4\r\nHARDCODED,a1,b1,c1\r\nHARDCODED,a2,b2,c2\r\nHARDCODED,a3,b3,c3\r\nHARDCODED,a4,b4,c4\r\n',
        lines: [
          { a: 'a1', b: 'b1', c: 'c1' },
          { a: 'a2', b: 'b2', c: 'c2' },
          { a: 'a3', b: 'b3', c: 'c3' },
          { a: 'a4', b: 'b4', c: 'c4' },
        ],
        name: 'multiple values',
      },
      {
        decorators: [{ header: 'col1', decorator: () => 'HARDCODED' }],
        expected: 'col1\r\nHARDCODED\r\n',
        lines: [{}],
        name: 'hardcoded decoration',
      },
      {
        decorators: [{ header: 'col1', decorator: ({ painted }) => painted }],
        expected: 'col1\r\nPAINTED\r\n',
        lines: [{ painted: 'PAINTED' }],
        name: 'dynamic decoration',
      },
      {
        decorators: [{ header: 'headerIncludes"doubleQuote' }],
        expected: '"headerIncludes""doubleQuote"\r\n',
        name: 'header including double quote',
      },
      {
        decorators: [{ header: 'headerIncludes,commaSeparator' }],
        expected: `"headerIncludes,commaSeparator"\r\n`,
        name: 'header including comma',
      },
      {
        decorators: [{ header: 'headerIncludes\rReturn' }],
        expected: '"headerIncludes\rReturn"\r\n',
        name: 'header including carridge return',
      },
      {
        decorators: [{ header: 'headerIncludes\nFeed' }],
        expected: '"headerIncludes\nFeed"\r\n',
        name: 'header including line feed',
      },
      {
        decorators: [{ header: 'col1', decorator: () => 'valueIncludes"doubleQuote' }],
        expected: 'col1\r\n"valueIncludes""doubleQuote"\r\n',
        lines: [{}],
        name: 'value including double quote',
      },
      {
        decorators: [{ header: 'col1', decorator: () => 'valueIncludes,commaSeparator' }],
        expected: 'col1\r\n"valueIncludes,commaSeparator"\r\n',
        lines: [{}],
        name: 'value including comma',
      },
      {
        decorators: [{ header: 'col1', decorator: () => 'valueIncludes\rReturn' }],
        expected: 'col1\r\n"valueIncludes\rReturn"\r\n',
        lines: [{}],
        name: 'value including carridge return',
      },
      {
        decorators: [{ header: 'col1', decorator: () => 'valueIncludes\nFeed' }],
        expected: 'col1\r\n"valueIncludes\nFeed"\r\n',
        lines: [{}],
        name: 'value including line feed',
      },
    ];

    testData.forEach(({ decorators = [], expected, lines = [], name }) => {
      it(name, () => {
        expect(csv(lines, decorators)).toEqual(expected);
      });
    });
  });
});
