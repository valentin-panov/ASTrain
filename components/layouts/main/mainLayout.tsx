import styles from "../../../styles/Home.module.css";
import { Footer, Header, Main, Menu } from "../../../components";
import React, { ReactNode } from "react";
import Head from "next/head";

interface MainProps {
  children: ReactNode | ReactNode[];
  keywords?: string;
}

const MainLayout: React.FC<MainProps> = ({ children, keywords }) => {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content={"vulnerable, nextjs, security" + keywords && `, ${keywords}`}
        />
        <meta name={"author"} content={"Valentin Panov"} />
        <title>Vulnerable NextJS App</title>
      </Head>
      <div className={styles.container}>
        <Header />
        <Menu />
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
