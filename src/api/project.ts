import supabase from '@/lib/supabase';
import type { ProjectEntity } from '@/types/data';

export async function fetchProjects(userId: string) {
  const { data, error } = await supabase
    .from('project')
    .select('*')
    .eq('author_id', userId);

  if (error) throw error;
  return data;
}

export async function createProject({
  project_name,
  project_description,
}: {
  project_name: string;
  project_description?: string;
}) {
  const { data, error } = await supabase
    .from('project')
    .insert({
      project_name,
      project_description,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(
  project: Partial<
    Pick<ProjectEntity, 'project_name' | 'project_description' | 'is_bookmark'>
  > & { project_id: number }
) {
  const updateDate = new Date();

  const { data, error } = await supabase
    .from('project')
    .update({
      ...project,
      updated_at: updateDate,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: number) {
  const { data, error } = await supabase
    .from('project')
    .delete()
    .eq('project_id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function duplicateCheckProjectName({
  userId,
  project_name,
}: {
  userId: string;
  project_name: string;
}): Promise<boolean> {
  const { data, error } = await supabase
    .from('project')
    .select('*')
    .eq('author_id', userId)
    .eq('project_name', project_name);

  if (error) throw error;

  if (data.length > 0) return false;
  else return true;
}
