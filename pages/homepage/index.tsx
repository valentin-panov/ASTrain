import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import GradientLink from "../../components/common/buttons/GradientLink";
import styles from "./Homepage.module.scss";

const HomePage: React.FC = () => {
  const auth = useContext(AuthContext);

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h1 className="text-gray-200 text-xl lg:text-5xl sm:text-4xl font-bold leading-tight p-2 rounded">
          Books, accessories and other goods from the metropolis.
        </h1>
        <h2 className="text-gray-100 text-md sm:text-2xl sm:mt-10 mt-4 ">
          Refresh your mind
        </h2>
        <div className="mt-4 sm:mt-10 w-48">
          <GradientLink
            text="Get Started"
            size="large"
            to={auth.isAuthenticated() ? "/dashboard" : "/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
