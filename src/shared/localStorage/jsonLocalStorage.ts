export function readJson(key: string): unknown {
  if (typeof localStorage === 'undefined') {
    return undefined;
  }
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) {
      return undefined;
    }
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}

export function writeJson(key: string, data: unknown): void {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore errors
  }
}
