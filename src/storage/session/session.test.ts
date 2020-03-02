import { storageMock } from '../storage.mock';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

// Mocks
const jsonMockResult = 'EXPECTED PARSE JSON RESULT';
const jsonMock = jest.fn().mockImplementation(() => jsonMockResult);
jest.mock('../../parse/json', () => ({ json: jsonMock }));

// Under test
import { remove, retrieve, store } from './session';

describe('Session', () => {
  const key = 'EXPECTED KEY';
  const sessionData = ['', '1', 'email@address.com', { isUser: true }];
  let sessionStorageMock: ReturnType<typeof storageMock>;

  beforeEach(() => {
    sessionStorageMock = storageMock();

    Object.defineProperty(global, 'sessionStorage', {
      enumerable: true,
      value: sessionStorageMock,
      writable: true,
    });
  });

  afterEach(() => {
    jsonMock.mockClear();
    sessionStorageMock.mockClear();
  });

  describe('remove ()', () => {
    describe('should', () => {
      beforeEach(() => {
        remove(key);
      });
      it('remove item', () => {
        expect(sessionStorageMock.removeItem).toHaveBeenCalledWith(key);
      });
    });
  });

  describe('retrieve ()', () => {
    describe('should', () => {
      sessionData.forEach(session => {
        describe('get', () => {
          let value: undefined | ElementType<typeof sessionData>;

          beforeEach(() => {
            sessionStorageMock.getItem.mockImplementation(() => JSON.stringify(session));
            value = retrieve<typeof session>(key);
          });

          afterEach(() => {
            jsonMock.mockClear();
          });

          it('item', () => {
            expect(sessionStorageMock.getItem).toHaveBeenCalledWith(key);
          });
          it('parse item', () => {
            expect(jsonMock).toHaveBeenCalledWith(JSON.stringify(session));
          });
          it('return value', () => {
            expect(value).toEqual(jsonMockResult);
          });
        });
      });

      describe('handle a non-existing key', () => {
        let value: undefined | string;

        beforeEach(() => {
          sessionStorageMock.getItem.mockImplementation(() => null);
          value = retrieve<string>('NON_EXISTING KEY');
        });

        it('not parse item', () => {
          expect(jsonMock).not.toHaveBeenCalled();
        });
        it('return undefined', () => {
          expect(value).toBeUndefined();
        });
      });
    });
  });

  describe('store ()', () => {
    describe('should', () => {
      sessionData.forEach(session => {
        beforeEach(() => {
          store(key, session);
        });
        it('set item', () => {
          expect(sessionStorageMock.setItem).toHaveBeenCalledWith(key, JSON.stringify(session));
        });
      });
    });
  });
});
