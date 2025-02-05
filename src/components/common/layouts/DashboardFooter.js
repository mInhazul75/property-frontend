import React from 'react'
import { Layout } from "antd";
const { Footer } = Layout;

export default function DashboardFooter() {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#fefaf4",
        color: "#666666",
      }}
    >
      © 2025 BALT. All rights reserved.
    </Footer>
  );
}
