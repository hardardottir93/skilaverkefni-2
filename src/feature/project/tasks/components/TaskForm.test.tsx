import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TaskForm from "./TaskForm";
import { Dialog } from "@/shared/components/ui/dialog";

const mockUseGlobalContext = vi.fn();

vi.mock("@/shared/context", () => ({
  useGlobalContext: () => mockUseGlobalContext(),
}));

describe("TaskForm", () => {
  const activeProject = {
    id: "1",
    name: "Test Project",
    description: "",
    tasksCount: 0,
  };

  const addTaskMock = vi.fn();
  const updateTaskMock = vi.fn();
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGlobalContext.mockReturnValue({
      activeProject,
      addTask: addTaskMock,
      updateTask: updateTaskMock,
      onClose: onCloseMock,
    });
  });

  it("renderst add task form by default", () => {
    render(
      <Dialog open>
        <TaskForm taskToEdit={null} onClose={onCloseMock} />
      </Dialog>,
    );

    expect(
      screen.getByRole("heading", { name: /add task/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add task/i }),
    ).toBeInTheDocument();
  });

  it("adds a new task when form is submitted", async () => {
    const user = userEvent.setup();

    render(
      <Dialog open>
        <TaskForm taskToEdit={null} onClose={onCloseMock} />
      </Dialog>,
    );
    <TaskForm onClose={onCloseMock} taskToEdit={null} />;

    await user.type(screen.getByLabelText(/task title/i), "Write tests");
    await user.type(
      screen.getByLabelText(/description/i),
      "Write tests for TaskForm component",
    );

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(addTaskMock).toHaveBeenCalledOnce();

    expect(addTaskMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Write tests",
        description: "Write tests for TaskForm component",
        completed: false,
        priority: "low",
        projectId: activeProject.id,
      }),
      activeProject.id,
    );

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it("does not add task if title is empty", async () => {
    const user = userEvent.setup();

    render(
      <Dialog open>
        <TaskForm taskToEdit={null} onClose={onCloseMock} />
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(addTaskMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it(" renders edit task form with existing values", () => {
    render(
      <Dialog open>
        <TaskForm
          onClose={onCloseMock}
          taskToEdit={{
            id: "task-1",
            title: "Existing Task",
            description: "Existing description",
            completed: false,
            priority: "medium",
            projectId: activeProject.id,
          }}
        />
      </Dialog>,
    );

    expect(
      screen.getByRole("heading", { name: /edit task/i }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/task title/i)).toHaveValue("Existing Task");
    expect(screen.getByLabelText(/description/i)).toHaveValue(
      "Existing description",
    );
    expect(
      screen.getByRole("combobox", { name: /priority/i }),
    ).toHaveTextContent("Medium");

    expect(
      screen.getByRole("button", { name: /save changes/i }),
    ).toBeInTheDocument();
  });

  it("updates task when form is submitted in edit mode", async () => {
    const user = userEvent.setup();
    render(
      <Dialog open>
        <TaskForm
          onClose={onCloseMock}
          taskToEdit={{
            id: "task-1",
            title: "Existing Task",
            description: "Existing description",
            completed: false,
            priority: "medium",
            projectId: activeProject.id,
          }}
        />
      </Dialog>,
    );

    const titleInput = screen.getByLabelText(/task title/i);

    await user.clear(titleInput);
    await user.type(titleInput, "Updated Task Title");

    await user.click(screen.getByRole("button", { name: /save changes/i }));

    expect(updateTaskMock).toHaveBeenCalledOnce();

    expect(updateTaskMock).toHaveBeenCalledWith(
      "task-1",
      expect.objectContaining({
        title: "Updated Task Title",
        description: "Existing description",
        completed: false,
        priority: "medium",
        projectId: activeProject.id,
      }),
    );
    expect(onCloseMock).toHaveBeenCalledOnce();
  });
});
