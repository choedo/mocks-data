import type { MOCK_DATA_ITEMS } from '@/data/mock';
import type { Database } from '@/database.types';
import type {
  NumberOptions,
  DateOptions,
  EnumOptions,
  PrimaryOptions,
  BooleanOptions,
} from '@/types/columns';

export type ProfileEntity = Database['public']['Tables']['profile']['Row'];
export type ProjectEntity = Database['public']['Tables']['project']['Row'];
export type TableEntity = Database['public']['Tables']['table']['Row'];
export type ColumnEntity = Database['public']['Tables']['column']['Row'] & {
  column_values: ColumnOptions;
  column_type: ColumnTypes;
};

export type MockDataType = (typeof MOCK_DATA_ITEMS)[number];

export type TableAndColumn = TableEntity & {
  columns: ColumnEntity[];
};
export type ColumnTypes = 'pk' | 'date' | 'enum' | 'number' | 'boolean';
export type ColumnOptions =
  | NumberOptions
  | DateOptions
  | EnumOptions
  | PrimaryOptions
  | BooleanOptions;
