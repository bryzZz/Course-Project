import { createContext, useContext } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const createCtx = <A extends {} | null>() => {
  const ctx = createContext<A | undefined>(undefined);

  const useCtx = () => {
    const c = useContext(ctx);
    if (c === undefined)
      throw new Error("useCtx must be inside a Provider with a value");
    return c;
  };

  return [useCtx, ctx.Provider] as const;
};
