import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ExamplesSheet,
  FloatingExamplesButton,
} from "../ExamplesPanel";
import { useStore } from "../../store";
import { EXAMPLES } from "../../lib/examples";
import { resetStore } from "../../test/storeHelpers";

describe("ExamplesSheet", () => {
  beforeEach(resetStore);

  it("does not block pointer events when closed", () => {
    render(<ExamplesSheet />);
    const wrapper = screen.getByLabelText("Cerrar ejemplos").parentElement!;
    expect(wrapper).toHaveClass("pointer-events-none");
  });

  it("blocks pointer events when open and shows example names", async () => {
    const user = userEvent.setup();
    useStore.setState({ examplesOpen: true });
    render(<ExamplesSheet />);
    const wrapper = screen.getByLabelText("Cerrar ejemplos").parentElement!;
    expect(wrapper).toHaveClass("pointer-events-auto");
    for (const ex of EXAMPLES) {
      expect(screen.getAllByText(ex.name).length).toBeGreaterThan(0);
    }
    await user.click(screen.getByRole("button", { name: "Cerrar" }));
    expect(useStore.getState().examplesOpen).toBe(false);
  });
});

describe("FloatingExamplesButton", () => {
  beforeEach(resetStore);

  it("toggles the examples panel on click", async () => {
    const user = userEvent.setup();
    render(<FloatingExamplesButton />);
    expect(useStore.getState().examplesOpen).toBe(false);
    await user.click(screen.getByRole("button", { name: "Ejemplos" }));
    expect(useStore.getState().examplesOpen).toBe(true);
  });
});
