import { storage, helper } from './storage.mock';

// Mocks
const jsonMock = jest.fn();
jest.doMock('../parse', () => ({ parse: { json: jsonMock } }));

// Under test
import { retrieve, store, remove } from './session';

describe('Session', () => {
  const key = 'EXPECTED KEY';
  const sessionData = ['', '1', 'email@address.com', { isUser: true }];

  let sessionStorageMock: ReturnType<typeof storage>;
  let sessionStorageMockClear: () => void;

  beforeEach(() => {
    sessionStorageMock = storage();
    sessionStorageMockClear = helper(sessionStorageMock, 'mockClear');

    Object.defineProperty(global, 'sessionStorage', {
      enumerable: true,
      value: sessionStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    sessionStorageMockClear();
  });

  describe('retrieve ()', () => {
    describe('can get', () => {
      sessionData.forEach(session => {
        let value: null | typeof session;

        beforeEach(() => {
          store(key, session);
          value = retrieve<typeof session>(key);
        });
        it('item', () => {
          expect(sessionStorageMock.getItem).toHaveBeenCalledWith(key);
        });
        it('value', () => {
          expect(value).toEqual(session);
        });
      });
    });
  });

  describe('store ()', () => {
    describe('can persist', () => {
      sessionData.forEach(session => {
        beforeEach(() => {
          store(key, session);
        });
        it('session', () => {
          expect(sessionStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(session));
        });
      });
    });
  });

  describe('remove ()', () => {
    describe('can clear', () => {
      sessionData.forEach(session => {
        beforeEach(() => {
          store(key, session);
          remove(key);
        });
        it('item', () => {
          expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(key);
        });
        it('value', () => {
          expect(retrieve<typeof session>(key)).toBeNull();
        });
      });
    });
  });
});
