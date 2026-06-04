import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileModeSelector } from "../MobileModeSelector";
import { useStore } from "../../store";
import { resetStore } from "../../test/storeHelpers";

const TRIGGER_NAME = "Cambiar modo de superficie";

describe("MobileModeSelector", () => {
  beforeEach(resetStore);

  it("renders the current mode label on the trigger button", () => {
    render(<MobileModeSelector />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent("Malla");
  });

  it("reflects the store's current surface mode", () => {
    useStore.setState({ surfaceMode: "wireframe" });
    render(<MobileModeSelector />);
    const trigger = screen.getByRole("button", { name: TRIGGER_NAME });
    expect(trigger).toHaveTextContent("Estructura");
  });

  it("opens the popover with the three mode options when clicked", async () => {
    const user = userEvent.setup();
    render(<MobileModeSelector />);

    expect(screen.queryByRole("button", { name: "Estructura" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Puntos" })).toBeNull();

    await user.click(screen.getByRole("button", { name: TRIGGER_NAME }));

    expect(
      screen.getByRole("button", { name: "Malla" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Estructura" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Puntos" })
    ).toBeInTheDocument();
  });

  it("selects a mode and closes the popover on option click", async () => {
    const user = userEvent.setup();
    render(<MobileModeSelector />);

    await user.click(screen.getByRole("button", { name: TRIGGER_NAME }));
    await user.click(screen.getByRole("button", { name: "Puntos" }));

    expect(useStore.getState().surfaceMode).toBe("points");
    expect(screen.queryByRole("button", { name: "Estructura" })).toBeNull();
  });

  it("closes the popover when clicking outside", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <div data-testid="outside">outside</div>
        <MobileModeSelector />
      </div>
    );

    await user.click(screen.getByRole("button", { name: TRIGGER_NAME }));
    expect(
      screen.getByRole("button", { name: "Estructura" })
    ).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(screen.queryByRole("button", { name: "Estructura" })).toBeNull();
  });
});
