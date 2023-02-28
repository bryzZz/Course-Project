/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react";

import { observer } from "mobx-react-lite";
import { BsPersonCircle, BsChevronDown } from "react-icons/bs";

import { useStore } from "hooks";

export const Header: React.FC = observer(() => {
  const { user, status, logout } = useStore((store) => store.userStore);

  return (
    <header className="h-14 bg-base-100 shadow">
      <div className="container mx-auto flex h-full items-center">
        <div className="dropdown-bottom dropdown-end dropdown ml-auto">
          <label tabIndex={0}>
            <div className="flex cursor-pointer items-center gap-2 rounded p-2 text-base-content text-opacity-80 transition-all hover:bg-base-content hover:bg-opacity-10">
              <BsPersonCircle className="h-4 w-4 fill-current" />
              <p className="text-sm">{user.name}</p>
              <BsChevronDown className="w-3 fill-current" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu w-40 rounded-md bg-base-100 py-2 shadow"
          >
            <li>
              <button
                onClick={logout}
                className="rounded-none text-sm"
                type="button"
              >
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
});
