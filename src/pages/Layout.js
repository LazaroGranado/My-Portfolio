/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";

const Layout = (props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
