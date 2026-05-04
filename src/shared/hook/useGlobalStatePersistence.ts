import { useEffect } from 'react';
import { writePersistedGlobalState } from '@/shared/context/globalStatePersistence';
import type { GlobalState } from '@/shared/context/globalReducer';

export function useGlobalStatePersistence(state: GlobalState): void {
  const { projects, tasks, activeProject } = state;
  useEffect(() => {
    writePersistedGlobalState({
      projects,
      tasks,
      activeProject,
    });
  }, [projects, tasks, activeProject]);
}
