import Container from "@mui/material/Container";
import React from "react";
import Footer from "./Footer";

import Header from "./Header";

type MyProps = {
  children: React.ReactNode;
};

function Layout({ children }: MyProps) {
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

export default Layout;
