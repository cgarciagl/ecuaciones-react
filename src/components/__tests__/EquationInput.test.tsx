import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EquationInput } from "../EquationInput";
import { useStore } from "../../store";
import { EXAMPLES } from "../../lib/examples";

function resetStore() {
  useStore.setState(useStore.getInitialState(), true);
}

describe("EquationInput", () => {
  beforeEach(resetStore);

  it("shows the current equation from the store", () => {
    render(<EquationInput />);
    const input = screen.getByPlaceholderText("sin(x) * cos(y)");
    expect(input).toHaveValue(EXAMPLES[0].eq);
  });

  it("updates the store on change", () => {
    render(<EquationInput />);
    const input = screen.getByPlaceholderText("sin(x) * cos(y)");
    fireEvent.change(input, { target: { value: "x*y" } });
    expect(useStore.getState().equation).toBe("x*y");
  });
});
