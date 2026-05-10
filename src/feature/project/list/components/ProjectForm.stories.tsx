import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Dialog } from "@/shared/components/ui/dialog";
import { GlobalContext } from "@/shared/context/globalContextTypes";
import type { GlobalContextValue } from "@/shared/context";
import ProjectForm from "./ProjectForm";

function createContextValue(): GlobalContextValue {
  return {
    projects: [],
    tasks: [],
    activeProject: null,
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
  title: "Project/List/ProjectForm",
  component: ProjectForm,
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
} satisfies Meta<typeof ProjectForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
