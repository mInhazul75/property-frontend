"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Form, Input, Button, message, Row, Col } from "antd";
import AuthService from "../../../../services/api/AuthService";

const ProfilePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const user = useSelector((state) => state.user.userInfo);
  console.log("profile user", user);

  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user, form]);

  const handleProfileUpdate = async (values) => {
    setLoading(true);
    try {
      const response = await AuthService.profileUpdate(values);
      console.log("response", response);

      if (response) {
        message.success("Profile updated!");
        console.log("Updated user:", response.data);
      } else {
        message.error(
          response?.data?.message || "Profile update failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Profile update error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (values) => {
    setPasswordLoading(true);
    try {
      const response = await AuthService.profileUpdate(values);
      console.log("password update response", response);

      if (response) {
        message.success("Password updated successfully!");
        passwordForm.resetFields();
      } else {
        message.error(
          response?.data?.message || "Password update failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Password update error:", error);
      message.error("Something went wrong. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto" }}>
      <Row gutter={32}>
        <Col xs={24} md={12} style={{ paddingRight: "20px" }}>
          <h3>Current Profile</h3>
          <Form
            layout="vertical"
            form={form}
            onFinish={handleProfileUpdate}
            initialValues={{
              name: "",
              email: "",
              phone_number: "",
            }}
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

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Update Profile
              </Button>
            </Form.Item>
          </Form>
        </Col>

        <Col xs={24} md={12} style={{ paddingLeft: "20px" }}>
          <h3>Update Password</h3>
          <Form
            layout="vertical"
            form={passwordForm}
            onFinish={handlePasswordUpdate}
          >
            <Form.Item
              label="Current Password"
              name="current_password"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password!",
                },
              ]}
            >
              <Input.Password placeholder="Enter current password" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirm_password"
              dependencies={["new_password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The new & old password do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordLoading}
                block
              >
                Update Password
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
