// Mocks
const etag = 'EXPECTED VERSION HEADER NAME';
jest.mock('./name.enum', () => ({ name: { etag } }));

// Under test
import { version } from './version';

describe('version ()', () => {
  describe('should', () => {
    describe('handle', () => {
      it('missing etag header', () => {
        expect(version()).toBeNull();
      });
    });

    describe('return', () => {
      it('etag header', () => {
        const v = 'EXPECTED VERSION';

        expect(version({ [etag]: v })).toEqual(v);
      });
    });
  });
});
