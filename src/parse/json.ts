export const json = (input: string): undefined | null | boolean | number | string | object => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return undefined;
  }
};
