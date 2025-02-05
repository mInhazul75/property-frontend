"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import AuthService from "../../../../services/api/AuthService";
import { useRouter } from "next/navigation";

const RegistrationPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await AuthService.register(values);
      console.log("response", response);

      if (response) {
        message.success("Registration successful!");
        router.push("/login");
        console.log("Registered user:", response.data);
      } else {
        message.error(
          response?.data?.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Registration</h2>
      <Form
        layout="vertical"
        onFinish={handleRegister}
        initialValues={{ name: "", email: "", phone: "", password: "" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone_number"
          rules={[
            { required: true, message: "Please enter your phone number!" },
            {
              pattern: /^[0-9]{11}$/,
              message: "Please enter a valid 11-digit phone number!",
            },
          ]}
        >
          <Input placeholder="Enter your phone number" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationPage;
