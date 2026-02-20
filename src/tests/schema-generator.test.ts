import { describe, it, expect } from 'vitest';
import { SchemaGenerator } from '@/lib/generator';
import type { ColumnEntity } from '@/types/data';

describe('SchemaGenerator', () => {
  const mockColumns = [
    {
      column_name: 'id',
      column_values: { type: 'pk', valueType: 'number', min: 1 },
    },
    { column_name: 'age', column_values: { type: 'number', min: 20, max: 30 } },
    { column_name: 'email', column_values: { type: 'email' } },
    {
      column_name: 'address',
      column_values: {
        type: 'address',
        valueType: 'mainStreetAddress',
        language: 'ko',
      },
    },
    {
      column_name: 'address_detail',
      column_values: {
        type: 'address',
        valueType: 'detailAddress',
        language: 'ko',
      },
    },
    {
      column_name: 'phone',
      column_values: { type: 'contact', valueType: 'mobile', format: '.' },
    },
    {
      column_name: 'name',
      column_values: { type: 'name', valueType: 'fullName', language: 'ko' },
    },
    {
      column_name: 'is_active',
      column_values: { type: 'boolean', valueType: 'boolean' },
    },
    {
      column_name: 'created_at',
      column_values: { type: 'date', valueType: 'date' },
    },
  ] as ColumnEntity[];

  const amount = 10;

  it('toJSON: 올바른 구조의 JSON 문자열을 생성해야 한다', () => {
    const resultStr = SchemaGenerator.toJSON('users', mockColumns, amount);
    const parsed = JSON.parse(resultStr);

    expect(parsed.table).toBe('users');
    expect(parsed.data).toHaveLength(amount);

    // 첫 번째 데이터 구조 검증
    expect(parsed.data[0]).toHaveProperty('id');
    expect(parsed.data[0]).toHaveProperty('age');
    expect(parsed.data[0]).toHaveProperty('email');
    expect(parsed.data[0]).toHaveProperty('address');
    expect(parsed.data[0]).toHaveProperty('address_detail');
    expect(parsed.data[0]).toHaveProperty('phone');
    expect(parsed.data[0]).toHaveProperty('name');
    expect(parsed.data[0]).toHaveProperty('is_active');
    expect(parsed.data[0]).toHaveProperty('created_at');
  });

  it('toSQL: INSERT INTO 구문과 데이터가 포함된 SQL을 생성해야 한다', () => {
    const sql = SchemaGenerator.toSQL('users', mockColumns, 10);

    expect(sql).toContain(
      'INSERT INTO "users" ("id", "age", "email", "address", "address_detail", "phone", "name", "is_active", "created_at")',
    );
    expect(sql).toContain('VALUES');

    const values = sql.split('VALUES')[1];
    expect(values.split('\n')).toHaveLength(amount + 1);
  });

  it('10,000개의 JSON 데이터를 1초 이내에 생성해야 한다', () => {
    const start = performance.now();
    SchemaGenerator.toJSON('users', mockColumns, 10000);
    const end = performance.now();

    const executionTime = end - start;
    expect(executionTime).toBeLessThan(1000);
  });

  it('10,000개의 SQL 데이터를 1초 이내에 생성해야 한다', () => {
    const start = performance.now();
    SchemaGenerator.toSQL('users', mockColumns, 10000);
    const end = performance.now();

    const executionTime = end - start;
    expect(executionTime).toBeLessThan(1000);
  });
});
