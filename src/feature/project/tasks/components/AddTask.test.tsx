import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddTask from "./AddTask";

const mockUseGlobalContext = vi.fn();

vi.mock("@/shared/context", () => ({
  useGlobalContext: () => mockUseGlobalContext(),
}));

describe("AddTask", () => {
  it("renders add ad task button", () => {
    mockUseGlobalContext.mockReturnValue({
      activeProject: {
        id: "1",
        name: "Test Project",
        description: "",
      },
    });

    render(<AddTask onOpen={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: /add task/i }),
    ).toBeInTheDocument();
  });

  it("calls onOpen when button is clicked", async () => {
    const onOpenMock = vi.fn();
    const user = userEvent.setup();

    mockUseGlobalContext.mockReturnValue({
      activeProject: {
        id: "1",
        name: "Test Project",
        description: "",
        tasksCount: 0,
      },
    });

    render(<AddTask onOpen={onOpenMock} />);

    await user.click(screen.getByRole("button", { name: /add task/i }));

    expect(onOpenMock).toHaveBeenCalledOnce();
  });

  it("disables button when there is no active project", () => {
    mockUseGlobalContext.mockReturnValue({
      activeProject: null,
    });

    render(<AddTask onOpen={vi.fn()} />);

    expect(screen.getByRole("button", { name: /add task/i })).toBeDisabled();
  });
});
