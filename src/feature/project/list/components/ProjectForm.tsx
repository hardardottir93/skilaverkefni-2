import { Button } from '@/shared/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import { useGlobalContext } from '@/shared/context';
import { type FormEvent, useId, useState } from 'react';

function ProjectForm({ onClose }: { onClose: () => void }) {
  const { addProject } = useGlobalContext();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const nameId = useId();
  const descriptionId = useId();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = projectName.trim();
    if (!name) return;

    addProject({
      id: crypto.randomUUID(),
      name,
      description: projectDescription.trim(),
      tasksCount: 0,
    });
    setProjectName('');
    setProjectDescription('');
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>Add project</DialogTitle>
        <DialogDescription>
          Create a new project. You can add tasks after it is created.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={nameId} className="text-sm font-medium">
            Project name
          </label>
          <Input
            id={nameId}
            name="name"
            type="text"
            placeholder="e.g. Website redesign"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={descriptionId} className="text-sm font-medium">
            Description
          </label>
          <Input
            id={descriptionId}
            name="description"
            type="text"
            placeholder="Short summary"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Add project</Button>
      </DialogFooter>
    </form>
  );
}

export default ProjectForm;
