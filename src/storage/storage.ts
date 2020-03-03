import { json } from '../parse/json';

type StorageFn = {
  remove: (key: string) => void;
  retrieve: <T>(key: string) => null | T;
  store: (key: string, value: unknown) => void;
};

const storageFn = (store: Storage): StorageFn => ({
  remove: (key: string): void => store.removeItem(key),
  retrieve: <T>(key: string) => {
    const serialised = store.getItem(key);
    if (serialised !== null) {
      const value = json(serialised);
      if (value !== undefined) {
        return value as T;
      }
    }
    return null;
  },
  store: <_, T>(key: string, value: T): void => store.setItem(key, JSON.stringify(value)),
});

export const local = storageFn(localStorage);
export const session = storageFn(sessionStorage);
