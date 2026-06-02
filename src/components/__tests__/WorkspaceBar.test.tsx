import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { WorkspaceBar } from "../WorkspaceBar";
import { resetStore } from "../../test/storeHelpers";

const mockRequestFullscreen = vi.fn(async () => undefined);
const mockExitFullscreen = vi.fn(async () => undefined);

beforeEach(() => {
  resetStore();
  mockRequestFullscreen.mockClear();
  mockExitFullscreen.mockClear();

  HTMLElement.prototype.requestFullscreen =
    mockRequestFullscreen as unknown as typeof HTMLElement.prototype.requestFullscreen;
  Object.defineProperty(document, "exitFullscreen", {
    configurable: true,
    value: mockExitFullscreen,
    writable: true,
  });
  Object.defineProperty(document, "fullscreenElement", {
    configurable: true,
    value: null,
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("WorkspaceBar - fullscreen button", () => {
  it("renders the Pantalla button alongside Camara and PNG", () => {
    render(<WorkspaceBar />);
    expect(screen.getByRole("button", { name: "Camara" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "PNG" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Pantalla" })).toBeInTheDocument();
  });

  it("shows 'Salir' when the document is in fullscreen", () => {
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: document.createElement("div"),
    });
    render(<WorkspaceBar />);
    expect(screen.getByRole("button", { name: "Salir" })).toBeInTheDocument();
  });

  it("updates its label when a fullscreenchange event fires", () => {
    render(<WorkspaceBar />);
    expect(screen.getByRole("button", { name: "Pantalla" })).toBeInTheDocument();

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: document.createElement("div"),
    });
    act(() => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });
    expect(screen.getByRole("button", { name: "Salir" })).toBeInTheDocument();

    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: null,
    });
    act(() => {
      document.dispatchEvent(new Event("fullscreenchange"));
    });
    expect(screen.getByRole("button", { name: "Pantalla" })).toBeInTheDocument();
  });

  it("does nothing when there is no plot div to fullscreen", () => {
    render(<WorkspaceBar />);
    fireEvent.click(screen.getByRole("button", { name: "Pantalla" }));
    expect(mockRequestFullscreen).not.toHaveBeenCalled();
    expect(mockExitFullscreen).not.toHaveBeenCalled();
  });

  it("calls requestFullscreen on the plot div when not in fullscreen", () => {
    const plotDiv = document.createElement("div");
    plotDiv.className = "js-plotly-plot";
    document.body.appendChild(plotDiv);

    render(<WorkspaceBar />);
    fireEvent.click(screen.getByRole("button", { name: "Pantalla" }));

    expect(mockRequestFullscreen).toHaveBeenCalledTimes(1);
    expect(mockExitFullscreen).not.toHaveBeenCalled();

    document.body.removeChild(plotDiv);
  });

  it("calls exitFullscreen when already in fullscreen", () => {
    const plotDiv = document.createElement("div");
    plotDiv.className = "js-plotly-plot";
    document.body.appendChild(plotDiv);
    Object.defineProperty(document, "fullscreenElement", {
      configurable: true,
      value: plotDiv,
    });

    render(<WorkspaceBar />);
    fireEvent.click(screen.getByRole("button", { name: "Salir" }));

    expect(mockExitFullscreen).toHaveBeenCalledTimes(1);
    expect(mockRequestFullscreen).not.toHaveBeenCalled();

    document.body.removeChild(plotDiv);
  });
});
