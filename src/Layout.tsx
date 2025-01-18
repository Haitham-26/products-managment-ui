import React, { Fragment } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
      <ScrollRestoration />
    </Fragment>
  );
};
