import type { Task } from '@/feature/project/tasks/model/task';

export function filterTasksBySearchQuery(
  tasks: Task[],
  searchQuery: string,
): Task[] {
  const q = searchQuery.trim().toLowerCase();
  if (!q) {
    return tasks;
  }
  return tasks.filter((t) => {
    const matchTitle = t.title.toLowerCase().includes(q);
    const matchDescription = t.description.toLowerCase().includes(q);
    const matchPriority = t.priority.toLowerCase().includes(q);
    return matchTitle || matchDescription || matchPriority;
  });
}
