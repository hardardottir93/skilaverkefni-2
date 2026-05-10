import type { Project } from "@/feature/project/list/model/project";
import type { Task } from "@/feature/project/tasks/model/task";
import { beforeEach, describe, expect, it } from "vitest";
import { LOCAL_STORAGE_KEYS } from "./keys";
import {
  getAllProjectsRaw,
  getAllTasksRaw,
  setAllProjects,
  setAllTasks,
  withSyncedTaskCounts,
} from "./projectTaskStorage";

describe("projectTaskStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns empty arrays when localStorage is empty", () => {
    expect(getAllProjectsRaw()).toEqual([]);
    expect(getAllTasksRaw()).toEqual([]);
  });

  it("saves and loads valid projects", () => {
    const projects: Project[] = [
      {
        id: "1",
        name: "Test Project",
        description: "Project description",
        tasksCount: 0,
      },
    ];

    setAllProjects(projects);

    expect(getAllProjectsRaw()).toEqual(projects);
  });

  it("saves and loads valid tasks", () => {
    const tasks: Task[] = [
      {
        id: "1",
        projectId: "1",
        title: "Write tests",
        description: "Write Vitest tests",
        completed: false,
        priority: "medium",
      },
    ];

    setAllTasks(tasks);

    expect(getAllTasksRaw()).toEqual(tasks);
  });

  it("returns empty array when stored project data is invalid", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.projects,
      JSON.stringify([{ id: 123, name: null }]),
    );

    expect(getAllProjectsRaw()).toEqual([]);
  });

  it("returns empty array when stored task data is invalid", () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.tasks,
      JSON.stringify([{ id: 123, title: null }]),
    );

    expect(getAllTasksRaw()).toEqual([]);
  });

  it("does not save invalid projects", () => {
    const invalidProjects = [
      {
        id: 123,
        name: null,
      },
    ];

    setAllProjects(invalidProjects as never);

    expect(getAllProjectsRaw()).toEqual([]);
  });

  it("does not save invalid tasks", () => {
    const invalidTasks = [
      {
        id: 123,
        title: null,
      },
    ];

    setAllTasks(invalidTasks as never);

    expect(getAllTasksRaw()).toEqual([]);
  });

  it("syncs task counts for each project", () => {
    const projects: Project[] = [
      {
        id: "1",
        name: "Website",
        description: "Build website",
        tasksCount: 0,
      },
      {
        id: "2",
        name: "App",
        description: "Build app",
        tasksCount: 0,
      },
    ];

    const tasks: Task[] = [
      {
        id: "1",
        projectId: "1",
        title: "Create layout",
        description: "",
        completed: false,
        priority: "medium",
      },
      {
        id: "2",
        projectId: "1",
        title: "Add styling",
        description: "",
        completed: true,
        priority: "high",
      },
      {
        id: "3",
        projectId: "2",
        title: "Set up routing",
        description: "",
        completed: false,
        priority: "low",
      },
    ];

    expect(withSyncedTaskCounts(projects, tasks)).toEqual([
      {
        id: "1",
        name: "Website",
        description: "Build website",
        tasksCount: 2,
      },
      {
        id: "2",
        name: "App",
        description: "Build app",
        tasksCount: 1,
      },
    ]);
  });
});
