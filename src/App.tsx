import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter } from "react-router-dom";

import { Loading } from "components/UI";
import { useUserStore } from "hooks";
import { AuthorizedRoutes, UnauthorizedRoutes } from "routes";

const queryClient = new QueryClient();

export const App: React.FC = observer(() => {
  const { isAuth, status, checkAuth } = useUserStore((state) => ({
    isAuth: state.isAuth,
    status: state.status,
    checkAuth: state.checkAuth,
  }));

  const Routes = isAuth ? AuthorizedRoutes : UnauthorizedRoutes;

  useEffect(() => {
    const controller = new AbortController();
    checkAuth(controller.signal);

    return () => {
      controller.abort();
    };
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Loading loading={status === "init"} cover>
          <Routes />
        </Loading>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
});
