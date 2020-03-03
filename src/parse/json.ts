export const json = (input: string): unknown => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return undefined;
  }
};
