import React from "react";

import { Outlet } from "react-router-dom";

import { Header } from "components";

export const Authorized: React.FC = () => {
  return (
    <div className="h-screen">
      <Header />
      <div className="h-[calc(100vh-3.5rem)] bg-base-300">
        <Outlet />
      </div>
    </div>
  );
};
