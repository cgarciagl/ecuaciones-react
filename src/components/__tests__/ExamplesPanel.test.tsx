import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ExamplesPanel } from "../ExamplesPanel";
import { useStore } from "../../store";
import { EXAMPLES } from "../../lib/examples";
import { resetStore } from "../../test/storeHelpers";

describe("ExamplesPanel", () => {
  beforeEach(resetStore);

  it("renders a button for every example", () => {
    render(<ExamplesPanel />);
    for (const ex of EXAMPLES) {
      expect(screen.getByRole("button", { name: new RegExp(ex.name) })).toBeInTheDocument();
    }
  });

  it("clicking an example loads it and closes the panel", async () => {
    useStore.setState({ examplesOpen: true });
    const user = userEvent.setup();
    render(<ExamplesPanel />);
    const firstExample = EXAMPLES[0];
    await user.click(screen.getByRole("button", { name: new RegExp(firstExample.name) }));
    const s = useStore.getState();
    expect(s.equation).toBe(firstExample.eq);
    expect(s.examplesOpen).toBe(false);
  });
});
