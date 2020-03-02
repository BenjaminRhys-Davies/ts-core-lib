export interface Field {
  name: string;
  value: null | string | Blob;
}

export const data = (fields: Field[] = []): FormData => {
  const body = new FormData();

  fields.forEach(({ name, value }) => {
    if (name && value !== null) {
      body.append(name, value);
    }
  });

  return body;
};
