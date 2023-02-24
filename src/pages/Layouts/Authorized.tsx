import React from "react";

import { Outlet } from "react-router-dom";

import { Header } from "components";

export const Authorized: React.FC = () => {
  return (
    <div className="container mx-auto h-screen bg-gray-100 px-4">
      <Header />
      <Outlet />
    </div>
  );
};
