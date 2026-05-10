import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import AddTask from "./AddTask";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context";

const activeProject = {
  id: "1",
  name: "Website redesign",
  description: "Update the marketing website",
  tasksCount: 2,
};

function createContextValue(
  activeProjectValue: GlobalContextValue["activeProject"],
): GlobalContextValue {
  return {
    projects: activeProjectValue ? [activeProjectValue] : [],
    tasks: [],
    activeProject: activeProjectValue,
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
  title: "Project/Tasks/AddTask",
  component: AddTask,
  args: {
    onOpen: fn(),
  },
} satisfies Meta<typeof AddTask>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Enabled: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={createContextValue(activeProject)}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};

export const DisabledNoActiveProject: Story = {
  decorators: [
    (Story) => (
      <GlobalContext.Provider value={createContextValue(null)}>
        <Story />
      </GlobalContext.Provider>
    ),
  ],
};
