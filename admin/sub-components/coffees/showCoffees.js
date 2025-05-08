import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import { Col, Row, Card, Form, Dropdown, Image, Button } from "react-bootstrap";
import { getCoffees, editCoffee,deleteCoffee } from "@/pages/api/api";
import Preloader from "@/src/layouts/Preloader";

const RecentFromBlog = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };
  const [loading, setLoading] = useState(true);
  const [specialtyCoffees, setSpecialtyCoffees] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState({});
  const [imageDeleted, setImageDeleted] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
};
  useEffect(() => {
      const fetchCoffees = async () => {
        try {
          const data = await getCoffees();
          setSpecialtyCoffees(data);
        } catch (err) {
          showToast('Failed to fetch coffees data!', 'danger');
          console.log('Failed to fetch coffee ☕ data!');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCoffees();
    }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempData({ ...specialtyCoffees[index] });
    setImageDeleted((prev) => ({ ...prev, [index]: false }));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempData({});
  };
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

  const handleDelete = (index) => {
    setShowDeleteBar(true);
    setPendingDeleteIndex(index);
    setTimeout(() => {
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
    }, 5000);
  };
  const confirmDelete = async () => {
    try {
      const _id = specialtyCoffees[pendingDeleteIndex]._id;
      await deleteCoffee(_id);
      const updated = specialtyCoffees.filter((_, i) => i !== pendingDeleteIndex);
      setSpecialtyCoffees(updated);
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
      if (editingIndex === pendingDeleteIndex) {
        setEditingIndex(null);
        setTempData({});
      }
      showToast('Coffee deleted successfully.', 'success');
    } catch (error) {
      showToast(error.message || 'Failed to delete coffee.', 'danger');

    }
  };
  

  const cancelDelete = () => {
    setShowDeleteBar(false);
    setPendingDeleteIndex(null);
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTempData((prev) => ({ ...prev, image: file }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    try {
      const _id = tempData._id;
      const updatedCoffee = await editCoffee(_id, tempData);
      const updated = [...specialtyCoffees];
      updated[editingIndex] = updatedCoffee;
      setSpecialtyCoffees(updated);
      const fetchCoffees = async () => {
        try {
          const data = await getCoffees();
          setSpecialtyCoffees(data);
          showToast('coffee updated successfully.', 'success');
        } catch (err) {
          console.log('Failed to fetch coffee ☕ data!');
          showToast(err.message || 'Failed to update coffee.', 'danger');
        } finally {
          setLoading(false);
        }
      };
  
      fetchCoffees();
      setEditingIndex(null);
      setTempData({});
      setImagePreview(null);
    } catch (error) {
      console.error("Failed to save coffee:", error);
    }
  };
  

  const handleDeletePhoto = () => {
    setImageDeleted((prev) => ({ ...prev, [editingIndex]: true }));
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };
  const [currentPage, setCurrentPage] = useState(1);
  if (loading) return <Preloader />;
  else {
  const itemsPerPage = 4;
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCoffees = specialtyCoffees.slice(indexOfFirstItem, indexOfLastItem);
  
  const totalPages = Math.ceil(specialtyCoffees.length / itemsPerPage);
  
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      className="text-muted text-primary-hover"
    >
      {children}
    </Link>
  ));
  CustomToggle.displayName = "CustomToggle";

  const ActionMenu = ({ index }) => (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <MoreVertical size="15px" style={{ color: theme.blue }} />
      </Dropdown.Toggle>
      <Dropdown.Menu align={"end"}>
        <Dropdown.Item
          eventKey="1"
          style={{ color: theme.blue }}
          onClick={() => handleEdit(index)}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          eventKey="1"
          style={{ color: theme.blue }}
          onClick={() => handleDelete(index)}
        >
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return (
    <div   style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      justifyContent:"space-evenly",
      margin:"auto",
    }}>
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
    <Row className="g-7">
      {currentCoffees.map((coffee, index) => {
         const realIndex = indexOfFirstItem + index;
         const isEditing = editingIndex === realIndex;
         const currentData = isEditing ? tempData : coffee;
         const showUpload = isEditing && imageDeleted[realIndex];




        return (
          <Col
          key={index}
          lg={6}
          md={6}
          sm={12}
          xs={12}
          className="mb-4 mt-11"
        >

          <Card
            key={index}
            className="mb-5"
            style={{ backgroundColor: theme.white, color: theme.blue }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between mb-5 align-items-center">
                <div className="d-flex align-items-center">
                  <div className="ms-3">
                    <h5
                      className="mb-0 fw-bold"
                      style={{ color: theme.orange }}
                    >
                      {currentData.name}
                    </h5>
                  </div>
                </div>
                <div>{!isEditing ? <ActionMenu index={index} /> : null}</div>
              </div>

              <div className="mb-4">
                {!showUpload && currentData.image_url && (
                  <>
                    <Image
                      src={currentData.image_url}
                      className="rounded-3 w-100 mb-2"
                      alt={currentData.image_url}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover'  // This ensures the image fills the space without stretching
                      }}
                    />

                    {isEditing && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={handleDeletePhoto}
                      >
                        Delete Photo
                      </Button>
                    )}
                  </>
                )}
                {showUpload && (
                  <Col xs={12} className="mb-3">
                    <Form.Label style={{ color: theme.orange }}>
                      Image
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        className="rounded-3 w-100 mt-2"
                        alt="preview"
                      />
                    )}
                  </Col>
                )}
              </div>

              <Form.Group className="mb-3">
                <Form.Label style={{ color: theme.orange }}>Name</Form.Label>
                {isEditing ? (
                  <Form.Control
                    type="text"
                    value={currentData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <p>{currentData.name}</p>
                )}
              </Form.Group>

              <Row>
                <Col xs={6} className="mb-3">
                  <Form.Label style={{ color: theme.orange }}>
                    Country
                  </Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={currentData.country}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                    />
                  ) : (
                    <p>{currentData.country}</p>
                  )}
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Label style={{ color: theme.orange }}>
                    Process
                  </Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="text"
                      value={currentData.process}
                      onChange={(e) =>
                        handleInputChange("process", e.target.value)
                      }
                    />
                  ) : (
                    <p>{currentData.process}</p>
                  )}
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Label style={{ color: theme.orange }}>Score</Form.Label>
                  {isEditing ? (
                    <Form.Control
                      type="number"
                      value={currentData.score}
                      onChange={(e) =>
                        handleInputChange("score", e.target.value)
                      }
                    />
                  ) : (
                    <p>{currentData.score}</p>
                  )}
                </Col>
                <Col xs={6} className="mb-3">
                  <Form.Label style={{ color: theme.orange }}>
                    We Taste
                  </Form.Label>
                  {isEditing ? (
  <Form.Control
    type="text"
    value={currentData.weTaste.join(", ")}  // Join array for editing
    onChange={(e) =>
      handleInputChange(
        "weTaste",
        e.target.value.split(",").map((s) => s.trim())  // Convert back to array on change
      )
    }
  />
) : (
  <p>{Array.isArray(currentData.weTaste) ? currentData.weTaste.join(", ") : currentData.weTaste || "—"}</p>

)}
                </Col>
              </Row>

              {isEditing && (
                <div
                  className="d-flex gap-2 mt-4"
                  style={{ justifyContent: "flex-end" }}
                >
                  <Button
                    variant="success"
                    style={{ backgroundColor: theme.orange,borderColor:theme.white }}
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button variant="secondary" onClick={handleCancel} style={{borderColor:theme.white}}>
                    Cancel
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
          
          </Col>
          
        );
        
      })} 
      
      {/* Confirmation Delete Bar */}
      {showDeleteBar && (
        <div
          className="d-flex justify-content-between align-items-center p-3 bg-danger text-white rounded mt-3"
          style={{
            position: "fixed",
            bottom: 20,
            left: "5%",
            right: "5%",
            zIndex: 1000,
            width: "60%",
          }}
        >
          <span>Are you sure you want to delete this coffee?</span>
          <div
            style={{ display: "flex", flexWrap: "nowrap", paddingLeft: "3%" }}
          >
            <Button
              variant="light"
              size="sm"
              className="me-2"
              onClick={cancelDelete}
            >
              Cancel
            </Button>
            <Button variant="dark" size="sm" onClick={confirmDelete}>
              Confirm
            </Button>
          </div>
        </div>
      )}
  <div className="d-flex justify-content-center mt-4">
      <Button
        variant="outline-light"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="me-2"
        style={{color:theme.white, backgroundColor:theme.orange, borderColor:theme.white}}
      >
        Previous
      </Button>
      <span className="align-self-center"  style={{color:theme.white}}>
        Page {currentPage} of {totalPages}
      </span>
      <Button
        variant="primary"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="ms-2"
        style={{color:theme.white, backgroundColor:theme.orange, borderColor:theme.white}}
      >
        Next
      </Button>
      </div>
</Row>
    </div>
  );

};
}
export default RecentFromBlog;
