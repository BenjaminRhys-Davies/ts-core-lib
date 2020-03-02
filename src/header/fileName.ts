import { name } from './name.enum';

export const fileName = (headers: { [name: string]: string } = {}): undefined | string => {
  const { [name.contentDisposition]: contentDisposition } = headers;
  const fileNameRegex = /filename[^;=\n]*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/i;

  if (contentDisposition) {
    const matches = fileNameRegex.exec(contentDisposition) || [];
    if (matches.length) {
      return matches.filter(m => m).slice(-1)[0];
    }
  }
  return undefined;
};
