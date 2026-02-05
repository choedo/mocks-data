import type { ColumnTypes } from '@/types/data';

type Values = { title: string; value: ColumnTypes };
type KeyValues = Record<ColumnTypes, Values>;

export const COLUMN_TYPES: KeyValues = {
  pk: {
    title: 'Primary Key',
    value: 'pk',
  },
  fk: {
    title: 'Foreign Key',
    value: 'fk',
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
