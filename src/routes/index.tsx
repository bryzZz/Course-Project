import { Navigate, Route, Routes } from "react-router-dom";

import { EditMenu, Menu, Home, Login, Register } from "pages";
import { Authorized, Unauthorized } from "pages/Layouts";

export const UnauthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Unauthorized />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/menu/:id" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Authorized />}>
        <Route index element={<Home />} />
        <Route path="edit/:id" element={<EditMenu />} />
      </Route>
      <Route path="/menu/:id" element={<Menu />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
