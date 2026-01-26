import supabase from '@/lib/supabase';
import type { TableAndColumn } from '@/types/data';

export async function fetchTables(projectId: number) {
  const { data, error } = await supabase
    .from('table')
    .select('*, columns: column!table_id (*)')
    .eq('project_id', projectId);

  if (error) throw error;
  return data as TableAndColumn[];
}

export async function createTable({
  table_name,
  project_id,
}: {
  table_name: string;
  project_id: number;
}) {
  const { data, error } = await supabase
    .from('table')
    .insert({ table_name, project_id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTable({
  table_name,
  table_id,
}: {
  table_name: string;
  table_id: number;
}) {
  const updateDate = new Date();

  const { data, error } = await supabase
    .from('table')
    .update({ table_name, updated_at: updateDate })
    .eq('table_id', table_id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTable(tableId: number) {
  const { data, error } = await supabase
    .from('table')
    .delete()
    .eq('table_id', tableId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
