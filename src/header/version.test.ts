// Mocks
const etag = 'EXPECTED VERSION HEADER NAME';
jest.mock('./name.enum', () => ({ name: { etag } }));

// Under test
import { version } from './version';

describe('version ()', () => {
  describe('can', () => {
    it('handle missing etag header', () => {
      expect(version()).toEqual(null);
    });

    it('return etag header', () => {
      const v = 'EXPECTED VERSION';

      expect(version({ [etag]: v })).toEqual(v);
    });
  });
});
