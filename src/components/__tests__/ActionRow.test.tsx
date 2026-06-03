import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ActionRow } from "../ActionRow";
import { useStore } from "../../store";
import { EXAMPLES } from "../../lib/examples";
import { resetStore } from "../../test/storeHelpers";

describe("ActionRow", () => {
  beforeEach(resetStore);

  it("renders Generar and Reset buttons", () => {
    render(<ActionRow />);
    expect(screen.getByRole("button", { name: /Generar superficie/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Reset/i })).toBeInTheDocument();
  });

  it("clicking Generar re-renders plot data after equation change", async () => {
    const user = userEvent.setup();
    render(<ActionRow />);
    expect(useStore.getState().plotData).not.toBeNull();
    useStore.setState({ equation: "x*y" });
    await user.click(screen.getByRole("button", { name: /Generar superficie/i }));
    const s = useStore.getState();
    expect(s.plotData).not.toBeNull();
    expect(s.equation).toBe("x*y");
  });

  it("clicking Reset restores the default equation and options", async () => {
    const user = userEvent.setup();
    useStore.setState({
      equation: "x + y",
      resolution: 20,
      colorScale: "Plasma",
      surfaceMode: "wireframe",
    });
    render(<ActionRow />);
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    const s = useStore.getState();
    expect(s.equation).toBe(EXAMPLES[0].eq);
    expect(s.resolution).toBe(80);
    expect(s.colorScale).toBe("Viridis");
    expect(s.surfaceMode).toBe("surface");
  });
});
