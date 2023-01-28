import React, { useContext } from "react";
import Image from "next/image";
import logo from "../images/logo.png";
import GradientLink from "./common/GradientLink";
import { AuthContext } from "../context/AuthContext";
import MainButton from "./common/MainButton";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const router = useRouter();
  const onClick = async () => {
    await router.push("/signup");
  };

  return (
    <>
      <div className="w-full top-0 bg-white px-10 py-5">
        <div className="flex justify-between">
          <Image src={logo} alt="Logo" width={120} height={32} />
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
      </div>
    </>
  );
};

export default Header;
