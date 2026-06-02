import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MeshControls } from "../MeshControls";
import { useStore } from "../../store";
import { resetStore } from "../../test/storeHelpers";

describe("MeshControls", () => {
  beforeEach(resetStore);

  it("renders the three style buttons", () => {
    render(<MeshControls />);
    expect(screen.getByRole("button", { name: "Malla" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Wireframe" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Puntos" })).toBeInTheDocument();
  });

  it("displays the point count for the current resolution", () => {
    useStore.setState({ resolution: 50 });
    render(<MeshControls />);
    expect(screen.getByText(/2.500 puntos/)).toBeInTheDocument();
  });

  it("clicking a style button updates the surface mode", async () => {
    const user = userEvent.setup();
    render(<MeshControls />);
    await user.click(screen.getByRole("button", { name: "Wireframe" }));
    expect(useStore.getState().surfaceMode).toBe("wireframe");
  });

  it("changing the range slider updates resolution and re-renders", () => {
    render(<MeshControls />);
    const slider = screen.getByRole("slider") as HTMLInputElement;
    fireEvent.change(slider, { target: { value: "40" } });
    expect(useStore.getState().resolution).toBe(40);
  });
});
