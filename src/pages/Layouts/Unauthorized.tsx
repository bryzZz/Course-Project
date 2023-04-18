import React from "react";

import { Outlet } from "react-router-dom";

export const Unauthorized: React.FC = () => {
  return (
    <div className="h-screen bg-base-300">
      <Outlet />
    </div>
  );
};
