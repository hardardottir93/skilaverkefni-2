'use no memo';

import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import { useGlobalContext } from '@/shared/context';
import { useMemo, useState } from 'react';
import type { Task } from '@/feature/project/tasks/model/task';
import { createTaskTableColumns } from './createTaskTableColumns';
import { filterTasksBySearchQuery } from './filterTasksBySearchQuery';

export function useTaskTable(
  projectId: string,
  onEditTask: (task: Task) => void,
) {
  const { tasks, removeTask, updateTask } = useGlobalContext();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const projectTasks = useMemo(
    () => tasks.filter((t) => t.projectId === projectId),
    [tasks, projectId],
  );

  const filteredTasks = useMemo(
    () => filterTasksBySearchQuery(projectTasks, searchQuery),
    [projectTasks, searchQuery],
  );

  const columns = useMemo(
    () =>
      createTaskTableColumns(
        (taskId) => removeTask(taskId),
        (taskId, completed) =>
          updateTask(taskId, {
            ...tasks.find((t) => t.id === taskId)!,
            completed,
          }),
        onEditTask,
      ),
    [removeTask, updateTask, onEditTask, tasks],
  );

  // eslint-disable-next-line react-hooks/incompatible-library -- TanStack Table + React Compiler
  const table = useReactTable({
    data: filteredTasks,
    columns: columns as ColumnDef<Task>[],
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return {
    table,
    columns,
    searchQuery,
    setSearchQuery,
  };
}
