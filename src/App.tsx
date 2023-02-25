import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { Loading } from "components/UI";
import { RootStoreContextProvider } from "context/RootStoreContext";
import { AuthorizedRoutes, UnauthorizedRoutes } from "routes";
import { RootStore } from "store/RootStore";

const rootStore = new RootStore();
const queryClient = new QueryClient();

export const App: React.FC = observer(() => {
  const { isAuth, status } = rootStore.userStore;

  const Routes = isAuth ? AuthorizedRoutes : UnauthorizedRoutes;

  useEffect(() => {
    const controller = new AbortController();
    rootStore.userStore.checkAuth(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <BrowserRouter>
      <RootStoreContextProvider value={rootStore}>
        <QueryClientProvider client={queryClient}>
          <Loading loading={status === "init"} cover>
            <Routes />
          </Loading>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RootStoreContextProvider>
    </BrowserRouter>
  );
});
