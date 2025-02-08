"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import AuthService from "../../../../services/api/AuthService";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/userSlice";
import Cookies from 'js-cookie'
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const userData = await AuthService.login(values);

      if (userData?.token) {
          Cookies.set("access_token", userData.token, { expires: 1 }); // Expires in 1 day
          Cookies.set("refresh_token", userData.refreshToken, { expires: 7 }); 
        dispatch(setUser(userData.user));
        message.success("Login successful!");

        router.push("/dashboard");
      } else {
        message.error("Invalid login response. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <Form
        layout="vertical"
        onFinish={handleLogin}
        initialValues={{ email: "", password: "" }}
      >
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
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
