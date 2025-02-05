

import React from "react";
import {
  Layout,
  Menu,
  Card,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Dropdown,
} from "antd";

import {
  AppstoreOutlined,
  DollarOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  TeamOutlined,
  UserOutlined,
  PlusOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;


export default function DashboardMenu() {
  return (
    <Sider theme="light" width={250}>
      <div className="logo" style={{ padding: "16px", textAlign: "center" }}>
        {/* <img
          src="https://via.placeholder.com/100x40"
          alt="logo"
          style={{ width: "100%" }}
        /> */}
        <div
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ff8b00",
          }}
        >
          <Link href="/">UPDATE BUILDER</Link>
        </div>
      </div>
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.ItemGroup title="Shortcuts">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/dashboard">All Websites</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Divider />

        <Menu.ItemGroup title="Agency">
          <Menu.Item key="2" icon={<TeamOutlined />}>
            Agency Panel
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Divider />

        <Menu.ItemGroup title="Account">
          <Menu.Item key="3" icon={<DollarOutlined />}>
            <Link href="/billing">Billing</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            Affiliate
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Divider />

        <Menu.ItemGroup title="Help">
          <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
            Help Center
          </Menu.Item>
          <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
            What is new
          </Menu.Item>
          <Menu.Item key="5" icon={<QuestionCircleOutlined />}>
            Get Support
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
}
