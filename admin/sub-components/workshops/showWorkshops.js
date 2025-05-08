'use client';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal, Button, Form, Pagination, Alert } from 'react-bootstrap';
import Image from 'next/image';
import { getWorkshops, editWorkshop, deleteWorkshop } from '@/pages/api/api';
import Preloader from '@/src/layouts/Preloader';

const ShowWorkshopsPage = () => { 
  const theme = {
  blue: "#134E97",
  white: "#F1F1F1",
  orange: "#F57B35",
};
const [loading, setLoading] = useState(true);
const [workshops, setWorkshops] = useState([]);
const [showModal, setShowModal] = useState(false);
const [currentWorkshop, setCurrentWorkshop] = useState(null);
const [imageFile, setImageFile] = useState(null);
const [currentPage, setCurrentPage] = useState(1);
const [showDeleteBar, setShowDeleteBar] = useState(false);
const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });

const workshopsPerPage = 3;

useEffect(() => {
  const fetchWorkshops = async () => {
    try {
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (err) {
      showToast('Failed to fetch workshops data!', 'danger');
    } finally {
      setLoading(false);
    }
  };
  fetchWorkshops();
});

const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
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
  const workshop = workshops[pendingDeleteIndex];
  try {
    await deleteWorkshop(workshop._id);
    const updated = workshops.filter((_, i) => i !== pendingDeleteIndex);
    setWorkshops(updated);
    showToast('Workshop deleted successfully.', 'success');
  } catch (error) {
    showToast(error.message || 'Failed to delete workshop.', 'danger');
  } finally {
    setShowDeleteBar(false);
    setPendingDeleteIndex(null);
  }
};

const cancelDelete = () => {
  setShowDeleteBar(false);
  setPendingDeleteIndex(null);
};

const handleEditClick = (workshop) => {
  setCurrentWorkshop({ ...workshop });
  setImageFile(null);
  setShowModal(true);
};

const handleSaveChanges = async () => {
  try {
    const updatedWorkshop = { ...currentWorkshop };
    if (imageFile) updatedWorkshop.image_url = imageFile;

    const result = await editWorkshop(updatedWorkshop._id, updatedWorkshop);

    setWorkshops((prev) =>
      prev.map((w) => (w._id === result._id ? result : w))
    );
    showToast('Workshop updated successfully.', 'success');
  } catch (error) {
    showToast(error.message || 'Failed to update workshop.', 'danger');
  } finally {
    setShowModal(false);
  }
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCurrentWorkshop((prev) => ({
    ...prev,
    [name]: name === 'length_value' || name === 'class_size' ? Number(value) : value,
  }));
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageFile(file);
    setCurrentWorkshop((prev) => ({
      ...prev,
      image_url: URL.createObjectURL(file),
    }));
  }
};

  if (loading) return <Preloader />;
  else {
  const indexOfLast = currentPage * workshopsPerPage;
  const indexOfFirst = indexOfLast - workshopsPerPage;
  const currentWorkshops = workshops.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(workshops.length / workshopsPerPage);

  const isFormValid =
    currentWorkshop &&
    currentWorkshop.title &&
    currentWorkshop.length_value &&
    currentWorkshop.length_unit &&
    currentWorkshop.class_size !== null &&
    currentWorkshop.description &&
    currentWorkshop.image_url;

  return (
    <Container className="py-5">
      
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
      <h2 className="text-center mb-7 mt-4" style={{color:theme.white}}>Our Workshops</h2>
      <Row xs={1} sm={2} md={3} className="g-4">
        {currentWorkshops.map((workshop, index) => (
          <Col key={workshop._id}>
            <Card className="h-100 shadow-sm">
              {workshop.image_url && (
             <div style={{ position: 'relative', width: '100%', height: '200px' }}>
             <Image
               src={workshop.image_url.startsWith('blob') ? workshop.image_url : `${workshop.image_url}`}
               alt={workshop.title}
               fill
               style={{
                 objectFit: 'cover',
                 objectPosition: 'center',
               }}
               className="rounded-top"
             />
           </div>
              )}
              <Card.Body>
                <Card.Title style={{color:theme.orange}}>{workshop.title}</Card.Title>
                <Card.Text style={{color:theme.blue}}>
                  <strong style={{color:theme.orange}}>Length:</strong> {workshop.length_value} {workshop.length_unit === 'h' ? 'hours' : 'minutes'}
                  <br />
                  {workshop.class_size && (
                    <>
                      <strong style={{color:theme.orange}}>Class Size:</strong> {workshop.class_size} persons
                      <br />
                    </>
                  )}
                  <strong style={{color:theme.orange}}>Description:</strong>
                  <br />
                  {workshop.description}
                </Card.Text>
                <div className="d-flex justify-content-end">
                  <Button size="sm" variant="sm" onClick={() => handleEditClick(workshop)}
                   style={{
                        width: "4rem", height: "2.2rem",fontSize:"14.5px",
                   
                        color: theme.white,
                        backgroundColor: theme.orange,
                        borderColor: theme.orange,
                        marginRight: "0.6rem",
                      }}>
                    Edit
                  </Button>
                  <Button  variant="sm" onClick={() => handleDelete(index)}  style={{
                        width: "5rem", height: "2.2rem",fontSize:"14.5px",backgroundColor:"#dc3545",color:theme.white
                      }}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


 <div className="d-flex justify-content-center mt-7">
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
            
      {/* Delete Confirmation Bar */}
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
          <span>Are you sure you want to delete this workshop?</span>
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

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Workshop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentWorkshop && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  name="title"
                  value={currentWorkshop.title}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Length</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="length_value"
                  value={currentWorkshop.length_value}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Length Unit</Form.Label>
                <Form.Select
                  required
                  name="length_unit"
                  value={currentWorkshop.length_unit}
                  onChange={handleInputChange}
                >
                  <option value="">Select</option>
                  <option value="m">Minutes</option>
                  <option value="h">Hours</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Class Size</Form.Label>
                <Form.Control
                  required
                  type="number"
                  name="class_size"
                  value={currentWorkshop.class_size || ''}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={3}
                  name="description"
                  value={currentWorkshop.description}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {currentWorkshop.image_url && (
                  <img
                    src={currentWorkshop.image_url}
                    alt="preview"
                    className="mt-2 rounded"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges} disabled={!isFormValid}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
}
export default ShowWorkshopsPage;
