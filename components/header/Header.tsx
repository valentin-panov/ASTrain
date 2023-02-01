import React, { useContext } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import GradientLink from "../common/GradientLink";
import { AuthContext } from "../../context/AuthContext";
import MainButton from "../common/MainButton";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Header.module.scss";
import { Navbar } from "../index";

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const onClick = async () => {
    await router.push("/signup");
  };

  return (
    <div className={styles.container}>
      <Link href={"/"} shallow={true}>
        <a className={styles.container_logo}>
          <Image src={logo} alt="Logo" width={150} height={32} />
        </a>
      </Link>
      <div className={styles.container_buttons}>
        {auth.isAuthenticated() ? (
          <Navbar />
        ) : (
          <>
            <MainButton
              onClick={onClick}
              text={"Sign Up"}
              loading={false}
              variant={"text"}
            ></MainButton>
            <GradientLink
              to={"/login"}
              // to={auth.isAuthenticated() ? "/dashboard" : "/login"}
              text="Log In"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
