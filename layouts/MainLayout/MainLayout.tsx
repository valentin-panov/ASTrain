import React, { ReactNode } from "react";
import Head from "next/head";
import styles from "./MainLayout.module.scss";
import { Footer, Header, Main } from "../../components";

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
          content={
            "vulnerable, nextjs, application, security" + keywords &&
            `, ${keywords}`
          }
        />
        <meta name={"author"} content={"Valentin Panov"} />
        <title>UCTOK Application</title>
      </Head>
      <div className={styles.container}>
        <Header />
        {/*<Menu />*/}
        <Main>{children}</Main>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
