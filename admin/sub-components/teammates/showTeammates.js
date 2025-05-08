import { useState, useEffect } from 'react';
import { Modal, Button, Form, Card, Row, Col, Alert, Pagination } from 'react-bootstrap';
import Preloader from '@/src/layouts/Preloader';
import { getTeammates, editTeammate, deleteTeammate } from '@/pages/api/api';

const ShowTeammatesMembers = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };
  
  const [loading, setLoading] = useState(true);
  const [teammates, setTeammates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', image_url: '' });
  const [imageFile, setImageFile] = useState(null);
  const [deletedMessage, setDeletedMessage] = useState('');
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteBarVisible, setDeleteBarVisible] = useState(false);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
};
  // Fetch teammates data only once on component mount
  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const data = await getTeammates();
        setTeammates(data);
      } catch (err) {
        showToast('Failed to fetch teammates data!', 'danger');
        console.error('Failed to fetch teammates data!');
      } finally {
        setLoading(false);
      }
    };
    fetchTeammates();
  }); // Empty dependency array ensures this only runs once

  const teammatesPerPage = 3;
  const indexOfLast = currentPage * teammatesPerPage;
  const indexOfFirst = indexOfLast - teammatesPerPage;
  const currentTeammates = teammates.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(teammates.length / teammatesPerPage);

  if (loading) return <Preloader />;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const requestDelete = (id) => {
    setDeleteTargetId(id);
    setShowDeleteBar(true);
    setDeleteBarVisible(true);
    setTimeout(() => {
      setDeleteBarVisible(false);
      setTimeout(() => cancelDelete(), 500);
    }, 5000);
  };

  const cancelDelete = () => {
    setDeleteBarVisible(false);
    setTimeout(() => {
      setDeleteTargetId(null);
      setShowDeleteBar(false);
    }, 500);
  };

  const confirmDelete = async () => {
    try {
      await deleteTeammate(deleteTargetId);  // Add await to ensure it's resolved before proceeding
      setTeammates(teammates.filter(teammate => teammate._id !== deleteTargetId)); // Remove from UI
      setDeleteTargetId(null);
      setDeleteBarVisible(false);
      showToast('Teammate deleted successfully.', 'success');
      setTimeout(() => setShowDeleteBar(false), 500);
    } catch (error) {
      showToast(error.message || 'Failed to delete teammate.', 'danger');
      console.error('Failed to delete teammate:', error.message);
    
    }
  };

  const handleShow = (teammate) => {
    setSelectedTeammate(teammate);
    setFormData({
      name: teammate.name,
      role: teammate.role,
      image_url: teammate.image_url || ''
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: '', role: '', image_url: '' });
    setSelectedTeammate(null);
    setImageFile(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      const updatedData = {
        ...formData,
        image_url: imageFile || formData.image_url
      };

      const updatedTeammate = await editTeammate(selectedTeammate._id, updatedData);

      const newImageURL = imageFile ? URL.createObjectURL(imageFile) : updatedData.image_url;

      setTeammates((prev) =>
        prev.map((t) =>
          t._id === selectedTeammate._id ? { ...t, ...updatedTeammate, image_url: newImageURL } : t
        )
      );
      showToast('Teammate updated successfully.', 'success');
      handleClose();
    } catch (error) {
      console.error('Failed to update teammate:', error.message);
      showToast(error.message || 'Failed to update teammate.', 'danger');
    }
  };

  return (
    <div className="container my-4 mt-3">
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
      <h2 className="mb-4 text-center" style={{ color: theme.white }}>Team Members</h2>

      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        {currentTeammates.map((teammate) => (
          <Col md={4} key={teammate._id} className="mb-3">
            <Card>
              {teammate.image_url && (
                <Card.Img
                  variant="top"
                  src={
                    teammate.image_url instanceof File
                      ? URL.createObjectURL(teammate.image_url)
                      : teammate.image_url.startsWith("data:") || teammate.image_url.startsWith("blob:")
                      ? teammate.image_url
                      : `${teammate.image_url}`
                  }
                  alt={teammate.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
              )}
              <Card.Body>
                <Card.Title ><h4 style={{color:theme.orange}}>{teammate.name}</h4></Card.Title>
                <Card.Subtitle className="mb-2 text-muted"><h5 style={{color:theme.blue}}>{teammate.role}</h5></Card.Subtitle>
                <div className="mt-3">
                  <Button
                    size="sm"
                    onClick={() => handleShow(teammate)}
                    className="me-2"
                    style={{
                      width: "4rem",
                      height: "2.2rem",
                      color: theme.white,
                      backgroundColor: theme.orange,
                      borderColor: theme.orange,
                      marginRight: "0.6rem",
                      fontSize: "14px",
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => requestDelete(teammate._id)}
                    style={{
                      width: "4rem",
                      height: "2.2rem",
                      color: theme.white,
                      fontSize: "14px",
                      borderColor: theme.orange,
                      marginRight: "0.6rem",
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
        >
          Previous
        </Button>
        <span className="mx-3" style={{ color: theme.white, margin: "auto" }}>
          {`Page ${currentPage}`}
        </span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * teammatesPerPage >= teammates.length}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
        >
          Next
        </Button>
      </div>

      {/* Delete Bar */}
      {showDeleteBar && (
        <div
          className="d-flex justify-content-between align-items-center p-3 bg-danger text-white rounded mt-3"
          style={{
            position: "fixed",
            bottom: deleteBarVisible ? 20 : -100,
            left: "5%",
            right: "5%",
            zIndex: 1000,
            width: "60%",
            transition: "all 0.5s ease-in-out",
            opacity: deleteBarVisible ? 1 : 0,
          }}
        >
          <span>Are you sure you want to delete this teammate?</span>
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
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teammate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="image_url">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control type="file" onChange={handleImageUpload} />
              {formData.image_url && (
                <img
                  src={
                    imageFile
                      ? URL.createObjectURL(imageFile)
                      : formData.image_url.startsWith('blob:')
                      ? formData.image_url
                      : `${formData.image_url}`
                  }
                  alt="Preview"
                  className="mt-2"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ShowTeammatesMembers;
