import React, { ReactNode, useContext } from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { Footer, Header, Main } from "../../components";
import { AuthContext } from "../../context/AuthContext";
import Sidebar from "../../components/sidebar/Sidebar";

interface MainProps {
  children: ReactNode | ReactNode[];
  keywords?: string;
}

const MainLayout: React.FC<MainProps> = ({ children, keywords }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={
            "vulnerable, nextjs, application, security" + keywords &&
            `, ${keywords}`
          }
        />
        <meta name={"author"} content={"Valentin Panov"} />
        <title>Metropolitan book store</title>
      </Head>
      <div className={styles.container}>
        <Header />

        {isAuthenticated() && <Sidebar />}

        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
