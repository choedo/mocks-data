import { Button, buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';
import { InboxIcon } from 'lucide-react';

type Actions = {
  title: string;
  action: () => void;
  variant?: VariantProps<typeof buttonVariants>;
};

type Props = {
  description?: string;
  actions?: Actions[];
};

export default function Empty(props: Props) {
  const { description = 'No Data', actions } = props;
  return (
    <div
      className={
        'border rounded-sm p-10 flex flex-col justify-center items-center gap-4'
      }
    >
      <InboxIcon className={'w-10 h-10'} />
      <p>{description}</p>
      {actions && actions.length
        ? actions.map((action, index) => (
            <Button
              key={`action-${action.title}-${index}`}
              onClick={action.action}
              className={'cursor-pointer'}
            >
              {action.title}
            </Button>
          ))
        : null}
    </div>
  );
}
