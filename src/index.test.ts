// Mocks
const form = 'EXPECTED FORM';
jest.mock('./form', () => ({ form }));

const header = 'EXPECTED HEADER';
jest.mock('./header', () => ({ header }));

// Under test
import * as index from './index';

describe('index', () => {
  describe('should export', () => {
    it('form', () => {
      expect(index.form).toEqual(form);
    });
    it('header', () => {
      expect(index.header).toEqual(header);
    });
  });
});
