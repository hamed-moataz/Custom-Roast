import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addCourse } from "@/pages/api/api";

const AddCourse = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
  const [newCourse, setNewCourse] = useState({
    title: "",
    abbreviation: "",
    subtitle: "",
    overview: "",
    objectives: [],
    topics: [],
    structure: [],
    target_audience: [],
    customizable: false,
    image_url: null,
  });

  const [inputArrays, setInputArrays] = useState({
    objectives: "",
    topics: "",
    structure: "",
    target_audience: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (field, value) => {
    setNewCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    setInputArrays((prev) => ({ ...prev, [field]: value }));
    const list = value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setNewCourse((prev) => ({ ...prev, [field]: list }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCourse((prev) => ({ ...prev, image_url: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const courseData = {
      title: newCourse.title,
      subtitle: newCourse.subtitle,
      overview: newCourse.overview,
      objectives: newCourse.objectives,
      topics: newCourse.topics,
      structure: newCourse.structure,
      target_audience: newCourse.target_audience,
      image_url: newCourse.image_url,
    };
    
  
    try {
      const response = await addCourse(courseData);
      showToast('Course added successfully.', 'success');
    } catch (error) {
      showToast(error.message || 'Failed to add course.', 'danger');
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: "",
      subtitle: "",
      overview: "",
      objectives: [],
      topics: [],
      structure: [],
      target_audience: [],
      customizable: false,
      image_url: null,
    });
    setInputArrays({
      objectives: "",
      topics: "",
      structure: "",
      target_audience: "",
    });
    setImagePreview(null);
  };

  return (
    <Col xl={13} lg={12} md={12} xs={12} className="mb-8 mt-4">
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
      <Card style={{ backgroundColor: theme.white, color: theme.blue}}>
        <Card.Body>
          <h4 className="mb-4 fw-bold" style={{ color: theme.blue }}>
            Add New Course
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Image Upload */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Image</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                  <Image src={imagePreview} className="rounded-3 w-100 mt-2" alt="preview" />
                )}
              </Col>

              {/* Title */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </Col>

      
              <Col xs={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Subtitle</Form.Label>
                <Form.Control
                  type="text"
                  value={newCourse.subtitle}
                  onChange={(e) => handleChange("subtitle", e.target.value)}
                />
              </Col>

              {/* Overview */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Overview</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newCourse.overview}
                  onChange={(e) => handleChange("overview", e.target.value)}
                />
              </Col>

              {/* Objectives */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Objectives</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Learn X, Understand Y"
                  value={inputArrays.objectives}
                  onChange={(e) => handleArrayChange("objectives", e.target.value)}
                />
              </Col>

              {/* Topics */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Topics</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. HTML, CSS, JS"
                  value={inputArrays.topics}
                  onChange={(e) => handleArrayChange("topics", e.target.value)}
                />
              </Col>

              {/* Structure */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Structure</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. 5 modules, 10 lessons"
                  value={inputArrays.structure}
                  onChange={(e) => handleArrayChange("structure", e.target.value)}
                />
              </Col>

              {/* Target Audience */}
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Target Audience</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Developers, Designers"
                  value={inputArrays.target_audience}
                  onChange={(e) => handleArrayChange("target_audience", e.target.value)}
                />
              </Col>

         
            </Row>

            {/* Buttons */}
            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button
                variant="secondary"
                type="button"
                onClick={resetForm}
                style={{ backgroundColor: "#6c757d" ,borderColor:theme.white}}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: theme.orange ,borderColor:theme.white}}
              >
                Add Course
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AddCourse;
