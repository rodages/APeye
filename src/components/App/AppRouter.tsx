import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "config/urls";
import Home from "pages/Home";
import { NotFound } from "pages/NotFound/NotFound";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path={routes.home.root} element={<Home />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
