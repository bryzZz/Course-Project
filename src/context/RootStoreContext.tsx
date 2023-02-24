import { RootStore } from "store/RootStore";
import { createCtx } from "utils";

export const [useRootStoreContext, RootStoreContextProvider] =
  createCtx<RootStore>();
