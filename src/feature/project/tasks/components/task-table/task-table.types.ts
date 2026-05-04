import type { Task } from '@/feature/project/tasks/model/task';

export type TaskTableProps = {
  projectId: string;
  onEditTask: (task: Task) => void;
};
