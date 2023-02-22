import { useRootStoreContext } from "context/RootStoreContext";
import { RootStore } from "store/RootStore";

export function useStore(): RootStore;
export function useStore<Result>(
  selector: (value: RootStore) => Result
): Result;
export function useStore<Result>(selector?: (value: RootStore) => Result) {
  const context = useRootStoreContext();

  if (!context) {
    throw new Error("Can not `useStore` outside of the `StoreProvider`");
  }

  if (typeof selector === "function") {
    return selector(context);
  }

  return context;
}
