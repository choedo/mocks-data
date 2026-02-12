import { Button } from '@/components/ui/button';

import { useOpenProjectEditorModal } from '@/store/project-editor-modal';
import { PlusCircleIcon } from 'lucide-react';

export default function ProjectAddButton() {
  const open = useOpenProjectEditorModal();

  return (
    <Button
      variant={'outline'}
      onClick={open}
      className={
        'w-full h-32 text-xl flex items-center justify-center cursor-pointer font-bold rounded-lg'
      }
    >
      <PlusCircleIcon strokeWidth={3} width={24} height={24} />
      <p>Add Project</p>
    </Button>
  );
}
