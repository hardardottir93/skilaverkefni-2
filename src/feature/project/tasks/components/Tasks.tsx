import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/shared/components/ui/card';
import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { useGlobalContext } from '@/shared/context';
import { useState } from 'react';
import type { Task } from '../model/task';
import TaskForm from './TaskForm';
import AddTask from './AddTask';
import { TaskTable } from './task-table/TaskTable';

function Tasks() {
  const { activeProject } = useGlobalContext();
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  function handleTaskDialogOpenChange(open: boolean) {
    setTaskFormOpen(open);
    if (!open) {
      setEditingTask(null);
    }
  }

  return (
    <Dialog open={taskFormOpen} onOpenChange={handleTaskDialogOpenChange}>
      <Card>
        <CardHeader>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2">
              <CardTitle>{activeProject?.name}</CardTitle>
              <CardDescription>{activeProject?.description}</CardDescription>
            </div>
            <AddTask
              onOpen={() => {
                setEditingTask(null);
                setTaskFormOpen(true);
              }}
            />
          </div>
        </CardHeader>
        <CardContent>
          {activeProject ? (
            <TaskTable
              projectId={activeProject.id}
              onEditTask={() => {
                setTaskFormOpen(true);
              }}
            />
          ) : (
            <p>No project selected</p>
          )}
        </CardContent>
      </Card>
      <DialogContent className="gap-0 sm:max-w-md">
        <TaskForm
          key={editingTask?.id ?? 'add-task'}
          taskToEdit={editingTask}
          onClose={() => handleTaskDialogOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

export default Tasks;
