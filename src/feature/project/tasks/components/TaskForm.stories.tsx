import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Dialog } from "@/shared/components/ui/dialog";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context";
import TaskForm from "./TaskForm";

const activeProject = {
  id: "1",
  name: "Website redesign",
  description: "Update the marketing website",
  tasksCount: 2,
};

function createContextValue(): GlobalContextValue {
  return {
    projects: [activeProject],
    tasks: [],
    activeProject,
    dispatch: fn(),
    addTask: fn(),
    removeTask: fn(),
    updateTask: fn(),
    updateProjectTasksCount: fn(),
    removeProject: fn(),
    addProject: fn(),
    setActiveProject: fn(),
    clearActiveProject: fn(),
  };
}

const meta = {
  title: "Project/Tasks/TaskForm",
  component: TaskForm,
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={createContextValue()}>
        <Dialog open>
          <Story />
        </Dialog>
      </GlobalContext.Provider>
    ),
  ],
  args: {
    onClose: fn(),
  },
} satisfies Meta<typeof TaskForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AddTask: Story = {
  args: {
    taskToEdit: null,
  },
};

export const EditTask: Story = {
  args: {
    taskToEdit: {
      id: "task-1",
      projectId: "1",
      title: "Write Vitest tests",
      description: "Test the task form component",
      completed: false,
      priority: "medium",
    },
  },
};
