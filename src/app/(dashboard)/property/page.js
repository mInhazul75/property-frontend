"use client";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Input, Pagination, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropertyService from "../../../../services/api/PropertyService";

const PropertyManagement = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, [page]);

  const fetchProperties = async () => {
    // setLoading(true);
    const data = await PropertyService.getPropertyItems(page);
    setProperties(data.properties);
    setTotalProperties(data.totalProperties);
    setLoading(false);
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    if (editingProperty) {
      values.id = editingProperty;
      await PropertyService.updateProperty({
        ...values,
        _id: editingProperty._id,
      });
    } else {
      await PropertyService.createProperty(values);
    }
    setModalVisible(false);
    fetchProperties();
  };

  const handleDelete = async (deleteProperty) => {
    const payload = { deleteProperty };
    await PropertyService.deleteProperty(payload);
    fetchProperties();
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            setEditingProperty(null);
            setModalVisible(true);
          }}
        >
          Add Property
        </Button>
      </div>

      <Table
        dataSource={properties}
        loading={loading}
        rowKey="_id"
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Location", dataIndex: "location" },
          { title: "Rating", dataIndex: "rating" },
          { title: "Price", dataIndex: "price" },
          {
            title: "Actions",
            render: (_, record) => (
              <Space>
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => {
                    form.setFieldsValue(record);
                    setEditingProperty(record);
                    setModalVisible(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </Button>
              </Space>
            ),
          },
        ]}
        pagination={false}
      />

      <Pagination
        current={page}
        total={totalProperties}
        pageSize={10}
        onChange={setPage}
        style={{ marginTop: 16, textAlign: "center" }}
      />

      <Modal
        open={modalVisible}
        title={editingProperty ? "Edit Property" : "Add Property"}
        onCancel={() => setModalVisible(false)}
        onOk={handleSave}
        okText={editingProperty ? "Update" : "Create"}
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
          <Form.Item name="rating" label="Rating" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertyManagement;
