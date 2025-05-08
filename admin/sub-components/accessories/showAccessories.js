import React, { useState, useEffect } from "react";
import { Button, Card, Col, Form, Modal, Row } from "react-bootstrap";
import { getAccessories, editAccessory, deleteAccessory } from "@/pages/api/api";
import Preloader from "@/src/layouts/Preloader";

const CoffeeAccessoriesPage = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };

  const [Accessories, setAccessories] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const AccessoriesPerPage = 6;
  const [totalAccessories, setTotalAccessories] = useState(0);
  const [expandedCards, setExpandedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editedAccessory, setEditedAccessory] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteBarVisible, setDeleteBarVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const showToast = (message, bg = 'success') => {
    setToast({ show: true, message, bg });
    setTimeout(() => setToast({ ...toast, show: false }), 3000);
  };

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const { data, total } = await getAccessories(currentPage, AccessoriesPerPage);
        setAccessories(data);
        setTotalAccessories(total);
      } catch (err) {
        showToast('Failed to fetch accessories data!', 'danger');
      } finally {
        setLoading(false);
      }
    };
    fetchAccessories();
  }, [currentPage]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const handleEdit = (accessory) => {
    setEditedAccessory({ ...accessory });
    setImagePreview(accessory.image_url);
    setShowModal(true);
  };

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
      await deleteAccessory(deleteTargetId);
      setAccessories((prev) =>
        prev.filter((item) => item._id !== deleteTargetId)
      );
      showToast('Accessory deleted successfully.', 'success');
      setDeleteTargetId(null);
      setDeleteBarVisible(false);
      setTimeout(() => setShowDeleteBar(false), 500);
    } catch (error) {
      console.error("Failed to delete accessory:", error);
      showToast(error.message || 'Failed to delete accessory.', 'danger');
    }
  };

  const handleImageChange = (e, subItemIndex = null, isSubitem = false) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      if (isSubitem && subItemIndex !== null) {
        const updatedSubitems = [...editedAccessory.subitems];
        updatedSubitems[subItemIndex].image_url = reader.result;
        setEditedAccessory({ ...editedAccessory, subitems: updatedSubitems });
      } else {
        setEditedAccessory({ ...editedAccessory, image_url: file });
        setImagePreview(reader.result);
      }
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubItemChange = (idx, field, value) => {
    const updatedSubItems = [...editedAccessory.subitems];
    updatedSubItems[idx][field] = value;
    setEditedAccessory({ ...editedAccessory, subitems: updatedSubItems });
  };

  const handleAddSubItem = () => {
    const newItem = { title: "", description: "", image_url: "" };
    setEditedAccessory({
      ...editedAccessory,
      subitems: [...(editedAccessory.subitems || []), newItem],
    });
  };

  const handleRemoveSubItem = (idx) => {
    const updated = [...editedAccessory.subitems];
    updated.splice(idx, 1);
    setEditedAccessory({ ...editedAccessory, subitems: updated });
  };

  const handleSaveChanges = async () => {
    try {
      const updated = await editAccessory(editedAccessory._id, editedAccessory);
      setAccessories((prev) =>
        prev.map((acc) => (acc._id === updated._id ? updated : acc))
      );
      showToast('Accessory updated successfully.', 'success');
    } catch (error) {
      console.log(editedAccessory);
      console.error("Failed to update accessory:", error);
      showToast(error.message || 'Failed to update accessory.', 'danger');
    } finally {
      setShowModal(false);
    }
  };

  const isFormValid = () => {
    return editedAccessory.title && editedAccessory.subitems.every(sub => sub.title);
  };

  if (loading) return <p>Loading...</p>;

  else{
  const indexOfLast = currentPage * AccessoriesPerPage;
  const indexOfFirst = indexOfLast - AccessoriesPerPage;
  const currentAccessories = Accessories.slice(indexOfFirst, indexOfLast);

  const isFormValid = () => {
    return editedAccessory.title && editedAccessory.subitems.every(sub => sub.title);
  };

  return (
    <div className="container py-4 mt-3">
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
            <h2 className="mb-4 text-center" style={{color:theme.white}}>Coffee Accessories</h2>
      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        {currentAccessories.map((item) => (
          <Col key={item._id} md={4} className="mb-4">
            <Card>
              <Card.Img
                variant="top"
                src={
                  item.image_url instanceof File
                    ? URL.createObjectURL(item.image_url)
                    : item.image_url.startsWith("data:") 
                    ? item.image_url 
                    : `${item.image_url}`
                }
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>

                {expandedCards.includes(item._id) && (
                  <>
                    <h5 style={{ color: theme.orange }}>Subitems</h5>
                    <ul style={{ paddingLeft: "1rem" }}>
                      {item.subitems?.map((sub, i) => (
                        <li key={i} style={{ color: theme.blue, marginBottom: "0.5rem" }}>
                          <strong>{sub.title}</strong>: {sub.description}
                          {sub.image_url && (
                            <div>
                              <img
                                src={
                                  sub.image_url.startsWith("data:") 
                                    ? sub.image_url
                                    : `${sub.image_url}`
                                }
                                alt={sub.title}
                                style={{ width: "100px", marginTop: "0.5rem" }}
                              />
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="d-flex justify-content-between mt-5">
                  <Button size="sm" onClick={() => handleToggleExpand(item._id)}>
                    {expandedCards.includes(item._id) ? "Collapse" : "Expand"}
                  </Button>
                  <div>
                    <Button
                      variant="sm"
                      onClick={() => handleEdit(item)}
                      style={{
                      width: "5rem", height: "2.2rem",fontSize:"14.5px",
                        color: theme.white,
                        backgroundColor: theme.orange,
                        borderColor: theme.orange,
                        marginRight: "0.6rem",
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="sm"
                      onClick={() => requestDelete(item._id)}
                      style={{  width: "5rem", height: "2.2rem",fontSize:"14.5px",backgroundColor:"#dc3545",color:theme.white }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-7">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
        >
          Previous
        </Button>
        <span className="mx-3" style={{ color: theme.white, margin:"auto" }}>{`Page ${currentPage}`}</span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * AccessoriesPerPage >= Accessories.length}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
        >
          Next
        </Button>
      </div>

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
          <span>Are you sure you want to delete this accessory?</span>
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
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Accessory</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedAccessory.title || ""}
                onChange={(e) =>
                  setEditedAccessory({
                    ...editedAccessory,
                    title: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => handleImageChange(e, null)} />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="img-fluid mt-2" />
              )}
            </Form.Group>

            <h5 className="mt-3">Subitems</h5>
            {editedAccessory.subitems?.map((sub, idx) => (
              <div key={idx} className="border p-2 rounded mb-2">
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      placeholder="Title"
                      value={sub.title}
                      onChange={(e) =>
                        handleSubItemChange(idx, "title", e.target.value)
                      }
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      placeholder="Description"
                      value={sub.description}
                      onChange={(e) =>
                        handleSubItemChange(idx, "description", e.target.value)
                      }
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveSubItem(idx)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
                <Form.Control
                  type="file"
                  onChange={(e) => handleImageChange(e, idx, true)}
                />
                {sub.image_url && (
                  <img
                    src={
                      sub.image_url.startsWith("data:")
                        ? sub.image_url
                        : `${sub.image_url}`
                    }
                    alt={sub.title}
                    className="img-fluid mt-2"
                  />
                )}
              </div>
            ))}

            <Button
              variant="secondary"
              onClick={handleAddSubItem}
              style={{ marginBottom: "1rem" }}
            >
              Add Subitem
            </Button>

            <div className="d-flex justify-content-end">
              <Button
                variant="primary"
                disabled={!isFormValid()}
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};}

export default CoffeeAccessoriesPage;
