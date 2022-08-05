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
      <Container sx={{ minHeight: "75vh" }}>{children}</Container>
      <Footer />
    </Container>
  );
}

export default Layout;
