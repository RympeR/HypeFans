import React, { ReactNode } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { getMainUrlPoint } from "../../../app/utils/utilities";

interface NavLinkProps {
  children: ReactNode;
  toPath: string;
}

const NavLink = ({ children, toPath }: NavLinkProps) => {
  const location = useLocation();

  const lastUrl = getMainUrlPoint(location.pathname);
  return (
    <Link
      className={`nav__icon ${lastUrl === toPath ? "nav__icon_active" : ""}`}
      to={`/${toPath}`}
      id={toPath}
    >
      {children}
    </Link>
  );
};

export default NavLink;
