import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { readJson, writeJson } from '@/shared/localStorage/jsonLocalStorage';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const raw = readJson(key);
    if (raw === undefined) {
      return initialValue;
    }
    return raw as T;
  });

  useEffect(() => {
    writeJson(key, value);
  }, [key, value]);

  return [value, setValue];
}
