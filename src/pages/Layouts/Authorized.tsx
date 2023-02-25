import React from "react";

import { Outlet } from "react-router-dom";

import { Header } from "components";

export const Authorized: React.FC = () => {
  return (
    <div className="h-screen bg-base-300">
      <Header />
      <div className="container mx-auto h-[calc(100vh-3.5rem)] px-4">
        <Outlet />
      </div>
    </div>
  );
};
