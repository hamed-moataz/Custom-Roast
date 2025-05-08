"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MoreVertical } from "react-feather";
import { Col, Row, Card, Form, Dropdown, Image, Button } from "react-bootstrap";
import { getCourses, editCourse,deleteCourse } from "@/pages/api/api";
import Preloader from "@/src/layouts/Preloader";

const ShowCoursesPage = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempData, setTempData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageDeleted, setImageDeleted] = useState({});
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };
   useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.log('Failed to fetch courses data!');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);
  const handleEdit = (index) => {
    setEditingIndex(index);
    setTempData({ ...courses[index] });
    setImageDeleted((prev) => ({ ...prev, [index]: false }));
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setTempData({});
    setImagePreview(null);
  };

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
      const courseToDelete = courses[pendingDeleteIndex];
      await deleteCourse(courseToDelete._id);
  
      const updated = courses.filter((_, i) => i !== pendingDeleteIndex);
      setCourses(updated);
  
      if (editingIndex === pendingDeleteIndex) handleCancel();
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
      showToast('course deleted successfully.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete course.', 'danger');
      console.log("Failed to delete course:", err);
    }
  };
  

  const cancelDelete = () => {
    setShowDeleteBar(false);
    setPendingDeleteIndex(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempData((prev) => ({ ...prev, image_url: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };
  

  const handleDeletePhoto = () => {
    setImageDeleted((prev) => ({ ...prev, [editingIndex]: true }));
  };

  const handleInputChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field, value) => {
    setTempData((prev) => ({ ...prev, [field]: value.split(",").map((s) => s.trim()) }));
  };

  const handleSave = async () => {
    try {
      const formData = { ...tempData };
      if (imageDeleted[editingIndex]) delete formData.image_url;
      
      // If there's a new image, add it as a File (you can store it instead of just its name)
      if (imagePreview && tempData.image_url instanceof File) {
        formData.image_url = tempData.image_url;
      }
  
      const updatedCourse = await editCourse(tempData._id, formData);
      
      const updated = [...courses];
      updated[editingIndex] = updatedCourse;
      setCourses(updated);
      const fetchCourses = async () => {
        try {
          const data = await getCourses();
          setCourses(data);
        } catch (err) {
          console.log('Failed to fetch courses data!');
        } finally {
          setLoading(false);
        }
      };
      showToast('course updated successfully.', 'success');
      fetchCourses();
      handleCancel();

    } catch (err) {
      console.error("Failed to save course:", err);
      showToast(err.message || 'Failed to update course.', 'danger');
    }
  };
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  
 
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
      <Dropdown.Menu align="end">
        <Dropdown.Item onClick={() => handleEdit(index)} style={{ color: theme.blue }} >Edit</Dropdown.Item>
        <Dropdown.Item onClick={() => handleDelete(index)} style={{ color: theme.blue }}>Delete</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  if (loading) return <Preloader />;
  else {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);
    
    const totalPages = Math.ceil(courses.length / itemsPerPage);
    
  return (
    <><div
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
    <Row className="g-10 justify-content-center mt-1">
       
      {currentCourses.map((course, index) => {
           const realIndex = indexOfFirstItem + index;
           const isEditing = editingIndex === realIndex;
           const currentData = isEditing ? tempData : course;
           const showUpload = isEditing && imageDeleted[realIndex];

        return (
          <Col key={index} lg={6} md={6} sm={12}>
            <Card style={{ backgroundColor: theme.white, color: theme.blue }}>
              <Card.Body>
                <div className="d-flex justify-content-between mb-4 align-items-center">
                  <h5 style={{ color: theme.orange }}>{currentData.title}</h5>
                  {!isEditing && <ActionMenu index={realIndex} />}

                </div>

                {!showUpload && currentData.image_url && (
                  <>
                    <Image
                      src={currentData.image_url}
                      className="rounded-3 w-100 mb-2"
                      alt={currentData.title}
                      style={{
                        position: 'relative',
                        width: '100%',
                        height: '300px',
                        objectFit: 'cover'  // This ensures the image fills the space without stretching
                      }}
                    />
                    {isEditing && (
                      <Button variant="danger" size="sm" onClick={handleDeletePhoto}>
                        Delete Photo
                      </Button>
                    )}
                  </>
                )}

                {showUpload && (
                  <Form.Group className="mb-3">
                    <Form.Label>Upload New Image</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    {imagePreview && <Image src={imagePreview} className="rounded mt-2 w-100" />}
                  </Form.Group>
                )}

                {[
        { label: "title", field: "title" },
                  { label: "Subtitle", field: "subtitle" },
                  { label: "Overview", field: "overview" },
                ].map(({ label, field }) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label style={{ color: theme.orange }}>{label}</Form.Label>
                    {isEditing ? (
                      <Form.Control
                        type="text"
                        value={currentData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                      />
                    ) : (
                      <p>{currentData[field]}</p>
                    )}
                  </Form.Group>
                ))}

                {[
                  { label: "Objectives", field: "objectives" },
                  { label: "Topics", field: "topics" },
                  { label: "Structure", field: "structure" },
                  { label: "Target Audience", field: "target_audience" },
                ].map(({ label, field }) => (
                  <Form.Group className="mb-3" key={field}>
                    <Form.Label style={{ color: theme.orange }}>{label}</Form.Label>
                    {isEditing ? (
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={currentData[field]?.join(", ")}
                        onChange={(e) => handleArrayChange(field, e.target.value)}
                      />
                    ) : (
                      <ul style={{ paddingLeft: "1rem" }}>
                       {currentData[field]?.map((item, idx) => (
  <li key={idx}>
    {typeof item === "string"
      ? item
      : typeof item === "object"
      ? JSON.stringify(item)
      : String(item)}
  </li>
))}

                      </ul>
                    )}
                  </Form.Group>
                ))}

                {isEditing && (
                  <div className="d-flex justify-content-end gap-2 mt-3">
                    <Button variant="success" style={{ backgroundColor: theme.orange ,borderColor:theme.white}} onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="light" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        );
      })}

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
          <span>Are you sure you want to delete this course?</span>
          <div className="d-flex gap-2">
            <Button variant="light" size="sm" onClick={cancelDelete}>
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
    </>
  );
};
}
export default ShowCoursesPage;
