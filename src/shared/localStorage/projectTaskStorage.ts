import {
  projectSchema,
  type Project,
} from '@/feature/project/list/model/project';
import { taskSchema, type Task } from '@/feature/project/tasks/model/task';
import { readJson, writeJson } from '@/shared/localStorage/jsonLocalStorage';
import { LOCAL_STORAGE_KEYS } from '@/shared/localStorage/keys';

function parseTasks(data: unknown): Task[] {
  const r = taskSchema.array().safeParse(data);
  return r.success ? r.data : [];
}

function parseProjects(data: unknown): Project[] {
  const r = projectSchema.array().safeParse(data);
  return r.success ? r.data : [];
}

export function getAllTasksRaw(): Task[] {
  return parseTasks(readJson(LOCAL_STORAGE_KEYS.tasks));
}

export function setAllTasks(tasks: Task[]): void {
  const r = taskSchema.array().safeParse(tasks);
  if (!r.success) {
    return;
  }
  writeJson(LOCAL_STORAGE_KEYS.tasks, r.data);
}

export function getAllProjectsRaw(): Project[] {
  return parseProjects(readJson(LOCAL_STORAGE_KEYS.projects));
}

export function setAllProjects(projects: Project[]): void {
  const r = projectSchema.array().safeParse(projects);
  if (!r.success) {
    return;
  }
  writeJson(LOCAL_STORAGE_KEYS.projects, r.data);
}

export function withSyncedTaskCounts(
  projects: Project[],
  tasks: Task[],
): Project[] {
  return projects.map((p) => ({
    ...p,
    tasksCount: tasks.filter((t) => t.projectId === p.id).length,
  }));
}
