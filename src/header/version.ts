import { name } from './name.enum';

export const version = (headers: { [name: string]: string } = {}): null | string => {
  const { [name.etag]: etag } = headers;

  return etag || null;
};
