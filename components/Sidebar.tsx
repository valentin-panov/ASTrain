import React, { useContext } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faChartLine,
  faChartPie,
  faCogs,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import Image from "next/image";

const logo = "./../images/logo.png";

const navItems = [
  {
    label: "Dashboard",
    path: "dashboard",
    icon: faChartLine,
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Inventory",
    path: "inventory",
    icon: faChartPie,
    allowedRoles: ["admin"],
  },
  {
    label: "Account",
    path: "account",
    icon: faAddressCard,
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Settings",
    path: "settings",
    icon: faCogs,
    allowedRoles: ["user", "admin"],
  },
  {
    label: "Users",
    path: "users",
    icon: faDoorOpen,
    allowedRoles: ["admin"],
  },
];

interface NavItemProps {
  navItem: {
    path: string;
    icon: string;
    label: string;
  };
}

const NavItem: React.FC<NavItemProps> = ({ navItem }) => {
  const location = useLocation();
  const isCurrentRoute = location.pathname === `/${navItem.path}`;
  const classes = classNames({
    "px-2 sm:px-6 justify-center sm:justify-start py-3 rounded-full flex": true,
    "text-gray-600 hover:text-blue-500 transform hover:translate-x-1 transition ease-in-out duration-100":
      !isCurrentRoute,
    "bg-gradient text-gray-100 shadow-lg": isCurrentRoute,
  });
  return (
    <Link href={navItem.path} className={classes}>
      <div className="flex items-center">
        <div className="mr-0 sm:mr-4">
          <FontAwesomeIcon icon={navItem.icon} />
        </div>
        <span className="hidden sm:block">{navItem.label}</span>
      </div>
    </Link>
  );
};

interface NavItemContainerProps {}

const NavItemContainer: React.FC<NavItemContainerProps> = ({ children }) => (
  <div>{children}</div>
);

const Sidebar = () => {
  const auth = useContext(AuthContext);
  const { role } = auth.authState.userInfo;
  return (
    <section className="h-screen">
      <div className="w-16 sm:w-24 m-auto">
        <Image src={logo} alt="Logo" />
      </div>
      <div className="mt-20">
        {navItems.map((navItem, i) => (
          <NavItemContainer key={i}>
            {navItem.allowedRoles.includes(role) && (
              <NavItem navItem={navItem} />
            )}
          </NavItemContainer>
        ))}
      </div>
    </section>
  );
};

export default Sidebar;
