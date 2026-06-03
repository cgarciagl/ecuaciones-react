import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { InstallPrompt } from "../InstallPrompt";

let promptSpy: ReturnType<typeof vi.fn>;

function fireBeforeInstallPrompt() {
  const event = new Event("beforeinstallprompt") as BeforeInstallPromptEvent;
  Object.defineProperty(event, "platforms", { value: ["web"] });
  promptSpy = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(event, "userChoice", {
    value: Promise.resolve({ outcome: "accepted", platform: "web" }),
  });
  event.prompt = promptSpy;
  act(() => {
    window.dispatchEvent(event);
  });
}

describe("InstallPrompt", () => {
  beforeEach(() => {
    window.localStorage.clear();
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
      configurable: true,
    });
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders nothing when no install signal is present", () => {
    const { container } = render(<InstallPrompt />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the install card with a button when beforeinstallprompt fires", () => {
    render(<InstallPrompt />);
    fireBeforeInstallPrompt();
    expect(screen.getByText("Instala Superficie3D")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Instalar" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cerrar aviso de instalacion" })
    ).toBeInTheDocument();
  });

  it("clicking Instalar triggers the deferred prompt", async () => {
    render(<InstallPrompt />);
    fireBeforeInstallPrompt();
    const button = screen.getByRole("button", { name: "Instalar" });
    await act(async () => {
      fireEvent.click(button);
    });
    expect(promptSpy).toHaveBeenCalledTimes(1);
  });

  it("clicking the close button hides the prompt and persists dismissal", () => {
    render(<InstallPrompt />);
    fireBeforeInstallPrompt();
    const close = screen.getByRole("button", {
      name: "Cerrar aviso de instalacion",
    });
    act(() => {
      fireEvent.click(close);
    });
    expect(window.localStorage.getItem("pwa-install-dismissed")).not.toBeNull();
    expect(screen.queryByText("Instala Superficie3D")).not.toBeInTheDocument();
  });

  it("renders the iOS variant with instructions and no install button", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      configurable: true,
    });
    render(<InstallPrompt />);
    expect(screen.getByText("Anade a inicio")).toBeInTheDocument();
    expect(
      screen.getByText(/Anadir a pantalla de inicio/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Instalar" })).toBeNull();
  });
});
