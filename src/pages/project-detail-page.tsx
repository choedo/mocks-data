import { Navigate, useParams } from 'react-router';
import ProjectDetailInformation from '@/components/project/project-detail-information';
import TableList from '@/components/table/table-list';

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = Number(params.projectId);

  if (!projectId) return <Navigate to={'/'} replace />;

  return (
    <div className={'p-4 flex flex-col gap-4'}>
      <ProjectDetailInformation projectId={projectId} />
      <TableList projectId={projectId} />
    </div>
  );
}
