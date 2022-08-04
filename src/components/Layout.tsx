import { Container } from "@mui/material";
import React from "react";

import Header from "./Header";

type MyProps = {
  children: React.ReactNode;
};

function Layout({ children }: MyProps) {
  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
}

export default Layout;
