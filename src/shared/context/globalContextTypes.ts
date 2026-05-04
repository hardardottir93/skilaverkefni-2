import { createContext, type Dispatch } from 'react';
import type { Project } from '@/feature/project/list/model/project';
import type { Task } from '@/feature/project/tasks/model/task';
import type { GlobalAction } from './globalReducer';

export type GlobalContextValue = {
  projects: Project[];
  tasks: Task[];
  activeProject: Project | null;
  dispatch: Dispatch<GlobalAction>;
  addTask: (task: Task, projectId: string) => void;
  removeTask: (taskId: string) => void;
  updateTask: (taskId: string, task: Task) => void;
  updateProjectTasksCount: (projectId: string, tasksCount: number) => void;
  removeProject: (projectId: string) => void;
  addProject: (project: Project) => void;
  setActiveProject: (project: Project) => void;
  clearActiveProject: () => void;
};

export const GlobalContext = createContext<GlobalContextValue | null>(null);
