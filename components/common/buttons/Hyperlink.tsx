import React from "react";
import Link from "next/link";
import s from "./Button.module.scss";

interface IHyperlink {
  text: string;
  to: string;
}

const Hyperlink: React.FC<IHyperlink> = ({ text, to }) => (
  <Link href={to} className={s.link}>
    {text}
  </Link>
);

export default Hyperlink;
