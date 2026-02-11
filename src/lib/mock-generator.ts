import { BOOLEAN_DATA } from '@/data/boolean';
import { RandomUtils } from '@/lib/random-utils';
import type { ColumnEntity } from '@/types/data';
import type { Dayjs } from 'dayjs';

export type MockGenerateValueResult = string | Dayjs | number | boolean;
type MockGenerateValue = (
  col: ColumnEntity,
  index: number,
) => MockGenerateValueResult;

export const mockGenerateValue: MockGenerateValue = (col, index) => {
  const { column_name, column_values } = col;
  const options = column_values;

  switch (options.type) {
    case 'pk': {
      if (options.valueType === 'uuid') {
        return RandomUtils.getUUID() as string;
      }
      return options.min + index;
    }
    case 'date': {
      return RandomUtils.getDate(options);
    }
    case 'enum': {
      const values = options.values;
      if (values.length === 0) return '';

      return RandomUtils.pick(values);
    }
    case 'number': {
      return RandomUtils.getInt(options.min, options.max);
    }
    case 'boolean': {
      const random = Math.floor(Math.random());

      if (options.valueType === 'number') return random;

      return BOOLEAN_DATA[random];
    }
    default:
      return `${column_name}_${index}`;
  }
};
