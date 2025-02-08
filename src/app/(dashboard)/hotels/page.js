"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  Pagination,
  Space,
  Popconfirm,
  Upload,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import HotelService from "../../../../services/api/HotelService";
import { UploadOutlined } from "@ant-design/icons";

const HotelManagement = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [totalHotels, setTotalHotels] = useState(0);
  const [imageBase64, setImageBase64] = useState("");

  useEffect(() => {
    fetchHotels();
  }, [page]);

  const fetchHotels = async () => {
    setLoading(true);
    const data = await HotelService.getHotels(page);
    setHotels(data.hotels);
    setTotalHotels(data.totalHotels);
    setLoading(false);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    if (imageBase64) {
      values.propertyImage = imageBase64;
    }

    if (editingHotel) {
      values.id = editingHotel;
      await HotelService.updateHotel({ ...values, _id: editingHotel._id });
    } else {
      await HotelService.createHotel(values);
    }
    setModalVisible(false);
    fetchHotels();
    setImageBase64(""); 
  };

  const handleDelete = async (hotelId) => {
    const payload = { hotelId };
    await HotelService.deleteHotel(payload);
    fetchHotels();
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result.toString()); 
    };
    reader.readAsDataURL(file);
    return false; // Prevent the default upload behavior
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingHotel(null);
            setImageBase64(""); // Clear image on add
            setModalVisible(true);
          }}
        >
          Add Hotel
        </Button>
      </div>

      <Table
        dataSource={hotels}
        loading={loading}
        rowKey="_id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Location", dataIndex: "location" },
          { title: "Rating", dataIndex: "averageRating" },
          {
            title: "Property Image",
            render: (_, record) => (
              <img
                src={record.propertyImage || ""}
                alt={record.name}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            ),
          },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    form.setFieldsValue(record);
                    setEditingHotel(record);
                    setImageBase64(record.propertyImage);
                    setModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure to delete this property?"
                  onConfirm={() => handleDelete(record._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />

      <Pagination
        current={page}
        total={totalHotels}
        pageSize={10}
        onChange={setPage}
        style={{ marginTop: 16, textAlign: "center" }}
      />

      <Modal
        open={modalVisible}
        title={editingHotel ? "Edit Hotel" : "Add Hotel"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText={editingHotel ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="averageRating"
            label="Rating"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* New Fields */}
          <Form.Item
            name="costPerNight"
            label="Cost per Night"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="availableRooms"
            label="Available Rooms"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          {/* Image Upload */}
          <Form.Item name="propertyImage" label="Property Image">
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
            {imageBase64 && (
              <div style={{ marginTop: 10 }}>
                <img
                  src={imageBase64}
                  alt="Hotel"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HotelManagement;
