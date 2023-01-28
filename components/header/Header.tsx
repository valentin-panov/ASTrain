import React, { useContext } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";
import GradientLink from "../common/GradientLink";
import { AuthContext } from "../../context/AuthContext";
import MainButton from "../common/MainButton";
import { useRouter } from "next/router";
import Link from "next/link";

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const onClick = async () => {
    await router.push("/signup");
  };

  return (
    <div className="w-full top-0 bg-white px-10 py-5 flex justify-between">
      <Link href={"/"} shallow={true}>
        <a className="hover:cursor-pointer flex justify-center items-center">
          <Image src={logo} alt="Logo" width={120} height={32} />
        </a>
      </Link>
      <div className="flex items-center">
        <MainButton
          onClick={onClick}
          text={"Sign Up"}
          loading={false}
          variant={"text"}
        ></MainButton>
        <GradientLink
          to={auth.isAuthenticated() ? "/dashboard" : "/login"}
          text="Log In"
        />
      </div>
    </div>
  );
};

export default Header;
