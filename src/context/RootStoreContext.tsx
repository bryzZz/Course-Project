import { createCtx } from "helpers/createCtx";
import { RootStore } from "store/RootStore";

export const [useRootStoreContext, RootStoreContextProvider] =
  createCtx<RootStore>();
