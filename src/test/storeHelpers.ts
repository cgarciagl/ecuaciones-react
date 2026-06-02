import { useStore } from "../store";

export const resetStore = () =>
  useStore.setState(useStore.getInitialState(), true);

export const getStoreState = () => useStore.getState();
