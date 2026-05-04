import { Button } from '@/shared/components/ui/button';
import { useGlobalContext } from '@/shared/context';
import { PlusIcon } from 'lucide-react';

function AddTask({ onOpen }: { onOpen: () => void }) {
  const { activeProject } = useGlobalContext();
  return (
    <Button
      variant="ghost"
      className="h-9 w-fit gap-1.5 px-2"
      disabled={!activeProject}
      type="button"
      onClick={onOpen}
    >
      <PlusIcon className="size-4" />
      <span className="text-sm">Add task</span>
    </Button>
  );
}

export default AddTask;
