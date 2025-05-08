import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addGrinder } from "@/pages/api/api";

const AddGrinder = ({ onInsert }) => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [newGrinder, setNewGrinder] = useState({
    title: "",
    subItems: [],
    description: "",
    additional_info: {},
    details: [],
    image_url: null,
  });

  const [newDetail, setNewDetail] = useState("");
  const [newInfoKey, setNewInfoKey] = useState("");
  const [newInfoValue, setNewInfoValue] = useState("");
  const [subItemTitle, setSubItemTitle] = useState("");
  const [subItemImage, setSubItemImage] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  const [imagePreview, setImagePreview] = useState(null);
  const [subItemsPreview, setSubItemsPreview] = useState([]);

  const handleChange = (field, value) => {
    setNewGrinder((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewGrinder((prev) => ({ ...prev, image_url: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddDetail = () => {
    if (!newDetail.trim()) return;
    setNewGrinder((prev) => ({
      ...prev,
      details: [...prev.details, newDetail.trim()],
    }));
    setNewDetail("");
  };

  const handleDeleteDetail = (index) => {
    const updated = [...newGrinder.details];
    updated.splice(index, 1);
    setNewGrinder((prev) => ({ ...prev, details: updated }));
  };

  const handleAddAdditionalInfo = () => {
    if (!newInfoKey.trim() || !newInfoValue.trim()) return;
    setNewGrinder((prev) => ({
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
    const updated = { ...newGrinder.additional_info };
    delete updated[key];
    setNewGrinder((prev) => ({ ...prev, additional_info: updated }));
  };

  const handleSubItemAdd = () => {
    if (!subItemTitle || !subItemImage) return;
  
    const newSub = {
      title: subItemTitle,
      image_url: subItemImage.name,
      _file: subItemImage, // store actual file separately
    };
  
    setNewGrinder((prev) => ({
      ...prev,
      subItems: [...prev.subItems, newSub],
    }));
  
    setSubItemsPreview((prev) => [...prev, URL.createObjectURL(subItemImage)]);
    setSubItemTitle("");
    setSubItemImage(null);
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await addGrinder(newGrinder);
      console.log("Grinder added successfully:", response);
      onInsert?.(response);
      // Reset form
      setNewGrinder({
        title: "",
        subItems: [],
        description: "",
        additional_info: {},
        details: [],
        image_url: null,
      });
      setImagePreview(null);
      setSubItemsPreview([]);
      showToast('Grinder added successfully.', 'success');
    } catch (err) {
      console.log(newGrinder)
      showToast(err.message || 'Failed to add grinder.', 'danger');
    }
  };
  

  const resetForm = () => {
    setNewGrinder({
      title: "",
      subItems: [],
      description: "",
      additional_info: {},
      details: [],
      image_url: null,
    });
    setNewDetail("");
    setNewInfoKey("");
    setNewInfoValue("");
    setSubItemTitle("");
    setSubItemImage(null);
    setImagePreview(null);
    setSubItemsPreview([]);
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
          <h4 className="mb-4 fw-bold" style={{color:theme.blue}}>Add New Coffee Grinder</h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Main Image */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Main Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && <Image src={imagePreview} className="w-100 mt-2 rounded-3" />}
              </Col>

              {/* Title */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newGrinder.title}
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
                  value={newGrinder.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Col>

              {/* Additional Info */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Additional Info</Form.Label>
                {Object.entries(newGrinder.additional_info).map(([key, value], idx) => (
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
                  <Button variant="success" onClick={handleAddAdditionalInfo} style={{borderColor:theme.white}}>
                    Add
                  </Button>
                </div>
              </Col>

              {/* Details */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Details</Form.Label>
                {newGrinder.details.map((detail, idx) => (
                  <div key={idx} className="d-flex align-items-center mb-2">
                    <Form.Control value={detail} disabled className="me-2" />
                    <Button variant="danger" size="sm" onClick={() => handleDeleteDetail(idx)} style={{borderColor:theme.white}}>
                      ×
                    </Button>
                  </div>
                ))}
                <div className="d-flex gap-2 mt-2">
                  <Form.Control
                    placeholder="Enter a detail"
                    value={newDetail}
                    onChange={(e) => setNewDetail(e.target.value)}
                  />
                  <Button variant="success" onClick={handleAddDetail} style={{borderColor:theme.white}}>
                    Add
                  </Button>
                </div>
              </Col>

              {/* SubItems */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>SubItem Title</Form.Label>
                <Form.Control
                  type="text"
                  value={subItemTitle}
                  onChange={(e) => setSubItemTitle(e.target.value)}
                />
                <Form.Label style={{ color: theme.orange }} className="mt-2">
                  SubItem Image
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSubItemImage(e.target.files[0])}
                />
                <Button className="mt-2" size="sm" style={{ backgroundColor: theme.orange, borderColor:theme.white}} onClick={handleSubItemAdd}>
                  Add SubItem
                </Button>
                {subItemsPreview.length > 0 && (
                  <div className="mt-2 d-flex gap-2 flex-wrap">
                    {subItemsPreview.map((src, idx) => (
                      <Image key={idx} src={src} alt="sub" height={80} className="rounded-2" />
                    ))}
                  </div>
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button variant="secondary" type="button" onClick={resetForm} style={{borderColor:theme.white}}>
                Cancel
              </Button>
              <Button type="submit" style={{ backgroundColor: theme.orange, borderColor:theme.white}}>
                Add Grinder
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddGrinder;
