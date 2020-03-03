export interface LineDecorator<T> {
  decorator?: (paymentLine: T) => null | undefined | number | string;
  header?: string;
}

export interface ReportConfig {
  separator?: string;
  showHeaders?: boolean;
}

const sanitiseFn = (separator: string): ((item?: null | number | string) => string) => {
  const special = new RegExp(`\r|\n|${separator}|"`);

  return item => {
    const output = typeof item === 'number' || typeof item === 'string' ? `${item}` : '';

    if (special.exec(output)) {
      return `"${output.replace(/"/g, `""`)}"`;
    }
    return output;
  };
};

const NEW_LINE = `\r\n`;

const dsv = <T>(
  paymentLines: T[],
  decorators: LineDecorator<T>[],
  { separator = ',', showHeaders = true }: ReportConfig = {
    separator: ',',
    showHeaders: true,
  },
): string => {
  // outputs http://tools.ietf.org/html/rfc4180
  const sanitise = sanitiseFn(separator);
  const content = [
    ...(showHeaders ? [decorators.map(({ header }) => (header ? sanitise(header) : '')).join(separator)] : []),
    ...paymentLines.map(
      paymentLine =>
        `${decorators.map(({ decorator }) => (decorator ? sanitise(decorator(paymentLine)) : '')).join(separator)}`,
    ),
  ];

  return `${content.join(NEW_LINE)}${content.length ? NEW_LINE : ''}`;
};

export const csv = <T>(paymentLines: T[], decorators: LineDecorator<T>[]): string =>
  dsv<T>(paymentLines, decorators, {
    separator: ',',
    showHeaders: true,
  });
