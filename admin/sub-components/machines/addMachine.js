import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addMachine } from "@/pages/api/api";

const AddMachine = ({ onInsert }) => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [newMachine, setNewMachine] = useState({
    category: "",
    title: "",
    description: "",
    additional_info: {},
    large_info: {},
    image_url: null,
    details: [],
  });

  const [newDetail, setNewDetail] = useState("");
  const [newInfoKey, setNewInfoKey] = useState("");
  const [newInfoValue, setNewInfoValue] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [newLargeInfoKey, setNewLargeInfoKey] = useState("");
  const [newLargeInfoValue, setNewLargeInfoValue] = useState("");
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
};

  const handleChange = (field, value) => {
    setNewMachine((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewMachine((prev) => ({ ...prev, image_url: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddDetail = () => {
    if (!newDetail.trim()) return;
    setNewMachine((prev) => ({
      ...prev,
      details: [...prev.details, newDetail.trim()],
    }));
    setNewDetail("");
  };

  const handleDeleteDetail = (index) => {
    const updated = [...newMachine.details];
    updated.splice(index, 1);
    setNewMachine((prev) => ({ ...prev, details: updated }));
  };

  const handleAddAdditionalInfo = () => {
    if (!newInfoKey.trim() || !newInfoValue.trim()) return;
    setNewMachine((prev) => ({
      ...prev,
      additional_info: {
        ...prev.additional_info,
        [newInfoKey.trim()]: newInfoValue.trim(),
      },
    }));
    setNewInfoKey("");
    setNewInfoValue("");
  };

  const handleDeleteAdditionalInfo = (key) => {
    const updated = { ...newMachine.additional_info };
    delete updated[key];
    setNewMachine((prev) => ({ ...prev, additional_info: updated }));
  };

  const handleAddLargeInfo = () => {
    if (!newLargeInfoKey.trim() || !newLargeInfoValue.trim()) return;
    setNewMachine((prev) => ({
      ...prev,
      large_info: {
        ...prev.large_info,
        [newLargeInfoKey.trim()]: newLargeInfoValue.trim(),
      },
    }));
    setNewLargeInfoKey("");
    setNewLargeInfoValue("");
  };

  const handleDeleteLargeInfo = (key) => {
    const updated = { ...newMachine.large_info };
    delete updated[key];
    setNewMachine((prev) => ({ ...prev, large_info: updated }));
  };

  const resetForm = () => {
    setNewMachine({
      category: "",
      title: "",
      description: "",
      additional_info: {},
      large_info: {},
      image_url: null,
      details: [],
    });
    setNewDetail("");
    setNewInfoKey("");
    setNewInfoValue("");
    setImagePreview(null);
    setNewLargeInfoKey("");
    setNewLargeInfoValue("");
  };

  const handleCancel = () => {
    resetForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newMachine.title.trim() || !newMachine.category.trim()) {
      alert("Category and Title are required.");
      return;
    }
    if (!newMachine.image_url) {
      showToast( 'Main image is required.', 'danger');
      return;
    }

    try {
     
      const result = await addMachine(newMachine);
      if (result?.item) {
        onInsert(result.item);
        resetForm();
      }
      showToast('Machine added successfully.', 'success');
    } catch (error) {
      showToast(err.message || 'Failed to add machine.', 'danger');
      console.log(newMachine);
    }
  };

  return (
    <Col xl={12} className="mb-8 mt-4">
       <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1050,
          minWidth: '250px',
        }}
      >
        {toast.show && (
          <div className={`toast show text-white bg-${toast.bg}`}>
            <div className="d-flex justify-content-between align-items-center px-3 py-2">
              <div className="toast-body">{toast.message}</div>
              <button
                type="button"
                className="btn-close btn-close-white ms-2 mb-1"
                aria-label="Close"
                onClick={() => setToast({ ...toast, show: false })}
              ></button>
            </div>
          </div>
        )}
      </div>
      <Card style={{ backgroundColor: theme.white, color: theme.blue }}>
        <Card.Body>
          <h4 className="mb-4 fw-bold" style={{ color: theme.blue }}>
            Add New Coffee Machine
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Category */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Category</Form.Label>
                <Form.Select
                  value={newMachine.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Professional">Professional</option>
                </Form.Select>
              </Col>

              {/* Main Image */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Main Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <Image src={imagePreview} className="w-100 mt-2 rounded-3" />
                )}
              </Col>

              {/* Title */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newMachine.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </Col>

              {/* Description */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={newMachine.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Col>

              {/* Additional Info */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Additional Info</Form.Label>
                {Object.entries(newMachine.additional_info).map(([key, value], idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Control className="me-2" value={key} disabled />
                    <Form.Control className="me-2" value={value} disabled />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteAdditionalInfo(key)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <div className="d-flex gap-2 mt-2">
                  <Form.Control
                    placeholder="Key"
                    value={newInfoKey}
                    onChange={(e) => setNewInfoKey(e.target.value)}
                  />
                  <Form.Control
                    placeholder="Value"
                    value={newInfoValue}
                    onChange={(e) => setNewInfoValue(e.target.value)}
                  />
                  <Button variant="success" onClick={handleAddAdditionalInfo}>
                    Add
                  </Button>
                </div>
              </Col>

              {/* Large Info */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Large Info</Form.Label>
                {Object.entries(newMachine.large_info).map(([key, value], idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Control className="me-2" value={key} disabled />
                    <Form.Control className="me-2" value={value} disabled />
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteLargeInfo(key)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
                <div className="d-flex gap-2 mt-2">
                  <Form.Control
                    placeholder="Large Info Key"
                    value={newLargeInfoKey}
                    onChange={(e) => setNewLargeInfoKey(e.target.value)}
                  />
                  <Form.Control
                    placeholder="Large Info Value"
                    value={newLargeInfoValue}
                    onChange={(e) => setNewLargeInfoValue(e.target.value)}
                  />
                  <Button variant="success" onClick={handleAddLargeInfo}>
                    Add
                  </Button>
                </div>
              </Col>

              {/* Submit and Cancel Buttons */}
              <Col xs={12} className="d-flex justify-content-end gap-3">
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Machine
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddMachine;
