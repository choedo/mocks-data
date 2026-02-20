import { describe, it, expect, vi, afterEach } from 'vitest';
import { mockGenerateValue } from '@/lib/mock-generator';
import { RandomUtils } from '@/lib/random-utils';
import type { BooleanOptions, EnumOptions } from '@/types/columns';
import type { ColumnEntity } from '@/types/data';

describe('mockGenerateValue', () => {
  afterEach(() => {
    vi.restoreAllMocks(); // 각 테스트 후 모킹 초기화
  });

  it('type이 enum일 때, RandomUtils.pick을 호출해야 한다', () => {
    const values = ['APPLE', 'BANANA'];
    const spy = vi.spyOn(RandomUtils, 'pick').mockReturnValue('APPLE');
    const col = {
      column_name: 'fruit',
      column_values: { type: 'enum', values: values },
    } as ColumnEntity & EnumOptions;

    const result = mockGenerateValue(col, 0);

    expect(spy).toHaveBeenCalledWith(values); // 파라미터 검증
    expect(result).toBe('APPLE');
  });

  it('type이 boolean이고 valueType이 number일 때, 0 또는 1을 반환해야 한다', () => {
    const col = {
      column_name: 'isActive',
      column_values: { type: 'boolean', valueType: 'number' },
    } as ColumnEntity & BooleanOptions;

    const result = mockGenerateValue(col, 0);
    expect([0, 1]).toContain(result);
  });

  it('type이 boolean이고 valueType이 boolean일 때, true 또는 false을 반환해야 한다', () => {
    const col = {
      column_name: 'isActive',
      column_values: { type: 'boolean', valueType: 'boolean' },
    } as ColumnEntity & BooleanOptions;

    const result = mockGenerateValue(col, 0);
    expect([true, false]).toContain(result);
  });
});
