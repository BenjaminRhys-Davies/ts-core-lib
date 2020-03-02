// Mocks
const form = 'EXPECTED FORM';
jest.mock('./form', () => ({ form }));

const header = 'EXPECTED HEADER';
jest.mock('./header', () => ({ header }));

const parse = 'EXPECTED PARSE';
jest.mock('./parse', () => ({ parse }));

const storage = 'EXPECTED STORAGE';
jest.mock('./storage', () => ({ storage }));

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
    it('parse', () => {
      expect(index.parse).toEqual(parse);
    });
    it('storage', () => {
      expect(index.storage).toEqual(storage);
    });
  });
});
