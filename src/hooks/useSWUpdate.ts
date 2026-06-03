import { useEffect, useState } from "react";

const UPDATE_AVAILABLE_EVENT = "pwa:update-available";

export function useSWUpdate(): { available: boolean } {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const onAvailable = () => setAvailable(true);
    window.addEventListener(UPDATE_AVAILABLE_EVENT, onAvailable);
    return () => {
      window.removeEventListener(UPDATE_AVAILABLE_EVENT, onAvailable);
    };
  }, []);

  return { available };
}
