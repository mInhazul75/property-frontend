'use client'
import React from 'react'
import { Layout,} from "antd";
const { Footer } = Layout;

export default function FooterLayout() {
  return (
    <Footer
      style={{
        textAlign: "center",
        backgroundColor: "#fefaf4",
        color: "#666666",
      }}
    >
      © 2025 UPDATE PageBuilder. All rights reserved.
    </Footer>
  );
}
