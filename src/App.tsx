import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { RootStoreContextProvider } from "context/RootStoreContext";
import { AuthorizedRoutes, UnauthorizedRoutes } from "routes";
import { RootStore } from "store/RootStore";

const rootStore = new RootStore();
const queryClient = new QueryClient();

export const App: React.FC = observer(() => {
  const { isAuth, status, checkAuth } = rootStore.userStore;

  const Routes = isAuth ? AuthorizedRoutes : UnauthorizedRoutes;

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <RootStoreContextProvider value={rootStore}>
        <QueryClientProvider client={queryClient}>
          {status === "init" ? "Loading" : <Routes />}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RootStoreContextProvider>
    </BrowserRouter>
  );
});
