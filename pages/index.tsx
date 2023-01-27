import HomePage from "./HomePage";
import React from "react";
import { MainLayout } from "../layouts";

const IndexPage: React.FC = () => {
  return (
    <>
      <MainLayout>
        <HomePage />
      </MainLayout>
    </>
  );
};
export default IndexPage;
