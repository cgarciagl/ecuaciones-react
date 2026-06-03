import { useCallback, useEffect, useState } from "react";

const UPDATE_AVAILABLE_EVENT = "pwa:update-available";
const APPLY_UPDATE_EVENT = "pwa:apply-update";

export function useSWUpdate(): { available: boolean; applyUpdate: () => void } {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const onAvailable = () => setAvailable(true);
    window.addEventListener(UPDATE_AVAILABLE_EVENT, onAvailable);
    return () => {
      window.removeEventListener(UPDATE_AVAILABLE_EVENT, onAvailable);
    };
  }, []);

  const applyUpdate = useCallback(() => {
    window.dispatchEvent(new CustomEvent(APPLY_UPDATE_EVENT));
  }, []);

  return { available, applyUpdate };
}
