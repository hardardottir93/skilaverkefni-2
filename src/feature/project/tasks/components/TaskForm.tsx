import { Button } from '@/shared/components/ui/button';
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Input } from '@/shared/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { useGlobalContext } from '@/shared/context';
import { type FormEvent, useState } from 'react';
import type { Task } from '../model/task';

function TaskForm({
  onClose,
  taskToEdit,
}: {
  onClose: () => void;
  taskToEdit: Task | null;
}) {
  const { addTask, updateTask, activeProject } = useGlobalContext();
  const [taskTitle, setTaskTitle] = useState(taskToEdit?.title ?? '');
  const [taskDescription, setTaskDescription] = useState(
    taskToEdit?.description ?? '',
  );
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>(
    taskToEdit?.priority ?? 'low',
  );
  const [taskId, setTaskId] = useState(
    () => taskToEdit?.id ?? crypto.randomUUID(),
  );

  const isEditing = taskToEdit != null;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = taskTitle.trim();
    if (!title || !activeProject) {
      return;
    }

    if (taskToEdit) {
      updateTask(taskToEdit.id, {
        ...taskToEdit,
        title,
        description: taskDescription.trim(),
        priority: taskPriority,
      });
    } else {
      addTask(
        {
          id: taskId,
          title,
          description: taskDescription.trim(),
          completed: false,
          priority: taskPriority,
          projectId: activeProject.id,
        },
        activeProject.id,
      );
      setTaskTitle('');
      setTaskDescription('');
      setTaskPriority('low');
      setTaskId(crypto.randomUUID());
    }
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit task' : 'Add task'}</DialogTitle>
        <DialogDescription>
          {isEditing
            ? 'Update the task below.'
            : 'Create a new task for the current project.'}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="title" className="text-sm font-medium">
            Task title
          </label>
          <Input
            id="title"
            name="title"
            type="text"
            placeholder="e.g. Website redesign"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            autoComplete="off"
            autoFocus
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <Input
            id="description"
            name="description"
            type="text"
            placeholder="Short summary"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority
          </label>
          <Select
            value={taskPriority}
            onValueChange={(value) =>
              setTaskPriority(value as 'low' | 'medium' | 'high')
            }
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Select a priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <DialogFooter className="gap-2 sm:gap-0">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit" disabled={!activeProject}>
          {isEditing ? 'Save changes' : 'Add task'}
        </Button>
      </DialogFooter>
    </form>
  );
}

export default TaskForm;
