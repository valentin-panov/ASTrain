import React from "react";
import EastIcon from "@mui/icons-material/East";
import styles from "./Navbar.module.scss";
import classNames from "classnames";
import { AvatarDropdown } from "../index";

const SearchInput = () => (
  <div className={styles.container}>
    <input className={styles.container_input} placeholder="Search" />
    <button className={classNames(styles.container_button)}>
      <EastIcon />
    </button>
  </div>
);

const Navbar = () => {
  return (
    <nav className={styles.container_navbar}>
      <div className={styles.container_navbar_btnContainer}>
        <SearchInput />
      </div>
      <div className={styles.container_navbar_btnContainer}>
        <AvatarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
