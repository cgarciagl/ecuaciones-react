import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DomainControls } from "../DomainControls";
import { useStore } from "../../store";
import { resetStore } from "../../test/storeHelpers";

describe("DomainControls", () => {
  beforeEach(resetStore);

  it("renders the four domain inputs with the current values", () => {
    render(<DomainControls />);
    const inputs = screen.getAllByRole("spinbutton") as HTMLInputElement[];
    expect(inputs).toHaveLength(4);
    expect(inputs[0].value).toBe("-3.14");
    expect(inputs[1].value).toBe("3.14");
    expect(inputs[2].value).toBe("-3.14");
    expect(inputs[3].value).toBe("3.14");
  });

  it("renders the three preset buttons", () => {
    render(<DomainControls />);
    expect(screen.getByRole("button", { name: "Compacto" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Amplio" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pi" })).toBeInTheDocument();
  });

  it("clicking a preset updates domain and renders", async () => {
    const user = userEvent.setup();
    render(<DomainControls />);
    await user.click(screen.getByRole("button", { name: "Amplio" }));
    const s = useStore.getState();
    expect(s.xMin).toBe(-10);
    expect(s.xMax).toBe(10);
    expect(s.yMin).toBe(-10);
    expect(s.yMax).toBe(10);
    expect(s.plotData).not.toBeNull();
  });

  it("typing a new value updates the store on blur and re-renders", () => {
    render(<DomainControls />);
    const xMin = screen.getAllByRole("spinbutton")[0] as HTMLInputElement;
    fireEvent.change(xMin, { target: { value: "-1" } });
    expect(useStore.getState().xMin).toBe(-1);
    fireEvent.blur(xMin);
    expect(useStore.getState().plotData).not.toBeNull();
  });
});
