'use client';

import { TaskDataTable } from './TaskDataTable';
import { TaskTableSearch } from './TaskTableSearch';
import { useTaskTable } from './useTaskTable';
import type { TaskTableProps } from './task-table.types';

export function TaskTable({ projectId, onEditTask }: TaskTableProps) {
  const { table, columns, searchQuery, setSearchQuery } = useTaskTable(
    projectId,
    onEditTask,
  );

  return (
    <div className="space-y-3">
      <TaskTableSearch value={searchQuery} onChange={setSearchQuery} />
      <TaskDataTable table={table} columnCount={columns.length} />
    </div>
  );
}
