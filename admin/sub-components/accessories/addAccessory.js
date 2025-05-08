import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addAccessory } from "@/pages/api/api";

const AddAccessory = () => {
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [newAccessory, setNewAccessory] = useState({
    title: "",
    subitems: [],
    image_url: null,
  });

  const [newSubItem, setNewSubItem] = useState({
    title: "",
    description: "",
    image_url: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [subItemImagePreview, setSubItemImagePreview] = useState(null);

  const handleChange = (field, value) => {
    setNewAccessory((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubItemChange = (field, value) => {
    setNewSubItem((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewAccessory((prev) => ({ ...prev, image_url: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubItemImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSubItem((prev) => ({ ...prev, image_url: file }));
      setSubItemImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAddSubItem = () => {
    if (!newSubItem.title.trim()) return;

    const updatedSubitem = { ...newSubItem };
    setNewAccessory((prev) => ({
      ...prev,
      subitems: [...prev.subitems, updatedSubitem],
    }));

    setNewSubItem({ title: "", description: "", image_url: null });
    setSubItemImagePreview(null);
  };

  const handleDeleteSubItem = (index) => {
    const updatedSubItems = [...newAccessory.subitems];
    updatedSubItems.splice(index, 1);
    setNewAccessory((prev) => ({ ...prev, subitems: updatedSubItems }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newAccessory.title.trim()) {
      showToast('Accessory title is required.', 'danger');
      return;
    }

    const accessoryToInsert = {
      ...newAccessory,
    };

    try {
      const addedAccessory = await addAccessory(accessoryToInsert);
      showToast('Accessory added successfully.', 'success');
      console.log(addedAccessory);
    } catch (error) {
      console.log(newAccessory);
      showToast(error.message || 'Failed to add accessory.', 'danger');
      console.error(error);
    }

    resetForm();
  };

  const resetForm = () => {
    setNewAccessory({
      title: "",
      subitems: [],
      image_url: null,
    });
    setNewSubItem({ title: "", description: "", image_url: null });
    setImagePreview(null);
    setSubItemImagePreview(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <Col xl={12} className="mb-8 mt-4">
      <Card style={{ backgroundColor: theme.white, color: theme.blue }}>
        <Card.Body>
          <h4 className="mb-4 fw-bold" style={{ color: theme.blue }}>
            Add New Coffee Accessory
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Title */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newAccessory.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
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

              {/* Subitem Fields */}
              <h5 style={{ color: theme.orange }}>Add Subitems</h5>
              {newAccessory.subitems.length > 0 &&
                newAccessory.subitems.map((subitem, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Control className="me-2" value={subitem.title} disabled />
                    <Form.Control className="me-2" value={subitem.description} disabled />
                    <Button variant="danger" size="sm" onClick={() => handleDeleteSubItem(idx)}>
                      ×
                    </Button>
                  </div>
                ))}
              <div className="d-flex flex-column mt-2">
                <Row>
                  <Col>
                    <Form.Control
                      placeholder="Subitem Title"
                      value={newSubItem.title}
                      onChange={(e) => handleSubItemChange("title", e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Subitem Description"
                      rows={2}
                      value={newSubItem.description}
                      onChange={(e) => handleSubItemChange("description", e.target.value)}
                    />
                  </Col>
                </Row>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleSubItemImageChange}
                  className="mt-2"
                />
                {subItemImagePreview && (
                  <Image src={subItemImagePreview} className="w-100 mt-2 rounded-3" />
                )}
                <Button variant="success" onClick={handleAddSubItem} className="mt-2">
                  Add Subitem
                </Button>
              </div>

              <Col xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="secondary"
                  className="mt-3 me-3"
                  onClick={handleCancel}
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
  );
};

export default AddAccessory;
