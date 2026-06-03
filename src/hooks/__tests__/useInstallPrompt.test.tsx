import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { useInstallPrompt } from "../useInstallPrompt";

type Api = ReturnType<typeof useInstallPrompt>;
const emptyApi: Api = { status: "idle", promptInstall: () => Promise.resolve(), dismiss: () => undefined };

function Harness({ onReady }: { onReady: (api: Api) => void }) {
  onReady(useInstallPrompt());
  return null;
}

function fireBeforeInstallPrompt() {
  const event = new Event("beforeinstallprompt") as BeforeInstallPromptEvent;
  Object.defineProperty(event, "platforms", { value: ["web"] });
  Object.defineProperty(event, "userChoice", {
    value: Promise.resolve({ outcome: "accepted", platform: "web" }),
  });
  event.prompt = vi.fn().mockResolvedValue(undefined);
  act(() => {
    window.dispatchEvent(event);
  });
  return event;
}

function fireAppInstalled() {
  act(() => {
    window.dispatchEvent(new Event("appinstalled"));
  });
}

function mount(): { get: () => Api } {
  const holder: { current: Api } = { current: emptyApi };
  render(<Harness onReady={(a) => { holder.current = a; }} />);
  return { get: () => holder.current };
}

describe("useInstallPrompt", () => {
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

  it("starts in idle status when no prompt fires and platform is not iOS", () => {
    const { get } = mount();
    expect(get().status).toBe("idle");
  });

  it("transitions to available after a beforeinstallprompt event", () => {
    const { get } = mount();
    fireBeforeInstallPrompt();
    expect(get().status).toBe("available");
  });

  it("promptInstall calls the deferred prompt and transitions to installed on accept", async () => {
    const { get } = mount();
    const event = fireBeforeInstallPrompt();
    await act(async () => {
      await get().promptInstall();
    });
    expect(event.prompt).toHaveBeenCalledTimes(1);
    expect(get().status).toBe("installed");
  });

  it("transitions to installed when appinstalled fires", () => {
    const { get } = mount();
    fireBeforeInstallPrompt();
    fireAppInstalled();
    expect(get().status).toBe("installed");
  });

  it("dismiss persists to localStorage and hides the prompt", () => {
    const { get } = mount();
    fireBeforeInstallPrompt();
    act(() => {
      get().dismiss();
    });
    expect(get().status).toBe("hidden");
    expect(window.localStorage.getItem("pwa-install-dismissed")).not.toBeNull();
  });

  it("treats iOS user agent as ios status", () => {
    Object.defineProperty(window.navigator, "userAgent", {
      value: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      configurable: true,
    });
    const { get } = mount();
    expect(get().status).toBe("ios");
  });

  it("treats standalone display mode as installed", () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === "(display-mode: standalone)",
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));
    const { get } = mount();
    expect(get().status).toBe("installed");
  });

  it("respects prior dismissal on mount", () => {
    window.localStorage.setItem("pwa-install-dismissed", String(Date.now()));
    const { get } = mount();
    fireBeforeInstallPrompt();
    expect(get().status).toBe("hidden");
  });

  it("ignores stale dismissal older than TTL", () => {
    const eightDaysAgo = Date.now() - 8 * 24 * 60 * 60 * 1000;
    window.localStorage.setItem("pwa-install-dismissed", String(eightDaysAgo));
    const { get } = mount();
    fireBeforeInstallPrompt();
    expect(get().status).toBe("available");
  });
});
