import type { Database } from '@/database.types';

export type ProfileEntity = Database['public']['Tables']['profile']['Row'];
export type ProjectEntity = Database['public']['Tables']['project']['Row'];
export type TableEntity = Database['public']['Tables']['table']['Row'];
export type ColumnEntity = Database['public']['Tables']['column']['Row'];
