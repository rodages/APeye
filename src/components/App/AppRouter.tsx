import * as React from "react";
import { Route, Routes } from "react-router-dom";

import { routes } from "config/urls";
import Bill from "pages/Bill";
import Home from "pages/Home";
import { NotFound } from "pages/NotFound/NotFound";
import Supplier from "pages/Supplier";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path={routes.home.root} element={<Home />} />
    <Route path={routes.supplier.index} element={<Supplier />} />
    <Route path={routes.bill.index} element={<Bill />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRouter;
