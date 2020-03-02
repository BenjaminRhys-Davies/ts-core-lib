// Mocks
const contentDisposition = 'EXPECTED CONTENT DISPOSITION HEADER NAME';
jest.mock('./name.enum', () => ({ name: { contentDisposition } }));

// Under test
import { fileName } from './fileName';

describe('fileName ()', () => {
  describe('can handle', () => {
    describe('missing', () => {
      it('header', () => {
        expect(fileName()).toEqual(undefined);
      });

      it('filename', () => {
        const headers = { [contentDisposition]: `attachment; something*=UTF-8''what;` };

        expect(fileName(headers)).toEqual(undefined);
      });
    });
    describe('invalid', () => {
      it('header', () => {
        const headers = { [contentDisposition]: `attachment; fileXname=` };

        expect(fileName(headers)).toEqual(undefined);
      });
    });
  });

  describe('can return', () => {
    [
      {
        expected: 'content.csv',
        header: 'attachment; filename=content.csv',
      },
      {
        expected: 'filename.txt.7z',
        header: `attachment; filename*=UTF-8''filename.txt.7z`,
      },
      {
        expected: 'EURO rates',
        header: `attachment; filename=EURO rates; filename*=utf-8''%e2%82%ac%20rates`,
      },
      {
        expected: 'EURO rates',
        header: `attachment; filename="EURO rates"; filename*=utf-8''%e2%82%ac%20rates`,
      },
      {
        expected: 'omÃ¡Ã¨ka.jpg.zip',
        header: 'attachment; filename="omÃ¡Ã¨ka.jpg.zip"',
      },
      {
        expected: 'omÃ¡Ã¨ka.jpg',
        // eslint-disable-next-line no-useless-escape
        header: `attachment; filename=\"omÃ¡Ã¨ka.jpg\"`,
      },
      {
        expected: '%A3%20rates',
        header: `attachment; filename*=iso-8859-1'en'%A3%20rates`,
      },
      {
        expected: "EXAMPLE- I'm ößä.dat",
        header: `attachment; filename=EXAMPLE- I'm ößä.dat; filename*=iso-8859-1''EXAMPLE-%20I%27m%20%F6%DF%E4.dat`,
      },
      {
        expected: 'EUR_2018-04-16_PR5_Candidate.zip',
        header: `attachment; filename=EUR_2018-04-16_PR5_Candidate.zip; filename*=UTF-8''EUR_2018-04-16_PR5_Candidate.zip`,
      },
    ].forEach(({ expected, header }) => {
      it(expected, () => {
        expect(fileName({ [contentDisposition]: header })).toEqual(expected);
      });
    });
  });
});
