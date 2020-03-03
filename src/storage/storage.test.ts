import { storageMock } from './storage.mock';

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer ElementType> ? ElementType : never;

const localStorageMock = storageMock();
const sessionStorageMock = storageMock();

const globals = [
  { property: 'localStorage', mock: localStorageMock },
  { property: 'sessionStorage', mock: sessionStorageMock },
];

globals.forEach(({ mock: value, property }) => {
  Object.defineProperty(global, property, {
    value,
    enumerable: true,
    writable: true,
  });
});

// Mocks
const jsonMockResult = 'EXPECTED PARSE JSON RESULT';
const jsonMock = jest.fn().mockImplementation(() => jsonMockResult);
jest.mock('../parse/json', () => ({ json: jsonMock }));

// Under test
import { local, session } from './storage';

describe('Storage', () => {
  afterEach(() => {
    jsonMock.mockClear();
    globals.forEach(({ mock }) => mock.mockClear());
  });

  [
    { mock: localStorageMock, name: 'Local', storage: local },
    { mock: sessionStorageMock, name: 'Session', storage: session },
  ].forEach(({ mock, name, storage }) => {
    describe(name, () => {
      const { remove, retrieve, store } = storage;
      const key = 'EXPECTED KEY';
      const testData = ['', '1', 'email@address.com', { isUser: true }];

      describe('remove ()', () => {
        describe('should', () => {
          beforeEach(() => {
            remove(key);
          });
          it('remove item', () => {
            expect(mock.removeItem).toHaveBeenCalledWith(key);
          });
        });
      });

      describe('retrieve ()', () => {
        describe('should', () => {
          testData.forEach(data => {
            describe('get', () => {
              let value: null | ElementType<typeof testData>;

              beforeEach(() => {
                mock.getItem.mockImplementation(() => JSON.stringify(data));
                value = retrieve<typeof data>(key);
              });

              afterEach(() => {
                jsonMock.mockClear();
              });

              it('item', () => {
                expect(mock.getItem).toHaveBeenCalledWith(key);
              });
              it('parse item', () => {
                expect(jsonMock).toHaveBeenCalledWith(JSON.stringify(data));
              });
              it('return value', () => {
                expect(value).toEqual(jsonMockResult);
              });
            });
          });

          describe('handle a non-existing key', () => {
            let value: null | string;

            beforeEach(() => {
              mock.getItem.mockImplementation(() => null);
              value = retrieve('NON_EXISTING KEY');
            });

            it('not parse item', () => {
              expect(jsonMock).not.toHaveBeenCalled();
            });
            it('return null', () => {
              expect(value).toBeNull();
            });
          });
        });
      });

      describe('store ()', () => {
        describe('should', () => {
          testData.forEach(data => {
            beforeEach(() => {
              store(key, data);
            });
            it('set item', () => {
              expect(mock.setItem).toHaveBeenCalledWith(key, JSON.stringify(data));
            });
          });
        });
      });
    });
  });
});
