import styles from "../../../styles/MenuLink.module.scss";
import React from "react";
import Link from "next/link";

interface Props {
  text: string;
  link: string;
}

const MenuLink: React.FC<Props> = ({ text, link }) => {
  return (
    <Link href={link} className={styles.menuLink}>
      {text}
    </Link>
  );
};

export default MenuLink;
