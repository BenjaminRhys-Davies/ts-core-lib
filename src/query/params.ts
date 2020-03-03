type QueryParams = {
  [key: string]: string[];
};

const hashSeperator = '&';
const valueSeperator = '=';
const multiValueSeperator = ',';

export const params = (queryString = ''): QueryParams =>
  queryString
    .slice(1)
    .split(hashSeperator)
    .reduce((acc, hash) => {
      const [name, value] = hash.split(valueSeperator);
      const values = value ? value.split(multiValueSeperator).map(decodeURIComponent) : [];
      if (Array.isArray(acc[name])) {
        acc[name] = [...acc[name], ...values];
      } else {
        acc[name] = values;
      }
      return acc;
    }, {} as QueryParams);
