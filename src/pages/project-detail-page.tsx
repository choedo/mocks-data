import React from 'react';
import LoadingSpinner from '@/components/loading-spinner';

import { useTableData } from '@/hooks/table/use-table-data';
import { Navigate, useParams } from 'react-router';
import ProjectDetailInformation from '@/components/project/project-detail-information';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = Number(params.projectId);

  const { data: tableData, isLoading: isTableDataLoading } =
    useTableData(projectId);

  if (!projectId) return <Navigate to={'/'} replace />;

  const isLoading = isTableDataLoading;

  return (
    <div className={'p-4'}>
      {isLoading && <LoadingSpinner />}
      <ProjectDetailInformation projectId={projectId} />
    </div>
  );
}
