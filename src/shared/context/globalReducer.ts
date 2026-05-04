import type { Project } from '@/feature/project/list/model/project';
import type { Task } from '@/feature/project/tasks/model/task';
import type { Reducer } from 'react';

function syncActiveProject(
  current: Project | null,
  projects: Project[],
): Project | null {
  if (current == null) {
    return null;
  }
  return projects.find((p) => p.id === current.id) ?? null;
}

/**
 * Eitt global state. Vistað í `localStorage` gegnum `DataPersist` + `globalStatePersistence`
 * (Zod: `projectTaskStorage` + `LOCAL_STORAGE_KEYS` í gegnum `globalStatePersistence`).
 */
export type GlobalState = {
  projects: Project[];
  tasks: Task[];
  activeProject: Project | null;
};

export type GlobalAction =
  | { type: 'ADD_PROJECT'; payload: { project: Project } }
  | { type: 'ADD_TASK'; payload: { task: Task; projectId: string } }
  | { type: 'REMOVE_TASK'; payload: { taskId: string } }
  | { type: 'UPDATE_TASK'; payload: { taskId: string; task: Task } }
  | {
      type: 'UPDATE_PROJECT_TASKS_COUNT';
      payload: { projectId: string; tasksCount: number };
    }
  | { type: 'REMOVE_PROJECT'; payload: { projectId: string } }
  | { type: 'SET_ACTIVE_PROJECT'; payload: { project: Project } }
  | { type: 'CLEAR_ACTIVE_PROJECT' };

export const initialState: GlobalState = {
  projects: [],
  tasks: [],
  activeProject: null,
};

export const globalReducer: Reducer<GlobalState, GlobalAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { task, projectId } = action.payload;
      const projects = state.projects.map((p) =>
        p.id === projectId ? { ...p, tasksCount: p.tasksCount + 1 } : p,
      );
      return {
        ...state,
        tasks: [...state.tasks, { ...task, projectId }],
        projects,
        activeProject: syncActiveProject(state.activeProject, projects),
      };
    }
    case 'REMOVE_TASK': {
      const removed = state.tasks.find((t) => t.id === action.payload.taskId);
      const projectId = removed?.projectId;
      const projects =
        projectId !== undefined
          ? state.projects.map((p) =>
              p.id === projectId
                ? { ...p, tasksCount: Math.max(0, p.tasksCount - 1) }
                : p,
            )
          : state.projects;
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.payload.taskId),
        projects,
        activeProject: syncActiveProject(state.activeProject, projects),
      };
    }
    case 'UPDATE_TASK': {
      const { taskId, task } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === taskId ? task : t)),
      };
    }
    case 'UPDATE_PROJECT_TASKS_COUNT': {
      const { projectId, tasksCount } = action.payload;
      const projects = state.projects
        .map((p) => (p.id === projectId ? { ...p, tasksCount } : p))
        .filter((p) => p.tasksCount > 0);
      return {
        ...state,
        projects,
        activeProject: syncActiveProject(state.activeProject, projects),
      };
    }
    case 'ADD_PROJECT': {
      const { project } = action.payload;
      const projects = [...state.projects, project];
      return {
        ...state,
        projects,
        activeProject: syncActiveProject(state.activeProject, projects),
      };
    }
    case 'REMOVE_PROJECT': {
      const projects = state.projects.filter(
        (p) => p.id !== action.payload.projectId,
      );
      return {
        ...state,
        projects,
        activeProject: syncActiveProject(state.activeProject, projects),
      };
    }
    case 'SET_ACTIVE_PROJECT': {
      return {
        ...state,
        activeProject: action.payload.project,
      };
    }
    case 'CLEAR_ACTIVE_PROJECT': {
      return {
        ...state,
        activeProject: null,
      };
    }
    default:
      return state;
  }
};
