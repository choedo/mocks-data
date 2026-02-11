import type { ColumnTypes } from '@/types/data';

// 1. 숫자형 (Number) 옵션
export interface NumberOptions {
  type: Extract<ColumnTypes, 'number'>;
  min?: number;
  max?: number;
  precision?: number; // 소수점 자릿수
}

// 2. 날짜형 (Date) 옵션
export interface DateOptions {
  type: Extract<ColumnTypes, 'date'>;
  valueType: 'unix' | 'date';
  startDate?: Date;
  endDate?: Date;
  format?: string;
}

// 3. 열거형 (Enum) 옵션
export interface EnumOptions {
  type: Extract<ColumnTypes, 'enum'>;
  values: string[];
}

// 4. PK (Primary Key) 옵션
export type PrimaryUUIDOptions = {
  valueType: 'uuid';
};
export type PrimaryNumberOptions = {
  valueType: 'number';
  min: number;
};
export type PrimaryOptions = { type: Extract<ColumnTypes, 'pk'> } & (
  | PrimaryUUIDOptions
  | PrimaryNumberOptions
);

// 5. Boolean 옵션
export interface BooleanOptions {
  type: Extract<ColumnTypes, 'boolean'>;
  valueType: 'boolean' | 'number';
}
