import { Dialog } from "@/shared/components/ui/dialog";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import ProjectForm from "./ProjectForm";

const mockUseGlobalContext = vi.fn();

vi.mock("@/shared/context", () => ({
  useGlobalContext: () => mockUseGlobalContext(),
}));

describe("ProjectForm", () => {
  const addProjectMock = vi.fn();
  const onCloseMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(globalThis, "crypto", {
      value: {
        randomUUID: () => "project-1",
      },
      configurable: true,
    });

    mockUseGlobalContext.mockReturnValue({
      addProject: addProjectMock,
    });
  });

  it("renders the add project form", () => {
    render(
      <Dialog open>
        <ProjectForm onClose={onCloseMock} />
      </Dialog>,
    );

    expect(
      screen.getByRole("heading", { name: /add project/i }),
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add project/i }),
    ).toBeInTheDocument();
  });

  it("adds a new project when the form is submitted", async () => {
    const user = userEvent.setup();

    render(
      <Dialog open>
        <ProjectForm onClose={onCloseMock} />
      </Dialog>,
    );

    await user.type(screen.getByLabelText(/project name/i), "Website");
    await user.type(screen.getByLabelText(/description/i), "Build website");

    await user.click(screen.getByRole("button", { name: /add project/i }));

    expect(addProjectMock).toHaveBeenCalledOnce();

    expect(addProjectMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Website",
      description: "Build website",
      tasksCount: 0,
    });

    expect(onCloseMock).toHaveBeenCalledOnce();
  });

  it("does not add project when name is empty", async () => {
    const user = userEvent.setup();

    render(
      <Dialog open>
        <ProjectForm onClose={onCloseMock} />
      </Dialog>,
    );

    await user.click(screen.getByRole("button", { name: /add project/i }));

    expect(addProjectMock).not.toHaveBeenCalled();
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("trims project name and description before saving", async () => {
    const user = userEvent.setup();

    render(
      <Dialog open>
        <ProjectForm onClose={onCloseMock} />
      </Dialog>,
    );

    await user.type(screen.getByLabelText(/project name/i), "   Website   ");
    await user.type(
      screen.getByLabelText(/description/i),
      "   Build website   ",
    );

    await user.click(screen.getByRole("button", { name: /add project/i }));

    expect(addProjectMock).toHaveBeenCalledWith({
      id: "project-1",
      name: "Website",
      description: "Build website",
      tasksCount: 0,
    });
  });
});
