import React, { useState, useEffect } from "react";
import { Button, Card, Modal, Form, Row, Col } from "react-bootstrap";
import Preloader from "@/src/layouts/Preloader";
import { getMachines, editItem, deleteItem } from "@/pages/api/api";

const CoffeeMachinesPage = () => {
  const theme = {
    blue: "#134E97",
    white: "#F1F1F1",
    orange: "#F57B35",
  };
  const [Machines, setMachine] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [MachinesPerPage] = useState(6);
  const [expandedCards, setExpandedCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [editedMachine, setEditedMachine] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [newLargeInfoKey, setNewLargeInfoKey] = useState("");
  const [newLargeInfoValue, setNewLargeInfoValue] = useState("");
  const [showDeleteBar, setShowDeleteBar] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);
const [toast, setToast] = useState({ show: false, message: '', bg: 'success' });
const showToast = (message, bg = 'success') => {
  setToast({ show: true, message, bg });
  setTimeout(() => setToast({ ...toast, show: false }), 3000);
};
   useEffect(() => {
        const fetchMachines = async () => {
          try {
            const data = await getMachines();
            setMachine(data);
          } catch (err) {
            console.log('Failed to fetch machines data!');
          } finally {
            setLoading(false);
          }
        };
        fetchMachines();
      }, []);
  const indexOfLastMachine = currentPage * MachinesPerPage;
  const indexOfFirstMachine = indexOfLastMachine - MachinesPerPage;
  const currentMachines = Array.isArray(Machines)
    ? Machines.slice(indexOfFirstMachine, indexOfLastMachine)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleToggleExpand = (MachineId) => {
    setExpandedCards((prev) =>
      prev.includes(MachineId)
        ? prev.filter((id) => id !== MachineId)
        : [...prev, MachineId]
    );
  };

  const handleEdit = (Machine) => {
    setSelectedMachine(Machine);
    setEditedMachine({
      ...Machine,
      additional_info: Object.entries(Machine.additional_info || {}),
    });
    setImagePreview(Machine.image_url || "");
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const formData = {
        category: editedMachine.category,
        title: editedMachine.title,
        description: editedMachine.description,
        additional_info: Object.fromEntries(editedMachine.additional_info || []),
        large_info: editedMachine.large_info || {},
      };
  
      const imageFile = editedMachine.image_url && editedMachine.image_url.name ? editedMachine.image_url : null;

  
      const updatedData = await editItem(selectedMachine._id, formData, imageFile);
  
      const updatedMachines = Machines.map((machine) =>
        machine._id === selectedMachine._id ? updatedData.data : machine
      );
  
      setMachine(updatedMachines);
      setShowModal(false);
      showToast('Machine updated successfully.', 'success');
    } catch (err) {
      console.log("data:",editedMachine)
      showToast(err.message || 'Failed to update machine.', 'danger');
    }
    
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
      const itemToDelete = Machines[pendingDeleteIndex];
      await deleteItem(itemToDelete._id);
  
      const updated = Machines.filter((_, i) => i !== pendingDeleteIndex);
      setMachine(updated);
      setShowDeleteBar(false);
      setPendingDeleteIndex(null);
      showToast('Machine deleted successfully.', 'success');
    } catch (err) {
      console.error('Failed to delete machine:', err);
      showToast(err.message || 'Failed to delete machine.', 'danger');
    }
  };
  

  const cancelDelete = () => {
    setShowDeleteBar(false);
    setPendingDeleteIndex(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedMachine({ ...editedMachine, image_url: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalInfoChange = (index, key, value) => {
    const updatedInfo = [...editedMachine.additional_info];
    updatedInfo[index] = [key, value];
    setEditedMachine({ ...editedMachine, additional_info: updatedInfo });
  };

  const handleAddAdditionalField = () => {
    setEditedMachine({
      ...editedMachine,
      additional_info: [...editedMachine.additional_info, ["", ""]],
    });
  };

  const handleRemoveAdditionalField = (index) => {
    const updatedInfo = editedMachine.additional_info.filter(
      (_, idx) => idx !== index
    );
    setEditedMachine({ ...editedMachine, additional_info: updatedInfo });
  };
  const handleAddLargeInfo = () => {
    if (!newLargeInfoKey || !newLargeInfoValue) return;

    setEditedMachine((prev) => ({
      ...prev,
      large_info: {
        ...prev.large_info,
        [newLargeInfoKey]: newLargeInfoValue,
      },
    }));
    setNewLargeInfoKey("");
    setNewLargeInfoValue("");
  };

  const handleRemoveLargeInfo = (key) => {
    const updatedLargeInfo = { ...editedMachine.large_info };
    delete updatedLargeInfo[key];
    setEditedMachine({
      ...editedMachine,
      large_info: updatedLargeInfo,
    });
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
      <h2 className="mb-4 text-center" style={{color:theme.white}}>Coffee Machines</h2>
      <Row xs={1} md={2} lg={3} className="g-4 mt-4">
        {currentMachines.map((Machine, index) => (
          <Col key={Machine._id}>
            <Card>
              <Card.Img
                variant="top"
                src={
                  Machine.image_url instanceof File
                    ? URL.createObjectURL(Machine.image_url)
                    : `${Machine.image_url}`
                } 
                style={{
                  width: "100%",
                  height: "200px", // You can adjust this height as needed
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <Card.Body style={{ backgroundColor: theme.white }}>
                <Card.Title style={{ color: theme.orange }}>
                  {Machine.title}
                </Card.Title>
                <Card.Subtitle
                  className="mb-2 "
                  style={{ color: theme.blue }}
                >
                  {Machine.category}
                </Card.Subtitle>
                <Card.Text  style={{ color: theme.blue }}>
                  {Machine.description}
                </Card.Text>

                {expandedCards.includes(Machine._id) && (
                  <>
                    <h5 style={{ color: theme.orange }}>Additional Info</h5>
                    <ul>
                      {Machine.additional_info &&
                        Object.entries(Machine.additional_info).map(
                          ([key, value]) => (
                            <li key={key} style={{ color: theme.blue }}>
                              <strong>{key}:</strong> {value}
                            </li>
                          )
                        )}
                    </ul>
                    <h5 style={{ color: theme.orange }}>Large Info</h5>
                    <ul>
                      {Machine.large_info && Object.entries(Machine.large_info).map(
                        ([key, value]) => (
                          <li key={key} style={{ color: theme.blue }}>
                            <strong>{key}:</strong> {value}
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                <div className="d-flex justify-content-between mt-5">
                  <Button
                  variant="sm"
                    size="sm"
                    style={{width: "5rem", height: "2.2rem",fontSize:"14.5px",backgroundColor:"#624bff", color:theme.white}}
                    onClick={() => handleToggleExpand(Machine._id)}
                  >
                    {expandedCards.includes(Machine._id)
                      ? "Collapse"
                      : "Expand"}
                  </Button>
                  <div>
                    <Button
                      variant="sm"
                      onClick={() => handleEdit(Machine)}
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
                      onClick={() => handleDelete(index)}
                      style={{
                        width: "5rem", height: "2.2rem",fontSize:"14.5px",backgroundColor:"#dc3545",color:theme.white
                      }}
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

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-7">
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
        >
          Previous
        </Button>
        <span
          className="mx-3"
          style={{ color: theme.white, margin: "auto" }}
        >{`Page ${currentPage}`}</span>
        <Button
          variant="secondary"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage * MachinesPerPage >= Machines.length}
          style={{ backgroundColor: theme.orange, borderColor: theme.white }}
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
          <span>Are you sure you want to delete this machine?</span>
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
          <Modal.Title>Edit Machine</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={editedMachine.category}
               onChange={(e) =>
                  setEditedMachine({
                    ...editedMachine,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select category</option>
                <option value="Commercial">Commercial</option>
                <option value="Professional">Professional</option>
              </Form.Select>
              {/*       <Form.Label style={{color:theme.orange}}>Category</Form.Label>
                            <Form.Select
                value={editedMachine.category}
               onChange={(e) =>
                  setEditedMachine({
                    ...editedMachine,
                    category: e.target.value,
                  })
                }
              >
                <option value="">Select category</option>
                <option value="commercial">Commercial</option>
                <option value="professional">Professional</option>
              </Form.Select>
               */}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editedMachine.title || ""}
                onChange={(e) =>
                  setEditedMachine({ ...editedMachine, title: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editedMachine.description || ""}
                onChange={(e) =>
                  setEditedMachine({
                    ...editedMachine,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={handleImageChange} />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="img-fluid mt-2"
                />
              )}
            </Form.Group>

            <Form.Group className="mb-3">
  <Form.Label>Additional Info</Form.Label>
  {editedMachine.additional_info?.map(([key, val], idx) => (
    <div className="d-flex align-items-center mb-2" key={idx}>
      <Form.Control
        className="me-2"
        value={key}
        onChange={(e) =>
          handleAdditionalInfoChange(idx, e.target.value, val)
        }
        placeholder="Key"
      />
      <Form.Control
        className="me-2"
        value={val}
        onChange={(e) =>
          handleAdditionalInfoChange(idx, key, e.target.value)
        }
        placeholder="Value"
      />
      <Button
        variant="danger"
        size="sm"
        onClick={() => handleRemoveAdditionalField(idx)}
      >
        &times;
      </Button>
    </div>
  ))}
  <Button
    variant="success"
    className="mt-2"
    size="sm"
    onClick={handleAddAdditionalField}
  >
    Add Additional Field
  </Button>
</Form.Group>


            <h5 className="mt-3">Large Info</h5>
            {editedMachine.large_info &&
              Object.entries(editedMachine.large_info).map(([key, value]) => (
                <Row key={key} className="mb-2">
                  <Col>
                    <Form.Control value={key} disabled />
                  </Col>
                  <Col>
                    <Form.Control
                      value={value}
                      onChange={(e) => {
                        const updated = {
                          ...editedMachine.large_info,
                          [key]: e.target.value,
                        };
                        setEditedMachine({
                          ...editedMachine,
                          large_info: updated,
                        });
                      }}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleRemoveLargeInfo(key)}
                    >
                      &times;
                    </Button>
                  </Col>
                </Row>
              ))}

            <Row className="mt-2">
              <Col>
                <Form.Control
                  placeholder="Key"
                  value={newLargeInfoKey}
                  onChange={(e) => setNewLargeInfoKey(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Control
                  placeholder="Value"
                  value={newLargeInfoValue}
                  onChange={(e) => setNewLargeInfoValue(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button variant="success" onClick={handleAddLargeInfo}>
                  + Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CoffeeMachinesPage;
