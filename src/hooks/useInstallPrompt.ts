import { useCallback, useEffect, useState } from "react";

const DISMISS_KEY = "pwa-install-dismissed";
const DISMISS_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export type InstallStatus = "idle" | "available" | "ios" | "installed" | "hidden";

export type UseInstallPromptResult = {
  status: InstallStatus;
  promptInstall: () => Promise<void>;
  dismiss: () => void;
};

function readDismissed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY);
    if (!raw) return false;
    const ts = Number(raw);
    if (!Number.isFinite(ts)) return false;
    return Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

function writeDismissed(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* quota or disabled — ignore */
  }
}

function detectInstalled(): boolean {
  if (typeof window === "undefined") return false;
  const standalone = window.matchMedia?.("(display-mode: standalone)").matches;
  if (standalone) return true;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true;
}

function detectIOS(): boolean {
  if (typeof window === "undefined") return false;
  const ua = window.navigator.userAgent;
  return /iPhone|iPad|iPod/i.test(ua) || (ua.includes("Mac") && window.navigator.maxTouchPoints > 1);
}

export function useInstallPrompt(): UseInstallPromptResult {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState<boolean>(detectInstalled);
  const [dismissed, setDismissed] = useState<boolean>(readDismissed);
  const isIOS = detectIOS();

  useEffect(() => {
    if (dismissed || installed) return;

    const onPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };

    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [dismissed, installed]);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    const choice = await deferred.userChoice;
    if (choice.outcome === "accepted") {
      setInstalled(true);
    }
    setDeferred(null);
  }, [deferred]);

  const dismiss = useCallback(() => {
    writeDismissed();
    setDismissed(true);
  }, []);

  let status: InstallStatus;
  if (installed) status = "installed";
  else if (dismissed) status = "hidden";
  else if (deferred) status = "available";
  else if (isIOS) status = "ios";
  else status = "idle";

  return { status, promptInstall, dismiss };
}
