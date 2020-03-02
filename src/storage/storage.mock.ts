export interface StorageMock extends Storage {
  clear: jest.Mock<void>;
  getItem: jest.Mock<null | string>;
  len: number;
  removeItem: jest.Mock<void>;
  setItem: jest.Mock<void>;
  mockClear: () => void;
  mockReset: () => void;
}

export const methods = ['clear', 'getItem', 'removeItem', 'setItem'];

const partialStorage: Partial<StorageMock> = {
  len: 0,
  get length() {
    return this.len || 0;
  },
  set length(length: number) {
    this.len = length;
  },
  mockClear() {
    methods.forEach(method => this[method].mockClear());
  },
  mockReset() {
    methods.forEach(method => this[method].mockReset());
  },
};

const appendMethod = (acc: StorageMock, method: string): StorageMock => ({
  ...acc,
  [method]: jest.fn().mockImplementation(() => method),
});

export const storageMock = (): StorageMock => methods.reduce(appendMethod, partialStorage as StorageMock);
