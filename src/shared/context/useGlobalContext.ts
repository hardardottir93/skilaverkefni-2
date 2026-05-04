import { useContext } from 'react';
import { GlobalContext } from './globalContextTypes';

/**
 * Skilar global state (projects, tasks) og aðgerðum.
 * Bæði `dispatch` (useReducer) og mótað föll (t.d. `addTask`) eru í gildinu.
 */
export function useGlobalContext() {
  const ctx = useContext(GlobalContext);
  if (!ctx)
    throw new Error('useGlobalContext must be used within GlobalProvider');
  return ctx;
}

export type { GlobalContextValue } from './globalContextTypes';
