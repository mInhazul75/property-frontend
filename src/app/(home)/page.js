"use client";
import React from "react";
import { Layout, Menu, Button, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header, Footer, Content } = Layout;

const HomeLayout = () => {
  return (
    <Content
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "50px",
      }}
    >
      <h1
        style={{ fontSize: "42px", fontWeight: "bold", marginBottom: "20px" }}
      >
        Welcome to{" "}
        <span style={{ color: "#ff8b00" }}>
          Business Automation Ltd Luxury Stays
        </span>
      </h1>
      <p style={{ fontSize: "18px", color: "#666666", marginBottom: "30px" }}>
        Discover premium properties and hotels designed for comfort, elegance,
        and unforgettable experiences.
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "40px",
        }}
      >
        <span>✔ Exclusive Resorts</span>
        <span>✔ Luxury Villas & Apartments</span>
        <span>✔ 24/7 Concierge Services</span>
        <span>✔ Personalized Stays</span>
      </div>
      <Button
        type="primary"
        size="large"
        style={{
          padding: "10px 40px",
          borderRadius: "5px",
          backgroundColor: "#ff8b00",
          border: "none",
        }}
      >
        Explore Now
      </Button>
    </Content>
  );
};

export default HomeLayout;
