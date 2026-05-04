import { useCallback, useReducer, type ReactNode } from 'react';
import { getInitialStateFromLocalStorage } from './globalStatePersistence';
import type { Task } from '@/feature/project/tasks/model/task';
import { GlobalContext, type GlobalContextValue } from './globalContextTypes';
import { globalReducer, initialState } from './globalReducer';
import type { Project } from '@/feature/project/list/model/project';

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    globalReducer,
    initialState,
    getInitialStateFromLocalStorage,
  );
  const { projects, tasks, activeProject } = state;

  const addTask = useCallback((task: Task, projectId: string) => {
    dispatch({ type: 'ADD_TASK', payload: { task, projectId } });
  }, []);

  const removeTask = useCallback((taskId: string) => {
    dispatch({ type: 'REMOVE_TASK', payload: { taskId } });
  }, []);

  const updateTask = useCallback((taskId: string, task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: { taskId, task } });
  }, []);

  const updateProjectTasksCount = useCallback(
    (projectId: string, tasksCount: number) => {
      dispatch({
        type: 'UPDATE_PROJECT_TASKS_COUNT',
        payload: { projectId, tasksCount },
      });
    },
    [],
  );

  const removeProject = useCallback((projectId: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: { projectId } });
  }, []);

  const addProject = useCallback((project: Project) => {
    dispatch({ type: 'ADD_PROJECT', payload: { project } });
  }, []);

  const setActiveProject = useCallback((project: Project) => {
    dispatch({ type: 'SET_ACTIVE_PROJECT', payload: { project } });
  }, []);

  const clearActiveProject = useCallback(() => {
    dispatch({ type: 'CLEAR_ACTIVE_PROJECT' });
  }, []);

  const value: GlobalContextValue = {
    projects,
    tasks,
    activeProject,
    dispatch,
    addTask,
    removeTask,
    updateTask,
    updateProjectTasksCount,
    removeProject,
    addProject,
    setActiveProject,
    clearActiveProject,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}
