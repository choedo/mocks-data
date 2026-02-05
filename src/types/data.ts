import type { Database } from '@/database.types';
import type {
  NumberOptions,
  DateOptions,
  EnumOptions,
  PrimaryOptions,
  ForeignOptions,
  BooleanOptions,
} from '@/types/columns';

export type ProfileEntity = Database['public']['Tables']['profile']['Row'];
export type ProjectEntity = Database['public']['Tables']['project']['Row'];
export type TableEntity = Database['public']['Tables']['table']['Row'];
export type ColumnEntity = Database['public']['Tables']['column']['Row'];

export type TableAndColumn = TableEntity & { columns: ColumnEntity[] };
export type ColumnTypes = 'pk' | 'fk' | 'date' | 'enum' | 'number' | 'boolean';
export type ColumnOptions =
  | NumberOptions
  | DateOptions
  | EnumOptions
  | ForeignOptions
  | PrimaryOptions
  | BooleanOptions;
