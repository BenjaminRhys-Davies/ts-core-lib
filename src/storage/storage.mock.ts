export interface MockStorage extends Storage {
  clear: jest.Mock<void>;
  getItem: jest.Mock<null | string>;
  len: number;
  length: number;
  removeItem: jest.Mock<void>;
  setItem: jest.Mock<void>;
}

export const methods = ['clear', 'getItem', 'removeItem', 'setItem'];

const partialStorage: Partial<MockStorage> = {
  len: 0,
  get length() {
    return this.len || 0;
  },
  set length(length: number) {
    this.len = length;
  },
};

const appendMethod = (acc: MockStorage, method: string): MockStorage => ({
  ...acc,
  [method]: jest.fn().mockImplementation(() => method),
});

export const storage = (): MockStorage => methods.reduce(appendMethod, partialStorage as MockStorage);

export const helper = (mock: MockStorage, mockHelper: 'mockClear' | 'mockReset'): (() => void) => () => {
  methods.map(method => mock[method][mockHelper]());
};
