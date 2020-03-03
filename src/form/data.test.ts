// Under test
import { data } from './data';

describe('data ()', () => {
  describe('should handle', () => {
    describe('invalid', () => {
      const emptyFormData = new FormData();
      [
        { args: { name: '', value: '45645645' }, name: 'empty name' },
        { args: { name: 'sfgfgdf', value: null }, name: 'null value' },
        { args: { name: '', value: null }, name: 'empty name & null value' },
      ].forEach(({ args, name }) => {
        it(name, () => {
          expect(data([args])).toEqual(emptyFormData);
        });
      });
    });
    describe('valid', () => {
      [
        { args: { name: 'dfgdfgd', value: '' }, name: 'empty value' },
        { args: { name: 'sfgfgdf', value: 'fgdfgdd' }, name: 'valid value' },
      ].forEach(({ args, name }) => {
        it(name, () => {
          expect(data([args]).get(args.name)).toEqual(args.value);
        });
      });
    });
  });
});
