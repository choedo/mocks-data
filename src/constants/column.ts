import type { ColumnTypes } from '@/types/data';

type Values = { title: string; value: ColumnTypes };
type KeyValues = Record<ColumnTypes, Values>;

export const COLUMN_TYPES: KeyValues = {
  pk: {
    title: 'Primary Key',
    value: 'pk',
  },
  date: {
    title: 'Date',
    value: 'date',
  },
  enum: {
    title: 'Enum',
    value: 'enum',
  },
  number: {
    title: 'Number',
    value: 'number',
  },
  boolean: {
    title: 'Boolean',
    value: 'boolean',
  },
};

export const MINIMUM_DATE = '1926-01-01';
export const MAXIMUM_DATE = '2099-12-31';
