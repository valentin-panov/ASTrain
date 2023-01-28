import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import GradientLink from "../components/common/GradientLink";
import { Header } from "../components";

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <Header />
      <div className="h-full bg-blue-900">
        <div className="opacity-10">
          <img
            className="object-fill w-full"
            src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            alt="Home"
          />
        </div>
        <div className="absolute left-0 top-0 mt-32 lg:mt-48 px-12 nato-sans">
          <div className="w-full lg:w-2/3">
            <h1 className="text-gray-200 text-2xl lg:text-6xl sm:text-5xl font-bold leading-tight">
              Your Space Exploration starts today!
            </h1>
            <h2 className="text-gray-400 text-md sm:text-2xl sm:mt-10 mt-4">
              Take the plan to get there
            </h2>
            <div className="mt-4 sm:mt-10 w-48">
              <GradientLink
                text="Get Started"
                size="large"
                to={auth.isAuthenticated() ? "/dashboard" : "/login"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
