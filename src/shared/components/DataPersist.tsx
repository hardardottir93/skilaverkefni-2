import { type ReactNode } from 'react';
import { useGlobalStatePersistence } from '@/shared/hook/useGlobalStatePersistence';
import { useGlobalContext } from '@/shared/context/useGlobalContext';

type DataPersistProps = { children: ReactNode };

/**
 * Vinnur með forritsþjóninum `globalStatePersistence` (ekki geymsluleið
 * gagnlagi beint) til að vista stöðu eftir hverja rækjustöðu.
 */
export function DataPersist({ children }: DataPersistProps) {
  const { projects, tasks, activeProject } = useGlobalContext();
  useGlobalStatePersistence({ projects, tasks, activeProject });
  return <>{children}</>;
}
