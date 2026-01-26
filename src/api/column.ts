import supabase from '@/lib/supabase';
import type { ColumnEntity } from '@/types/data';

export async function createColumn(
  column: Pick<
    ColumnEntity,
    'column_name' | 'column_type' | 'column_values' | 'table_id'
  > & { column_description?: string },
) {
  const { data, error } = await supabase
    .from('column')
    .insert(column)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateColumn(
  column: Partial<ColumnEntity> & { column_id: number },
) {
  const updateDate = new Date();

  const { data, error } = await supabase
    .from('column')
    .update({
      ...column,
      updated_at: updateDate,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteColumn(columnId: number) {
  const { data, error } = await supabase
    .from('column')
    .delete()
    .eq('column_id', columnId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
