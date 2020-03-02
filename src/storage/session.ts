import { json } from '../parse/json';

export const store = <_, T>(key: string, value: T): void => sessionStorage.setItem(key, JSON.stringify(value));

export const retrieve = <T extends string | object>(key: string): undefined | T => {
  const value = sessionStorage.getItem(key);
  return value !== null ? (json(value) as T) : undefined;
};

export const remove = (key: string): void => sessionStorage.removeItem(key);
