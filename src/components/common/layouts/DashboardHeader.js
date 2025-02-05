import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import {
  DollarCircleFilled,
  DownOutlined,
  FileOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header } = Layout;

export default function DashboardHeader() {
    const router = useRouter();
  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("authToken");
    router.push("/login");
  };

    const accountMenu = (
      <Menu
        items={[
          { label: <Link href="/dashboard">Dashboard</Link>, key: "1" },
          { label: <Link href="/profile">Profile</Link>, key: "2" },
          {
            label: (
              <span onClick={() => handleLogout()} style={{ cursor: "pointer" }}>
                Logout
              </span>
            ),
            key: "3",
          },
        ]}
      />
    );

    return (
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 50px",
          width: "100%",
          borderBottom: "1px solid #f0f0f0",
          background: "#fff",
        }}
      >
        {/* Logo */}
        <div
          
        >
          <Link href="/">My Website</Link>
        </div>

        <Menu
          mode="horizontal"
          style={{
            borderBottom: "none",
            flexGrow: 1,
            justifyContent: "center",
            backgroundColor: "transparent",
          }}
        >
          <Menu.Item key="2">
            <FileOutlined /> Documentation
          </Menu.Item>
          <Menu.Item key="3">
            <DollarCircleFilled /> Pricing
          </Menu.Item>
          <Menu.Item key="4">
            <StarOutlined /> Reviews
          </Menu.Item>
          <Menu.Item key="5">
            <Dropdown overlay={accountMenu}>
              <a onClick={(e) => e.preventDefault()}>
                <UserOutlined /> My Account
              </a>
            </Dropdown>
          </Menu.Item>
        </Menu>
      </Header>
    );

}
