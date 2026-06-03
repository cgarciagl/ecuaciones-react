export const ECHARTS_CONTAINER_ID = "echarts-surface";

export type SurfaceAction = { type: "resetCamera" | "downloadPng" };

const EVENT_NAME = "echarts-surface:action";

export function dispatchSurfaceAction(detail: SurfaceAction) {
  window.dispatchEvent(
    new CustomEvent<SurfaceAction>(EVENT_NAME, { detail })
  );
}

export function subscribeSurfaceActions(
  handler: (action: SurfaceAction) => void
): () => void {
  const listener = (e: Event) => {
    const detail = (e as CustomEvent<SurfaceAction>).detail;
    if (detail) handler(detail);
  };
  window.addEventListener(EVENT_NAME, listener);
  return () => window.removeEventListener(EVENT_NAME, listener);
}
