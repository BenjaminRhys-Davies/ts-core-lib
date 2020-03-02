import { json } from '../parse/json';

export const store = <T>(key: string, value: T): void =>
  sessionStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));

export const retrieve = <T extends string | object>(key: string): null | T => {
  const value = sessionStorage.getItem(key);
  return value !== null ? (json(value) as T) : null;
};

export const remove = (key: string): void => sessionStorage.removeItem(key);
