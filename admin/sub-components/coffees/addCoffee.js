import React, { useState } from "react";
import { Col, Row, Card, Form, Button, Image } from "react-bootstrap";
import { addCoffee } from "@/pages/api/api";

const InsertCoffee = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [newCoffee, setNewCoffee] = useState({
    name: "",
    country: "",
    process: "",
    score: "",
    weTaste: [],
    image: null,
  });

  const [weTasteInput, setWeTasteInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
};

  const handleChange = (field, value) => {
    setNewCoffee((prev) => ({ ...prev, [field]: value }));
  };

  const handleWeTasteChange = (e) => {
    setWeTasteInput(e.target.value);
    const list = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
    setNewCoffee((prev) => ({ ...prev, weTaste: list }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCoffee((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newCoffee);
  
    // Simple client-side required check
    const { name, country, process, score, weTaste, image } = newCoffee;
    if (!name || !country || !process || !score || weTaste.length === 0 || !image) {
      console.log("All fields are required.");
      return;
    }
  
    setLoading(true);
    try {
      await addCoffee(newCoffee);
      showToast('Coffee added successfully.', 'success');
      resetForm();
    } catch (err) {
      showToast(err.message || 'Failed to add coffee.', 'danger');
    } finally {
      setLoading(false);
    }
  };
  

  const resetForm = () => {
    setNewCoffee({
      name: "",
      country: "",
      process: "",
      score: "",
      weTaste: [],
      image: null,
    });
    setWeTasteInput("");
    setImagePreview(null);
  };

  return (
    <Col xl={13} lg={12} md={12} xs={12} className="mb-8 mt-4">
      <Card style={{ backgroundColor: theme.white, color: theme.blue }}>
        <Card.Body>
          <h4 className="mb-4 fw-bold" style={{ color: theme.blue }}>
            Add New Coffee
          </h4>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Image*</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
                {imagePreview && (
                  <Image
                    src={imagePreview}
                    className="rounded-3 w-100 mt-2"
                    alt="preview"
                  />
                )}
              </Col>

              <Col xs={12} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Name*</Form.Label>
                <Form.Control
                  type="text"
                  value={newCoffee.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Col>

              <Col xs={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Country*</Form.Label>
                <Form.Control
                  type="text"
                  value={newCoffee.country}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                />
              </Col>

              <Col xs={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Process*</Form.Label>
                <Form.Control
                  type="text"
                  value={newCoffee.process}
                  onChange={(e) => handleChange("process", e.target.value)}
                  required
                />
              </Col>

              <Col xs={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Score*</Form.Label>
                <Form.Control
                  type="number"
                  value={newCoffee.score}
                  onChange={(e) => handleChange("score", parseFloat(e.target.value))}

                  required
                  min="0"
                  step="0.1"
                />
              </Col>

              <Col xs={6} className="mb-3">
                <Form.Label style={{ color: theme.orange }}>We Taste*</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. Strawberry, Cocoa"
                  value={weTasteInput}
                  onChange={handleWeTasteChange}
                  required
                />
                {newCoffee.weTaste.length > 0 && (
                  <div className="mt-2" style={{ fontSize: "0.9rem" }}>
                    <strong>Tastes:</strong>{" "}
                    {newCoffee.weTaste.map((item, idx) => (
                      <span key={idx} className="badge bg-light text-dark me-1">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-4 gap-2">
              <Button
                variant="secondary"
                type="button"
                onClick={resetForm}
                style={{ backgroundColor: "#6c757d", borderColor: theme.white }}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                style={{ backgroundColor: theme.orange, borderColor: theme.white }}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Coffee"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default InsertCoffee;
