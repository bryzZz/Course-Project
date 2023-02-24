import React from "react";

import { observer } from "mobx-react-lite";

import { useStore } from "hooks";

import { Loading } from "./UI";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = observer(() => {
  const { user, status, logout } = useStore((store) => store.userStore);

  return (
    <header className="flex items-center justify-between border-b border-base-content py-2">
      <p>Home {user.name}</p>
      <button className="btn w-36 rounded-full" type="button" onClick={logout}>
        <Loading loading={status === "loading"} type="dots">
          Logout
        </Loading>
      </button>
    </header>
  );
});
