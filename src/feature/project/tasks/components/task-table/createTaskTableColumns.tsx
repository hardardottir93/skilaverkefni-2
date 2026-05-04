'use client';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import type { ColumnDef, SortingFn } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import type { Task } from '@/feature/project/tasks/model/task';

const PRIORITY_RANK: Record<Task['priority'], number> = {
  low: 2,
  medium: 1,
  high: 0,
};

const sortPriority: SortingFn<Task> = (rowA, rowB) => {
  return (
    PRIORITY_RANK[rowA.original.priority] -
    PRIORITY_RANK[rowB.original.priority]
  );
};

const priorityLabel: Record<Task['priority'], string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};

export function createTaskTableColumns(
  onDeleteTask: (taskId: string) => void,
  onToggleTaskCompleted: (taskId: string, completed: boolean) => void,
  onEditTask: (task: Task) => void,
): ColumnDef<Task>[] {
  return [
    {
      accessorKey: 'title',
      header: 'Title',
      enableSorting: false,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      enableSorting: false,
    },
    {
      accessorKey: 'priority',
      id: 'priority',
      header: ({ column }) => {
        return (
          <Button
            type="button"
            variant="ghost"
            className="-ml-2 h-8 data-[state=open]:bg-accent"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Priority
            {column.getIsSorted() === 'asc' ? (
              <ArrowUp className="size-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <ArrowDown className="size-4" />
            ) : (
              <ArrowUpDown className="size-4 opacity-60" />
            )}
          </Button>
        );
      },
      sortingFn: sortPriority,
      cell: ({ row }) => <span>{priorityLabel[row.original.priority]}</span>,
    },
    {
      accessorKey: 'completed',
      header: 'Completed',
      enableSorting: false,
      cell: ({ row }) => (
        <div className="text-center">
          <Checkbox
            checked={row.original.completed}
            onCheckedChange={() =>
              onToggleTaskCompleted(row.original.id, !row.original.completed)
            }
          />
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => <span className="sr-only">Actions</span>,
      enableSorting: false,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onEditTask(row.original)}
            aria-label="Edit task"
            title="Edit task"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => onDeleteTask(row.original.id)}
            className="text-destructive hover:text-destructive"
            aria-label="Delete task"
            title="Delete task"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ),
    },
  ];
}
