import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addWorkshop } from "@/pages/api/api";

const AddWorkshop = ({ onInsert }) => {
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };
  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  const [formData, setFormData] = useState({
    title: "",
    length_value: "",
    length_unit: "h",
    class_size: "",
    description: "",
    image_url: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFormData((prev) => ({ ...prev, image_url: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      length_value: "",
      length_unit: "h",
      class_size: "",
      description: "",
      image_url: null,
    });
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const {
      title,
      length_value,
      length_unit,
      class_size,
      description,
      image_url,
    } = formData;
  
    // Validate that all required fields are filled
    if (!title || !length_value || !length_unit || !class_size || !description || !image_url) {
      alert("Please fill in all required fields.");
      return;
    }
  
    console.log("Form values:", formData);
    
    try {
      await addWorkshop(formData); // Passing the whole formData to the addWorkshop API function
      console.log("Workshop added successfully!");
      if (onInsert) onInsert(); // trigger parent update if provided
      resetForm();
      showToast('Workshop added successfully.', 'success');
    } catch (error) {
      showToast(error.message || 'Failed to add workshop.', 'danger');
      console.error("Add workshop error:", error);
      console.log(error.message || "Submission failed");
    }
  };
  
  
  return (
    <> <div
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
    <Col xl={12} className="mb-8 mt-4">
      <Card style={{ backgroundColor: theme.white, color: theme.blue }}>
        <Card.Body>
          <h4 className="mb-4 fw-bold" style={{ color: theme.blue }}>
            Add New Workshop
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Title */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Title *</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </Col>

              {/* Length Value */}
              <Col md={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Length Value *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.length_value}
                  onChange={(e) => handleChange("length_value", e.target.value)}
                  required
                />
              </Col>

              {/* Length Unit */}
              <Col md={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Length Unit *</Form.Label>
                <Form.Select
                  value={formData.length_unit}
                  onChange={(e) => handleChange("length_unit", e.target.value)}
                  required
                >
                  <option value="h">Hours (h)</option>
                  <option value="m">Minutes (m)</option>
                </Form.Select>
              </Col>

              {/* Class Size */}
              <Col md={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Class Size *</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.class_size}
                  onChange={(e) => handleChange("class_size", e.target.value)}
                  required
                />
              </Col>

              {/* Description */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Description *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  required
                />
              </Col>

              {/* Image Upload */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Main Image *</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {imagePreview && (
                  <Image src={imagePreview} className="w-100 mt-2 rounded-3" />
                )}
              </Col>

              {/* Buttons */}
              <Col xs={12} className="d-flex justify-content-end">
                <Button
                  variant="secondary"
                  className="mt-3 me-3"
                  onClick={resetForm}
                  style={{ borderColor: theme.white }}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="mt-3"
                  style={{
                    backgroundColor: theme.orange,
                    borderColor: theme.white,
                  }}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Col>
    </>
  );
};

export default AddWorkshop;
