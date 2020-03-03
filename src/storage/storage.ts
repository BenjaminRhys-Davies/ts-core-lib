import { json } from '../parse/json';

type StorageFn = {
  remove: (key: string) => void;
  retrieve: <T>(key: string) => null | T;
  store: (key: string, value: unknown) => void;
};

const storageFn = (store: Storage): StorageFn => ({
  remove: (key: string): void => store.removeItem(key),
  retrieve: <T>(key: string) => {
    const value = store.getItem(key);
    if (value !== null) {
      const jsonValue = json(value);
      if (jsonValue !== undefined) {
        return jsonValue as T;
      }
    }
    return null;
  },
  store: <_, T>(key: string, value: T): void => store.setItem(key, JSON.stringify(value)),
});

export const local = storageFn(localStorage);
export const session = storageFn(sessionStorage);
