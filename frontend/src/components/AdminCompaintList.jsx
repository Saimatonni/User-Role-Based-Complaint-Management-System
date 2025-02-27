import React, { useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";

const AdminComplaintList = ({ complaints, loading, onStatusUpdate, onReply }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [reply, setReply] = useState("");

  const columns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span className={`px-2 py-1 text-sm rounded-full ${status === "Resolved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
          {status}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setSelectedComplaint(record);
              setIsModalVisible(true);
            }}
            type="link"
            className="text-blue-600 hover:text-blue-800"
          >
            Reply
          </Button>
          <Button
            onClick={() => onStatusUpdate(record.id, record.status === "Resolved" ? "Closed" : "Resolved")}
            type="link"
            className="text-green-600 hover:text-green-800"
          >
            {record.status === "Resolved" ? "Close" : "Resolve"}
          </Button>
        </div>
      ),
    },
  ];

  // Modal for replying to a complaint
  const handleReply = async () => {
    if (reply.trim()) {
      onReply(selectedComplaint.id, reply); // Call reply function
      setIsModalVisible(false);
      setReply(""); // Clear the reply field
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Complaints List</h2>
      <Table
        columns={columns}
        dataSource={complaints}
        loading={loading}
        rowKey="id"
        pagination={false}
      />

      {/* Reply Modal */}
      <Modal
        title="Reply to Complaint"
        visible={isModalVisible}
        onOk={handleReply}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Your Reply">
            <Input.TextArea
              rows={4}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminComplaintList;
