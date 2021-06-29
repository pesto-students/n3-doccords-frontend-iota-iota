import React from "react";
import TopNavbar from "../../../components/Appbar/topNavbar";

// eslint-disable-next-line react/prop-types
const PageLayout = ({ children }) => {
  return (
    <>
      <TopNavbar />
      <div>{children}</div>
    </>
  );
};

export default PageLayout;
