import type { GlobalState } from './globalReducer';
import { initialState } from './globalReducer';
import {
  getAllProjectsRaw,
  getAllTasksRaw,
  setAllProjects,
  setAllTasks,
  withSyncedTaskCounts,
} from '@/shared/localStorage/projectTaskStorage';

/**
 * Forritsstaða ↔ `localStorage` (Zod, lyklar, talningar) — án React.
 * Hooks kalla hér, ekki gagnlagið beint, nema við sérstöð þarf.
 */
export function getInitialStateFromLocalStorage(
  initial: GlobalState,
): GlobalState {
  try {
    return readPersistedGlobalState();
  } catch {
    return initial;
  }
}

export function readPersistedGlobalState(): GlobalState {
  if (typeof localStorage === 'undefined') {
    return initialState;
  }
  const tasks = getAllTasksRaw();
  const projects = withSyncedTaskCounts(getAllProjectsRaw(), tasks);
  if (projects.length === 0 && tasks.length === 0) {
    return initialState;
  }
  return { ...initialState, projects, tasks };
}

export function writePersistedGlobalState(state: GlobalState): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  setAllTasks(state.tasks);
  setAllProjects(withSyncedTaskCounts(state.projects, state.tasks));
}
