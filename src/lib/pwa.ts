const UPDATE_AVAILABLE_EVENT = "pwa:update-available";
const RELOAD_DELAY_MS = 1500;

function dispatchUpdateAvailable(): void {
  window.dispatchEvent(new CustomEvent(UPDATE_AVAILABLE_EVENT));
}

async function postSkipWaiting(): Promise<void> {
  const reg = await navigator.serviceWorker.getRegistration();
  if (!reg) return;
  const worker = reg.waiting ?? reg.installing;
  worker?.postMessage({ type: "SKIP_WAITING" });
}

export function registerSW(): void {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  if (!import.meta.env.PROD) return;

  let updatePending = false;

  const scheduleUpdate = (): void => {
    if (updatePending) return;
    updatePending = true;
    dispatchUpdateAvailable();
    setTimeout(() => {
      void postSkipWaiting();
    }, RELOAD_DELAY_MS);
  };

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (updatePending) {
      window.location.reload();
    }
  });

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => {
        if (reg.waiting && navigator.serviceWorker.controller) {
          scheduleUpdate();
        }
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (
              sw.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              scheduleUpdate();
            }
          });
        });
      })
      .catch((err) => {
        console.warn("[pwa] service worker registration failed", err);
      });
  });

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.visibilityState !== "visible") return;
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => {
          reg?.update().catch(() => {});
        });
    },
    { passive: true }
  );
}
