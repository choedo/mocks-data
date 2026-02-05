import supabase from '@/lib/supabase';
import type { ColumnEntity, ColumnOptions } from '@/types/data';

export async function createColumn(
  column: Pick<ColumnEntity, 'column_name' | 'column_type' | 'table_id'> & {
    column_values: ColumnOptions;
  },
) {
  const { data, error } = await supabase
    .from('column')
    .insert(column)
    .select('*, table_info: table!table_id (project_id)')
    .single();

  if (error) throw error;

  const { table_info, ...rest } = data;
  return {
    ...rest,
    project_id: table_info.project_id,
  };
}

export async function duplicateCheckPrimaryColumn(
  tableId: number,
): Promise<boolean> {
  const { data, error } = await supabase
    .from('column')
    .select('*')
    .eq('table_id', tableId)
    .eq('column_type', 'pk');

  if (error) throw error;

  if (data.length > 0) return false;
  else return true;
}

export async function duplicateCheckColumnName({
  tableId,
  title,
}: {
  tableId: number;
  title: string;
}): Promise<boolean> {
  const { data, error } = await supabase
    .from('column')
    .select('*')
    .eq('table_id', tableId)
    .eq('column_name', title);

  if (error) throw error;

  if (data.length > 0) return false;
  else return true;
}

export async function updateColumn(
  column: Partial<Omit<ColumnEntity, 'column_values'>> & {
    column_id: number;
    column_values: ColumnOptions;
  },
) {
  const updateDate = new Date();

  const { data, error } = await supabase
    .from('column')
    .update({
      ...column,
      updated_at: updateDate,
    })
    .eq('column_id', column.column_id)
    .select('*, table_info: table!table_id (project_id)')
    .single();

  if (error) throw error;

  const { table_info, ...rest } = data;
  return {
    ...rest,
    project_id: table_info.project_id,
  };
}

export async function deleteColumn(columnId: number) {
  const { data, error } = await supabase
    .from('column')
    .delete()
    .eq('column_id', columnId)
    .select('*, table_info: table!table_id (project_id)')
    .single();

  if (error) throw error;

  const { table_info, ...rest } = data;
  return {
    ...rest,
    project_id: table_info.project_id,
  };
}
