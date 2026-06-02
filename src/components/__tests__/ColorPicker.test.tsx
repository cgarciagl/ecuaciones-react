import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ColorPicker } from "../ColorPicker";
import { useStore } from "../../store";
import { resetStore } from "../../test/storeHelpers";

const COLORS = ["Viridis", "Plasma", "Hot", "Electric", "Earth", "Greys"];

describe("ColorPicker", () => {
  beforeEach(resetStore);

  it("renders all six color buttons", () => {
    render(<ColorPicker />);
    for (const c of COLORS) {
      expect(screen.getByRole("button", { name: c })).toBeInTheDocument();
    }
  });

  it("displays the active color name in the side label", () => {
    useStore.setState({ colorScale: "Plasma" });
    render(<ColorPicker />);
    const labels = screen.getAllByText("Plasma");
    expect(labels.length).toBeGreaterThan(0);
    expect(labels.some((el) => el.tagName === "SPAN")).toBe(true);
  });

  it("clicking a color button updates the store and triggers a render", async () => {
    const user = userEvent.setup();
    render(<ColorPicker />);
    await user.click(screen.getByRole("button", { name: "Hot" }));
    const s = useStore.getState();
    expect(s.colorScale).toBe("Hot");
    expect(s.plotData).not.toBeNull();
  });
});
