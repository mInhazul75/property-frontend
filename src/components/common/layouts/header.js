import React from "react";
import { Layout, Button, Dropdown, Space } from "antd";
import {
  DollarCircleFilled,
  DownOutlined,
  FileGifOutlined,
  FileOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header } = Layout;

export default function HeaderLayout() {
  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#ffffff",
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1)",
        padding: "0 50px",
      }}
    >
      {/* Logo */}
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1f1f1f" }}>
        <span style={{ color: "#ff8b00" }}>
          <Link href="/">BA LTD </Link>
        </span>
      </div>

      
      <Space>
        <Button type="text">
          <Link href="/login">Login</Link>
        </Button>
        <Button type="primary">
          <Link href="/signup">Sign Up</Link>
        </Button>
      </Space>
    </Header>
  );
}
